package com.laioffer.laiDelivery.controller;

import com.laioffer.laiDelivery.entity.Cart;
import com.laioffer.laiDelivery.entity.DeliveryOrder;
import com.laioffer.laiDelivery.entity.TmpDeliveryOrder;
import com.laioffer.laiDelivery.service.CartService;
import com.laioffer.laiDelivery.service.DeliveryOrderService;
import com.laioffer.laiDelivery.service.EmailService;
import com.laioffer.laiDelivery.service.TmpCartService;
import com.laioffer.laiDelivery.utils.TokenUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.laioffer.laiDelivery.dao.TmpDeliveryOrderDao;

import java.util.List;

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
    private TmpCartService tmpCartService;

    @Autowired
    private DeliveryOrderService deliveryOrderService;

    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/checkout", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void checkout(@RequestBody List<DeliveryOrder> deliveryOrders) {
       // add the item in the cart (stats ==1) into delieverOrder table
        for (DeliveryOrder deliveryOrder : deliveryOrders){
            Cart cart = cartService.getCart();
            deliveryOrder.setCart(cart);
            deliveryOrderService.saveDeliveryOrder(deliveryOrder);

            // generate tracking number and send notification of mail
            String token = TokenUtils.getToken(deliveryOrder.getId());
            emailService.sendMail("Your LaiDelivery order < " + token + " > has been received!!",
                    "No big deal, it’s just a package sent by cool robots and drones that changes your delivery " +
                            "experience forever :)");
        }

//      delete the rows with status of 1 in tmpDB
        List<TmpDeliveryOrder> tmpList = tmpCartService.getTmpCart();
        for (TmpDeliveryOrder tmp : tmpList) { // getTmpCart only return the cases that status == 1
            int tmpId = tmp.getId();
            tmpCartService.deleteTmpDeliveryOrderById(tmpId);
        }
    }

    @RequestMapping(value = "/cancelcart", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void cancel() {
//      update all the item in tmpDB into status of 0
        List<TmpDeliveryOrder> tmpList = tmpCartService.getTmpCart();
        System.out.print(tmpList);
        for (TmpDeliveryOrder tmp : tmpList) { // getTmpCart only return the cases that status == 1
            System.out.print(tmp);
            tmpCartService.updateTmpDeliveryOrderStatus(tmp);
        }
    }
}
