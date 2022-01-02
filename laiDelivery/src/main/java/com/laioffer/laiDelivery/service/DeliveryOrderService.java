package com.laioffer.laiDelivery.service;

import com.laioffer.laiDelivery.dao.DeliveryOrderDao;
import com.laioffer.laiDelivery.entity.DeliveryOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: DeliveryOrderService
 * @date 2021/12/21 12:35
 */
@Service
public class DeliveryOrderService {
    @Autowired
    private DeliveryOrderDao deliveryOrderDao;

    public void saveDeliveryOrder(DeliveryOrder deliveryOrder) {
        deliveryOrderDao.saveDeliveryOrder(deliveryOrder);
    }

    public DeliveryOrder gerDeliveryOrder(int id) {
        return deliveryOrderDao.gerDeliveryOrder(id);
    }
}
