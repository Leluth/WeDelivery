package com.laioffer.laiDelivery.dao;


import com.laioffer.laiDelivery.entity.DistributionCenter;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class DistributionCenterDao {

    @Autowired
    private SessionFactory sessionFactory;

    public List<DistributionCenter> getDistributionCenters() {
        try (Session session = sessionFactory.openSession()) {
            return session.createCriteria(DistributionCenter.class)
                    .setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
                    .list();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ArrayList<>();
    }

}
