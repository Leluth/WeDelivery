package com.laioffer.laiDelivery.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "distributioncenter")
public class DistributionCenter implements Serializable {

    /* variables should be inserted correctly for connecting to DB */

    private static final long serialVersionUID = 8734140534986494039L;

    @Id
    private String centerId;

    private String longtitue;

    private String latitute;

    public String getCenterId() {
        return centerId;
    }

    public void setCenterId(String centerId) {
        this.centerId = centerId;
    }

    public String getLongtitue() {
        return longtitue;
    }

    public void setLongtitue(String longtitue) {
        this.longtitue = longtitue;
    }

    public String getLatitute() {
        return latitute;
    }

    public void setLatitute(String latitute) {
        this.latitute = latitute;
    }
}

