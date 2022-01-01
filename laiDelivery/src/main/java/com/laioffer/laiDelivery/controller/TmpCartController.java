package com.laioffer.laiDelivery.controller;

import com.laioffer.laiDelivery.entity.TmpDeliveryOrder;
import com.laioffer.laiDelivery.service.TmpCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Hung-Hsi
 * @version 1.0
 * @description: TmpCartController
 * @date 2021/12/29
 */
@Controller
public class TmpCartController {
    @Autowired
    private TmpCartService tmpCartService;

    @RequestMapping(value = "/tmpcart", method = RequestMethod.GET)
    @ResponseBody
    public List<TmpDeliveryOrder> getTmpCart() {
        return tmpCartService.getTmpCart();
    }

    @RequestMapping(value = "/addtmpcart", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void signUp(@RequestBody TmpDeliveryOrder tmpDeliveryOrder) {
        tmpCartService.addTmpCart(tmpDeliveryOrder);
    }
}
