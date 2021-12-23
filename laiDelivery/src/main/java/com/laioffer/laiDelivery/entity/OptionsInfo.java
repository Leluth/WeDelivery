package com.laioffer.laiDelivery.entity;

public class OptionsInfo {
    private String deliveryType;

    private String serviceType;

    private double deliveryTime;

    private double pickUpTime;

    private String centerId;

    private double price;

    private boolean enable;

    public void setDeliveryType(String deliveryType) {
        this.deliveryType = deliveryType;
    }

    public String getDeliveryType() {
        return deliveryType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setDeliveryTime(double deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public double getDeliveryTime() {
        return deliveryTime;
    }

    public void setPickUpTime(double pickUpTime) {
        this.pickUpTime = pickUpTime;
    }

    public double getPickUpTime() {
        return pickUpTime;
    }

    public void setCenterId(String centerId) {
        this.centerId = centerId;
    }

    public String getCenterId() {
        return centerId;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getPrice() {
        return price;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public boolean getEnable() {
        return enable;
    }
}
