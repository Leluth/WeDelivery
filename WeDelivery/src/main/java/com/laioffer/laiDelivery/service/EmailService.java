package com.laioffer.laiDelivery.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: EmailService
 * @date 2021/12/21 15:53
 */
@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SimpleMailMessage preConfiguredMessage;

    /**
     * This method will send compose and send the message to current user
     */
    public void sendMail(String subject, String body) {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String receiver = loggedInUser.getName();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(receiver);
        message.setSubject(subject);
        message.setText(body);
        try {
            mailSender.send(message);
        } catch (MailException mailException) {
            mailException.printStackTrace();
        }
    }
}
