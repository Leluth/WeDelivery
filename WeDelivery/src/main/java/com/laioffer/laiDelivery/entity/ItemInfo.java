package com.laioffer.laiDelivery.entity;


import com.fasterxml.jackson.annotation.JsonProperty;

public class ItemInfo {
    private double weight;

    private String size;

    private String shippingFrom;

    private String shippingTo;

    @JsonProperty("isMember")
    private boolean isMember;

    @JsonProperty("PickupDate")
    private String PickupDate;

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

    public void setMember(boolean isMember) {this.isMember = isMember;}

    public boolean isMember() {return isMember;}

    public void setPickupDate(String pickupDate) {this.PickupDate = pickupDate;}

    public String getPickupDate() {return PickupDate;}
}
