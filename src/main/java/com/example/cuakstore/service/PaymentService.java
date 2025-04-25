package com.example.cuakstore.service;

import com.example.cuakstore.model.Order;
import com.example.cuakstore.model.OrderStatus;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.resources.preference.Preference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentService {
    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    @Value("${mercadopago.access.token}")
    private String mercadoPagoAccessToken;

    @Autowired
    private OrderService orderService;

    @PostConstruct
    public void init() {
        MercadoPagoConfig.setAccessToken(mercadoPagoAccessToken);
    }

    @Transactional
    public Preference createPreference(Order order) {
        try {
            PreferenceClient client = new PreferenceClient();

            List<PreferenceItemRequest> items = new ArrayList<>();
            
            // Create a preference item for the entire order
            PreferenceItemRequest item = PreferenceItemRequest.builder()
                    .title("Order #" + order.getId())
                    .quantity(1)
                    .unitPrice(order.getTotalAmount())
                    .build();
            
            items.add(item);

            // Create the preference request
            PreferenceRequest request = PreferenceRequest.builder()
                    .items(items)
                    .externalReference(order.getId().toString())
                    .build();

            // Create the preference
            Preference preference = client.create(request);
            
            logger.info("Created Mercado Pago preference for order {}: {}", order.getId(), preference.getId());
            
            return preference;
        } catch (MPException | MPApiException e) {
            logger.error("Error creating Mercado Pago preference for order {}: {}", order.getId(), e.getMessage());
            throw new RuntimeException("Error creating payment preference", e);
        }
    }

    @Transactional
    public Payment processPayment(String paymentId) {
        try {
            PaymentClient client = new PaymentClient();
            Payment payment = client.get(Long.parseLong(paymentId));
            
            // Get the order ID from the external reference
            String externalReference = payment.getExternalReference();
            if (externalReference != null && !externalReference.isEmpty()) {
                Long orderId = Long.parseLong(externalReference);
                
                // Update the order status based on the payment status
                String status = payment.getStatus();
                if ("approved".equals(status)) {
                    orderService.updateOrderStatus(orderId, OrderStatus.PAID);
                } else if ("rejected".equals(status)) {
                    orderService.updateOrderStatus(orderId, OrderStatus.CANCELLED);
                }
                
                // Update the order with payment information
                Order order = orderService.getOrderById(orderId)
                        .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
                
                order.setPaymentId(paymentId);
                order.setPaymentStatus(status);
                orderService.updateOrder(order);
            }
            
            logger.info("Processed Mercado Pago payment {}: {}", paymentId, payment.getStatus());
            
            return payment;
        } catch (MPException | MPApiException e) {
            logger.error("Error processing Mercado Pago payment {}: {}", paymentId, e.getMessage());
            throw new RuntimeException("Error processing payment", e);
        }
    }
}