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

    @RequestMapping(value = "/gettmpcart", method = RequestMethod.GET)
    @ResponseBody
    public List<TmpDeliveryOrder> getTmpDeliveryOrder() {
        return tmpCartService.getTmpDeliveryOrder();
    }

    @RequestMapping(value = "/addtmpcart", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addTmpDeliveryOrder(@RequestBody TmpDeliveryOrder tmpDeliveryOrder) {
        tmpCartService.addTmpDeliveryOrder(tmpDeliveryOrder);
    }

    @RequestMapping(value = "/deletetmpcart/{id}", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteTmpDeliveryOrder(@PathVariable int id) {
        tmpCartService.deleteTmpDeliveryOrderById(id);
    }

    @RequestMapping(value = "/updatetmpcart", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void updateTmpDeliveryOrder(@RequestBody TmpDeliveryOrder tmpDeliveryOrder) {
        tmpCartService.updateTmpDeliveryOrder(tmpDeliveryOrder);
    }

}
