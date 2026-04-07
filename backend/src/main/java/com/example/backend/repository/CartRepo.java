package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Cart;


@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {
    Cart findByUserId(Long userId);
    Cart findByGuestId(String gusetId);





}