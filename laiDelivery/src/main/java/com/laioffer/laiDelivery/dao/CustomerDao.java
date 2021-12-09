package com.laioffer.laiDelivery.dao;

import com.laioffer.laiDelivery.entity.Customer;
import org.springframework.stereotype.Repository;

@Repository
public class CustomerDao {
    // sign up function for customer
    public void signUp(Customer customer) {
    }
    // get customer's all information based on email (or id?)
    public Customer getCustomer(String email) {
        return new Customer();
    }
}
