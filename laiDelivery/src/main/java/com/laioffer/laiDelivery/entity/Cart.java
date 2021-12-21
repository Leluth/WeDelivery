package com.laioffer.laiDelivery.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "cart")
public class Cart implements Serializable {
    /* variables should be inserted correctly for connecting to DB */
    private static final long serialVersionUID = 8436097833452420298L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    public List<DeliveryOrder> getOrderItemList() {
        return orderItemList;
    }

    public void setOrderItemList(List<DeliveryOrder> orderItemList) {
        this.orderItemList = orderItemList;
    }

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<DeliveryOrder> orderItemList;
//    @OneToOne(cascade = CascadeType.ALL, fetch=FetchType.EAGER)
//    private DeliveryOrder orderItem;

    private double totalPrice;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
