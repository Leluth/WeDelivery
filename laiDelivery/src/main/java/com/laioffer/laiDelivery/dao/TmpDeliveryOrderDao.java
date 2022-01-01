package com.laioffer.laiDelivery.dao;

import com.laioffer.laiDelivery.entity.TmpDeliveryOrder;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Hung-Hsi
 * @version 1.0
 * @description: tmpDeliveryOrderDao
 * @date 2021/12/29
 */

@Repository
public class TmpDeliveryOrderDao {

    @Autowired
    private SessionFactory sessionFactory;

    public List<TmpDeliveryOrder> getTmpDeliveryOrder() {
        try (Session session = sessionFactory.openSession()) {
            return session.createCriteria(TmpDeliveryOrder.class)
                    .setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
                    .list();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ArrayList<>();
    }

    public void addTmpDeliveryOrder(TmpDeliveryOrder tmpDeliveryOrder) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(tmpDeliveryOrder);
            session.getTransaction().commit();

        } catch (Exception ex) {
            ex.printStackTrace();
            if (session != null) {
                session.getTransaction().rollback();
            }
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }
}
