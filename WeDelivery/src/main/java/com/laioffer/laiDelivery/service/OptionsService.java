package com.laioffer.laiDelivery.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsLeg;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.DirectionsRoute;
import com.google.maps.model.GeocodingResult;
import com.laioffer.laiDelivery.dao.CustomerDao;
import com.laioffer.laiDelivery.dao.DistributionCenterDao;
import com.laioffer.laiDelivery.entity.DeliveryOrder;
import com.laioffer.laiDelivery.entity.DistributionCenter;
import com.laioffer.laiDelivery.entity.ItemInfo;
import com.laioffer.laiDelivery.entity.OptionsInfo;
import com.sun.xml.bind.v2.TODO;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

// reques
// 1. weight
// 2. size

@Service
public class OptionsService {

    @Autowired
    private DistributionCenterDao distributionCenterDao;

    private static int STATIC_DRONE_MAX_SPEED = 54;          //kmph (DJI Mavic 2pro’s max speed)
    private static int STATIC_DRONE_MAX_RADIUS = 20;         //km
    private static int STATIC_DRONE_MAX_WEIGHT = 20;         //lbs
    private static int STATIC_DRONE_PRICE = 1;               //(per dollar per min)

    private static int STATIC_ROBOT_MAX_SPEED = 40;          //kmph
    private static int STATIC_ROBOT_MAX_RADIUS = 50;         //km
    private static int STATIC_ROBOT_MAX_WEIGHT = 2000;       //lbs
    private static double STATIC_ROBOT_PRICE = 0.1;          //$0.1 (per min)

    private static double STATIC_MEMBER_DISCOUNT = 0.8;      //if users has high volume of inventory needs to transfer, we will give him a discount.

    private static final  double EARTH_RADIUS = 6378137;     //赤道半径
    private static String API_KEY = "AIzaSyBKeoqUYuYx2LOxcxZZzHsExPEIXBgdI5c";

    public List<OptionsInfo> getOptions(ItemInfo itemInfo) throws IOException, InterruptedException, ApiException {
        // step1: initialize
        // initialize options
        List<OptionsInfo> result = new ArrayList<>();
        OptionsInfo expressDrone = new OptionsInfo();
        expressDrone.setServiceType("drone");
        expressDrone.setDeliveryType("express");
        OptionsInfo expressRobot = new OptionsInfo();
        expressRobot.setServiceType("robot");
        expressRobot.setDeliveryType("express");

        // initialize item info
        double weight = itemInfo.getWeight();
        weight = round(weight, 2);
        String size = itemInfo.getSize();
        String start = itemInfo.getShippingFrom();
        String end = itemInfo.getShippingTo();
        boolean isMember = itemInfo.isMember();
        String pickUpDate = itemInfo.getPickupDate();

        // initialize google map api
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(API_KEY)
                .build();

        // initialize start, end geocoding info and distribution center info
        List<DistributionCenter> centers = distributionCenterDao.getDistributionCenters();
        GeocodingResult[] results1 =  GeocodingApi.geocode(context, start).await();
        double orgLat = results1[0].geometry.location.lat;
        double orgLng = results1[0].geometry.location.lng;
        GeocodingResult[] results2 =  GeocodingApi.geocode(context, end).await();
        double dstLat = results2[0].geometry.location.lat;
        double dstLng = results2[0].geometry.location.lng;


        // step 2: calculate different options info
        expressDrone = expressDrone(expressDrone, context, weight, size, start, end, isMember, centers, orgLat, orgLng, dstLat, dstLng);
        result.add(expressDrone);

        expressRobot = expressRobot(expressRobot, context, weight, size, start, end, isMember, centers, orgLat, orgLng, dstLat, dstLng);
        result.add(expressRobot);

        // step 3: finish
        context.shutdown();
        return result;
    }

