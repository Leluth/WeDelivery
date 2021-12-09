package com.laioffer.laiDelivery.service;

import com.laioffer.laiDelivery.dao.CustomerDao;
import com.laioffer.laiDelivery.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerDao customerDao;

    public void signUp(Customer customer) {
        customerDao.signUp(customer);
    }

    public Customer getCustomer(String email) {
        return customerDao.getCustomer(email);
    }
}

