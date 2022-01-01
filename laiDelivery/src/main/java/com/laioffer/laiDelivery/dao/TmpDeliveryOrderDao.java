package com.laioffer.laiDelivery.dao;

import com.laioffer.laiDelivery.entity.TmpDeliveryOrder;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.laioffer.laiDelivery.dao.DeliveryOrderDao;

import java.io.Serializable;
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
            // only submit the deliveryorder which has status == 1
            Criteria cr = session.createCriteria(TmpDeliveryOrder.class);
            cr.add(Restrictions.eq("status", 1));
            return cr.list();
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

    public void deleteTmpDeliveryOrderById(int id) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            Object persistentInstance = session.load(TmpDeliveryOrder.class, id);
            if (persistentInstance != null) {
                session.beginTransaction();
                session.delete(persistentInstance);
                session.getTransaction().commit();
            }
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
    public void deleteTmpDeliveryOrder(int buffer) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            Object persistentInstance = session.load(TmpDeliveryOrder.class, buffer);
            if (persistentInstance != null) {
                session.beginTransaction();
                session.delete(persistentInstance);
                session.getTransaction().commit();
            }
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
