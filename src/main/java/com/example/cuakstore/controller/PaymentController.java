package com.example.cuakstore.controller;

import com.example.cuakstore.model.Order;
import com.example.cuakstore.payload.response.MessageResponse;
import com.example.cuakstore.service.OrderService;
import com.example.cuakstore.service.PaymentService;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.resources.preference.Preference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/create-preference/{orderId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('OWNER')")
    public ResponseEntity<?> createPaymentPreference(@PathVariable Long orderId) {
        Optional<Order> orderOptional = orderService.getOrderById(orderId);
        if (!orderOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Order not found with id: " + orderId));
        }

        Order order = orderOptional.get();
        try {
            Preference preference = paymentService.createPreference(order);
            
            Map<String, Object> response = new HashMap<>();
            response.put("preferenceId", preference.getId());
            response.put("initPoint", preference.getInitPoint());
            response.put("sandboxInitPoint", preference.getSandboxInitPoint());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error creating payment preference: " + e.getMessage()));
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> handlePaymentWebhook(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String data_id) {
        
        if ("payment".equals(type) && data_id != null) {
            try {
                Payment payment = paymentService.processPayment(data_id);
                return ResponseEntity.ok(new MessageResponse("Payment processed successfully"));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new MessageResponse("Error processing payment: " + e.getMessage()));
            }
        }
        
        return ResponseEntity.ok(new MessageResponse("Webhook received"));
    }

    @GetMapping("/status/{orderId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('OWNER')")
    public ResponseEntity<?> getPaymentStatus(@PathVariable Long orderId) {
        Optional<Order> orderOptional = orderService.getOrderById(orderId);
        if (!orderOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Order not found with id: " + orderId));
        }

        Order order = orderOptional.get();
        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.getId());
        response.put("status", order.getStatus());
        response.put("paymentId", order.getPaymentId());
        response.put("paymentStatus", order.getPaymentStatus());
        
        return ResponseEntity.ok(response);
    }
}