    public OptionsInfo expressDrone(OptionsInfo drone, GeoApiContext context,
                                    double weight, String size, String start, String end, boolean isMember,
                                    List<DistributionCenter> centers, double orgLat, double orgLng, double dstLat, double dstLng) {
        // step2: calculate different option's price
        // step2.1: calculate the shortest path from distribution center to start point
        // step2.1.1: shortest drone path
        double finalLng = orgLng;
        double finalLat = orgLng;
        PriorityQueue<DistributionCenter> droneCenter = new PriorityQueue<>(10, new Comparator<DistributionCenter>() {
            @Override
            public int compare(DistributionCenter o1, DistributionCenter o2) {
                if (GetDistance(finalLng, finalLat, Double.valueOf(o1.getLongtitue()), Double.valueOf(o1.getLatitute())) < GetDistance(finalLng, finalLat, Double.valueOf(o2.getLongtitue()), Double.valueOf(o2.getLatitute()))) {
                    return -1;
                } else if (GetDistance(finalLng, finalLat, Double.valueOf(o1.getLongtitue()), Double.valueOf(o1.getLatitute())) > GetDistance(finalLng, finalLat, Double.valueOf(o2.getLongtitue()), Double.valueOf(o2.getLatitute()))) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });

        for (DistributionCenter center : centers) {
            droneCenter.offer(center);
        }
        DistributionCenter shortest = droneCenter.poll();
        double shortestPickUpDistance = GetDistance(orgLng, orgLat, Double.valueOf(shortest.getLongtitue()), Double.valueOf(shortest.getLatitute()));
        double shortestPickUpTime = div(shortestPickUpDistance, STATIC_DRONE_MAX_SPEED, 2) * 60;
        shortestPickUpTime = round(shortestPickUpTime, 2);
        double pickUpPrice = shortestPickUpTime * STATIC_DRONE_PRICE;
        pickUpPrice = round(pickUpPrice,2);


        // step2.2: calculate the path from origin to destination

        double deliveryDistance = GetDistance(orgLng, orgLat, dstLng, dstLat);
        double durationInMinutes = round(div(deliveryDistance, STATIC_DRONE_MAX_SPEED, 2) * 60, 2);

        // update price
        double deliveryPrice = round(durationInMinutes * STATIC_DRONE_PRICE, 2);
        double finalPrice = round(pickUpPrice + deliveryPrice, 2);

        double finalDistance = shortestPickUpDistance + deliveryDistance;

        // step 3: validation and finish
        if (weight > STATIC_DRONE_MAX_WEIGHT) {
            drone.setErrorMessage("input weight is above drone's max capacity.");
        } else if (shortestPickUpDistance > STATIC_DRONE_MAX_RADIUS) {
            drone.setErrorMessage("input origin is out of service.");
        } else if (finalDistance > STATIC_DRONE_MAX_RADIUS) {
            drone.setErrorMessage("input service distance is unable to reach");
        } else {
            drone.setEnable(true);
            drone.setPrice(finalPrice);
            drone.setCenterLat(Double.valueOf(shortest.getLatitute()));
            drone.setCenterLng(Double.valueOf(shortest.getLongtitue()));
            drone.setOriginLat(orgLat);
            drone.setOriginLng(orgLng);
            drone.setDestinationLat(dstLat);
            drone.setDestinationLng(dstLng);
            drone.setDeliveryTime(durationInMinutes);
            drone.setPickUpTime(shortestPickUpTime);
            drone.setCenterId(shortest.getCenterId());
        }
        return drone;
    }

    public OptionsInfo expressRobot(OptionsInfo robot, GeoApiContext context,
                                    double weight, String size, String start, String end, boolean isMember,
                                    List<DistributionCenter> centers, double orgLat, double orgLng, double dstLat, double dstLng) throws IOException, InterruptedException, ApiException {
        // step 2.1: calculate shortest path from 3 distribution center to origin
        // step2.1.2: shortest robot path
        Map<DistributionCenter, Double> map = new HashMap<>();
        for (DistributionCenter center : centers) {
            String centerPosition = center.getLatitute()+","+center.getLongtitue();
            DirectionsResult routes = DirectionsApi.newRequest(context)
                    .origin(centerPosition)
                    .destination(start)
                    .await();
            DirectionsLeg leg = routes.routes[0].legs[0];
            long durationInSeconds = leg.duration.inSeconds;
            double durationInMinutes = round(durationInSeconds / 60, 2) ;
            map.put(center, durationInMinutes);
        }
        DistributionCenter shortestRobot = centers.get(0);
        double shortestMinutes = map.get(shortestRobot);
        shortestMinutes = round(shortestMinutes, 2);
        for (Map.Entry<DistributionCenter, Double> entry : map.entrySet()) {
            if (entry.getValue() < shortestMinutes) {
                shortestRobot = entry.getKey();
                shortestMinutes = entry.getValue();
            }
        }
        double priceRobot = shortestMinutes * STATIC_ROBOT_PRICE;
        priceRobot = round(priceRobot, 2);

        String centerPosition = shortestRobot.getLatitute()+","+shortestRobot.getLongtitue();
        DirectionsResult shortestRoutes = DirectionsApi.newRequest(context)
                .origin(centerPosition)
                .destination(start)
                .await();
        DirectionsLeg shortestLeg = shortestRoutes.routes[0].legs[0];
        double shortestDistance = shortestLeg.distance.inMeters / 1000;


        // google map service
        DirectionsResult routes = DirectionsApi.newRequest(context)
                .origin(start)
                .destination(end)
                .await();
        DirectionsLeg leg = routes.routes[0].legs[0];
        long durationInSeconds = leg.duration.inSeconds;
        double durationInMinutes = div(durationInSeconds, 60, 2);
        double deliveryDistance = leg.distance.inMeters / 1000;

        // update price
        double deliveryPrice = round(durationInMinutes * STATIC_ROBOT_PRICE, 2);
        double finalPrice = round(deliveryPrice + priceRobot, 2);

        double finalDistance = shortestDistance + deliveryDistance;

        if (weight > STATIC_ROBOT_MAX_WEIGHT) {
            robot.setErrorMessage("input weight is above robot's max capacity.");
        } else if (shortestDistance > STATIC_ROBOT_MAX_RADIUS) {
            robot.setErrorMessage("input origin is out of service.");
        } else if (finalDistance > STATIC_ROBOT_MAX_RADIUS) {
            robot.setErrorMessage("input service distance is unable to reach");
        } else {
            robot.setEnable(true);
            robot.setPrice(finalPrice);
            robot.setCenterLat(Double.valueOf(shortestRobot.getLatitute()));
            robot.setCenterLng(Double.valueOf(shortestRobot.getLongtitue()));
            robot.setOriginLat(orgLat);
            robot.setOriginLng(orgLng);
            robot.setDestinationLat(dstLat);
            robot.setDestinationLng(dstLng);
            robot.setCenterId(shortestRobot.getCenterId());
            robot.setPickUpTime(shortestMinutes);
            robot.setDeliveryTime(durationInMinutes);
        }
        return robot;
    }
    // some helper functions

    // this one is for drone's straight line distance calculation.
    private double GetDistance(double lon1,double lat1,double lon2, double lat2) {
        double radLat1 = rad(lat1);
        double radLat2 = rad(lat2);
        double a = radLat1 - radLat2;
        double b = rad(lon1) - rad(lon2);
        double s = 2 *Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2)+Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s * EARTH_RADIUS;
        return s / 1000;  //单位km
    }

