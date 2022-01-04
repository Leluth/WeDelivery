package com.laioffer.laiDelivery;

import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import org.json.JSONObject;
import com.laioffer.laiDelivery.entity.Customer;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.commons.io.IOUtils;

@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    private String message;

    @Override
    public void init() {
        message = "Hello World!";
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");

        JSONObject customer = new JSONObject();
        customer.put("email", "sun@laioffer.com");
        customer.put("first_name", "rick");
        customer.put("last_name", "sun");
        customer.put("age", 50);
        response.getWriter().print(customer);

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        ObjectMapper mapper = new ObjectMapper();
        Customer customer= new Customer();
        customer.setEmail("sun@laioffer.com");
        customer.setPassword("123456");
        customer.setFirstName("rick");
        customer.setLastName("sun");
        customer.setEnabled(true);

        response.getWriter().print(mapper.writeValueAsString(customer));

    }

    @Override
    public void destroy() {
    }
}