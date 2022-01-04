package com.laioffer.laiDelivery.dao;

import com.laioffer.laiDelivery.entity.DeliveryOrder;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: DeliveryOrderDao
 * @date 2021/12/21 14:41
 */
@Repository
public class DeliveryOrderDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void saveDeliveryOrder(DeliveryOrder deliveryOrder) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(deliveryOrder);
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

    public DeliveryOrder gerDeliveryOrder(int id) {
        try (Session session = sessionFactory.openSession()) {
            Criteria cr = session.createCriteria(DeliveryOrder.class);
            cr.add(Restrictions.eq("id", id));
            return (DeliveryOrder) cr.list().get(0);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new DeliveryOrder();
    }
}
