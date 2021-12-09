package com.laioffer.laiDelivery.controller;

import com.laioffer.laiDelivery.entity.Customer;
import com.laioffer.laiDelivery.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;


@Controller
public class SignUpController {

    @Autowired
    private CustomerService customerService;

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void signUp(@RequestBody Customer customer) {
        customerService.signUp(customer);
    }
}
