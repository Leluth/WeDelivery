package com.laioffer.laiDelivery.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OptionsInfo {
    private String deliveryType;

    private String serviceType;

    private double deliveryTime;

    private double pickUpTime;

    private String centerId;

    private double price;

    private boolean enable;

    private String errorMessage;

    private double centerLat;

    private double centerLng;

    private double originLat;

    @JsonProperty("originLng")
    private double originLng;

    private double destinationLat;

    private double destinationLng;

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

    public void setErrorMessage(String err) { this.errorMessage = err; }

    public String getErrorMessage() { return errorMessage; }

    public void setCenterLat(double centerLat) { this.centerLat = centerLat; }

    public double getCenterLat() {return centerLat; }

    public void setCenterLng(double centerLng) { this.centerLng = centerLng; }

    public double getCenterLng() { return centerLng; }

    public void setOriginLat(double originLat) { this.originLat = originLat; }

    public double getOriginLat() { return originLat; }

    public void setOriginLng(double originLng) {this.originLng = originLng; }

    private double getOriginLng() {return originLng;}

    public void setDestinationLat(double destinationLat) {this.destinationLat = destinationLat;}

    public double getDestinationLat() {return destinationLat;}

    public void setDestinationLng(double destinationLng) {this.destinationLng = destinationLng;}

    public double getDestinationLng() {return destinationLng;}
}
