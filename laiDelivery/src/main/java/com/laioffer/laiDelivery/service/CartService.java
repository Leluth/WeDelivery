package com.laioffer.laiDelivery.service;

import com.laioffer.laiDelivery.entity.Cart;
import com.laioffer.laiDelivery.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: CartService
 * @date 2021/12/21 12:39
 */
@Service
public class CartService {
    @Autowired
    private CustomerService customerService;

    public Cart getCart() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String email = loggedInUser.getName();
        Customer customer = customerService.getCustomer(email);

        if (customer != null) {
            return customer.getCart();
        }
        return new Cart();
    }
}
