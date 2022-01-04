package com.laioffer.laiDelivery.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "authorities")
public class Authorities implements Serializable {

    private static final long serialVersionUID = 8734140534986494039L;

    @Id
    private String email;

    private String authorities;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAuthorities() {
        return authorities;
    }

    public void setAuthorities(String authorities) {
        this.authorities = authorities;
    }
}
