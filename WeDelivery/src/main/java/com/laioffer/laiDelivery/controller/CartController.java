package com.laioffer.laiDelivery.controller;

import com.laioffer.laiDelivery.entity.Cart;
import com.laioffer.laiDelivery.entity.DeliveryOrder;
import com.laioffer.laiDelivery.service.CartService;
import com.laioffer.laiDelivery.service.DeliveryOrderService;
import com.laioffer.laiDelivery.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    private DeliveryOrderService deliveryOrderService;

    @RequestMapping(value = "/cart", method = RequestMethod.GET)
    @ResponseBody
    public Cart getCart() {
        return cartService.getCart();
    }

    @RequestMapping(value = "/getorder", method = RequestMethod.POST)
    @ResponseBody
    public DeliveryOrder getDeliveryOrder(@RequestBody String token) {
        int id = TokenUtils.restoreToken(token);
        return deliveryOrderService.gerDeliveryOrder(id);
    }
}
