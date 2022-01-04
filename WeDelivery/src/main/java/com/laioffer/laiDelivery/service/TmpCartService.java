package com.laioffer.laiDelivery.service;


import com.laioffer.laiDelivery.dao.TmpDeliveryOrderDao;
import com.laioffer.laiDelivery.entity.TmpDeliveryOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Hung-Hsi
 * @version 1.0
 * @description: TmpCartService
 * @date 2021/12/29
 */

@Service
public class TmpCartService {
    @Autowired
    private TmpDeliveryOrderDao tmpDeliveryOrderDao;

    public List<TmpDeliveryOrder> getTmpCart() {
        return tmpDeliveryOrderDao.getTmpCart();
    }

    public List<TmpDeliveryOrder> getTmpDeliveryOrder() {
        return tmpDeliveryOrderDao.getTmpDeliveryOrder();
    }

    public void addTmpDeliveryOrder(TmpDeliveryOrder tmpDeliveryOrder) {
        tmpDeliveryOrderDao.addTmpDeliveryOrder(tmpDeliveryOrder);
    }

    public void deleteTmpDeliveryOrderById(int id) {
        tmpDeliveryOrderDao.deleteTmpDeliveryOrderById(id);
    }

    public void updateTmpDeliveryOrder(TmpDeliveryOrder tmpDeliveryOrder) {
        tmpDeliveryOrderDao.updateTmpDeliveryOrder(tmpDeliveryOrder);
    }

    public void updateTmpDeliveryOrderStatus(TmpDeliveryOrder tmpDeliveryOrder) {
        tmpDeliveryOrderDao.updateTmpDeliveryOrderStatus(tmpDeliveryOrder);
    }

}
