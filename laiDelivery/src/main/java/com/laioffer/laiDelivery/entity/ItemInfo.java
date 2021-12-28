package com.laioffer.laiDelivery.entity;


public class ItemInfo {
    private double weight;

    private String size;

    private String shippingFrom;

    private String shippingTo;

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getWeight() {
        return weight;
    }

    public void setSize(String size) { this.size = size; }

    public String getSize() { return size; }

    public void setShippingFrom(String origin) {
        this.shippingFrom = origin;
    }

    public String getShippingFrom() {
        return shippingFrom;
    }

    public void setShippingTo(String destination) {
        this.shippingTo = destination;
    }

    public String getShippingTo() {
        return shippingTo;
    }
}
