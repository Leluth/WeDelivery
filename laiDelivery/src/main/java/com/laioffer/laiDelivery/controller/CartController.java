package com.laioffer.laiDelivery.controller;

import com.laioffer.laiDelivery.entity.Cart;
import com.laioffer.laiDelivery.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: CartController
 * @date 2021/12/21 15:41
 */
@Controller
public class CartController {
    @Autowired
    private CartService cartService;

    @RequestMapping(value = "/cart", method = RequestMethod.GET)
    @ResponseBody
    public Cart getCart() {
        return cartService.getCart();
    }
}
