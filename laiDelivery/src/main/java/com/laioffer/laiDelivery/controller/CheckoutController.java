package com.laioffer.laiDelivery.controller;

import com.laioffer.laiDelivery.entity.Cart;
import com.laioffer.laiDelivery.entity.DeliveryOrder;
import com.laioffer.laiDelivery.service.CartService;
import com.laioffer.laiDelivery.service.DeliveryOrderService;
import com.laioffer.laiDelivery.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: CheckoutController
 * @date 2021/12/21 12:20
 */
@Controller
public class CheckoutController {
    @Autowired
    private CartService cartService;

    @Autowired
    private DeliveryOrderService deliveryOrderService;

    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/checkout", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void checkout(@RequestBody DeliveryOrder deliveryOrder) {
        Cart cart = cartService.getCart();
        deliveryOrder.setCart(cart);
        deliveryOrderService.saveDeliveryOrder(deliveryOrder);
        emailService.sendMail("Your LaiDelivery order has been received!!",
                "No big deal, it’s just a package sent by cool robots and drones that changes your delivery " +
                        "experience forever.");
    }
}
