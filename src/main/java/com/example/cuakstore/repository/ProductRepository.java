package com.example.cuakstore.repository;

import com.example.cuakstore.model.Category;
import com.example.cuakstore.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(Category category);
    
    Page<Product> findByCategory(Category category, Pageable pageable);
    
    List<Product> findByNameContainingIgnoreCase(String name);
    
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
    
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    Page<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
    
    List<Product> findByCategoryAndNameContainingIgnoreCase(Category category, String name);
    
    Page<Product> findByCategoryAndNameContainingIgnoreCase(Category category, String name, Pageable pageable);
}