    private double rad(double d){
        return d * Math.PI / 180.0;
    }

    private double div(double v1,double v2,int scale){
        if(scale<0){
            throw new IllegalArgumentException(
                    "The scale must be a positive integer or zero");
        }
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.divide(b2,scale,BigDecimal.ROUND_HALF_UP).doubleValue();
    }

    private double round(double v,int scale){
        if(scale<0){
            throw new IllegalArgumentException(
                    "The scale must be a positive integer or zero");
        }
        BigDecimal b = new BigDecimal(Double.toString(v));
        BigDecimal one = new BigDecimal("1");
        return b.divide(one,scale,BigDecimal.ROUND_HALF_UP).doubleValue();
    }

}

// tests code
//    public static void main(String[] args) throws IOException, InterruptedException, ApiException {
//        String start = "666 west end avenue, 10025";
//        GeoApiContext context = new GeoApiContext.Builder()
//                .apiKey(API_KEY)
//                .build();
//        List<DistributionCenter> centers = new ArrayList<>();
//        DistributionCenter a = new DistributionCenter();
//        a.setCenterId("a");
//        a.setLatitute("37.7793");
//        a.setLongtitue("-122.4192");
//        centers.add(a);
//        DistributionCenter b = new DistributionCenter();
//        b.setCenterId("b");
//        b.setLatitute("37.7694");
//        b.setLongtitue("-122.4862");
//        centers.add(b);
//        Map<DistributionCenter, Double> map = new HashMap<>();
//        for (DistributionCenter center : centers) {
//            String centerPosition = center.getLatitute()+","+center.getLongtitue();
//            DirectionsResult routes = DirectionsApi.newRequest(context)
//                    .origin(centerPosition)
//                    .destination(start)
//                    .await();
//            DirectionsLeg leg = routes.routes[0].legs[0];
//            long durationInSeconds = leg.duration.inSeconds;
//            double durationInMinutes = durationInSeconds / 60;
//            map.put(center, durationInMinutes);
//        }
//        DistributionCenter shortestRobot = centers.get(0);
//        double shortestMinutes = map.get(shortestRobot);
//        for (Map.Entry<DistributionCenter, Double> entry : map.entrySet()) {
//            if (entry.getValue() < shortestMinutes) {
//                shortestRobot = entry.getKey();
//                shortestMinutes = entry.getValue();
//            }
//        }
//        double priceRobot = shortestMinutes * STATIC_ROBOT_PRICE;
//        System.out.println();
//    }
//    public static void main(String[] args) throws IOException, InterruptedException, ApiException {
//        GeoApiContext context = new GeoApiContext.Builder()
//                .apiKey(API_KEY)
//                .build();
//        GeocodingResult[] results =  GeocodingApi.geocode(context,
//                "1600 Amphitheatre Parkway Mountain View, CA 94043").await();
//        context.shutdown();
//        double lat = results[0].geometry.location.lat;
//        System.out.println();
//    }
//    public static void main(String[] args) throws IOException, InterruptedException, ApiException {
//        String start = "666 west end avenue, 10025";
//        String end = "World Trade Center, NY";
//        GeoApiContext context = new GeoApiContext.Builder()
//                .apiKey("AIzaSyBKeoqUYuYx2LOxcxZZzHsExPEIXBgdI5c")
//                .build();
//        DirectionsResult routes = DirectionsApi.newRequest(context)
//                .origin(start)
//                .destination(end)
//                .await();
//        DirectionsRoute route = routes.routes[0];
//        DirectionsLeg leg = route.legs[0];
//        long duration = leg.duration.inSeconds;
//        System.out.println();
//        context.shutdown();
//
//    }

//    public static void main(String[] args) throws IOException {
//        OkHttpClient client = new OkHttpClient().newBuilder()
//                .build();
//        Request request = new Request.Builder()
//                .url("https://maps.googleapis.com/maps/api/directions/json?origin=Brooklyn&destination=Queens&mode=transit&key="+API_KEY)
//                .method("GET", null)
//                .build();
//        Response response = client.newCall(request).execute();
//        System.out.println();
//    }

//    public static void main(String[] args) {
//        String start = "666 west end avenue, 10025";
//        String end = "Columbia University, 10027";
//        GeoApiContext context = new GeoApiContext.Builder()
//                .apiKey(API_KEY)
//                .build();
//        DirectionsApiRequest directionsApiRequest = DirectionsApi.getDirections(context, start, end);
//        System.out.println();
//    }
