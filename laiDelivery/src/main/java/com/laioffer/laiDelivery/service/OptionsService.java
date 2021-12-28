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
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

// reques
// 1. weight
// 2. size

@Service
public class OptionsService {

    @Autowired
    private DistributionCenterDao distributionCenterDao;

    private static int STATIC_DRONE_MAX_SPEED = 54;          //kmph (DJI Mavic 2pro’s max speed)
    private static int STATIC_DRONE_MAX_WEIGHT = 2;          //kg
    private static int STATIC_ROBOT_MAX_SPEED = 40;          //kmph
    private static int STATIC_ROBOT_MAX_WEIGHT = 200;        //kg
    private static double STATIC_DRONE_PRICE = 1;            //(per dollar per min)
    private static double STATIC_ROBOT_PRICE = 0.1;          //$ 0.1 (per min)
    private static final  double EARTH_RADIUS = 6378137;     //赤道半径
    private static String API_KEY = "AIzaSyBKeoqUYuYx2LOxcxZZzHsExPEIXBgdI5c";

    public List<OptionsInfo> getOptions(ItemInfo itemInfo) throws IOException, InterruptedException, ApiException {
        // step1: initialize
        List<OptionsInfo> result = new ArrayList<>();
        OptionsInfo drone = new OptionsInfo();
        OptionsInfo robot = new OptionsInfo();

        double weight = itemInfo.getWeight();
        String start = itemInfo.getShippingFrom();
        String end = itemInfo.getShippingTo();

        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(API_KEY)
                .build();

        // step2: calculate different option's price
        // step2.1: calculate the shortest path from distribution center to start point
        List<DistributionCenter> centers = distributionCenterDao.getDistributionCenters();
        GeocodingResult[] results1 =  GeocodingApi.geocode(context, start).await();
        double lat1 = results1[0].geometry.location.lat;
        double lng1 = results1[0].geometry.location.lng;
        GeocodingResult[] results2 =  GeocodingApi.geocode(context, end).await();
        double lat2 = results2[0].geometry.location.lat;
        double lng2 = results2[0].geometry.location.lng;


        // step2.1.1: shortest drone path
        PriorityQueue<DistributionCenter> droneCenter = new PriorityQueue<>(10, new Comparator<DistributionCenter>() {
            @Override
            public int compare(DistributionCenter o1, DistributionCenter o2) {
                if (GetDistance(lng1, lat1, Double.valueOf(o1.getLongtitue()), Double.valueOf(o1.getLatitute())) < GetDistance(lng1, lat1, Double.valueOf(o2.getLongtitue()), Double.valueOf(o2.getLatitute()))) {
                    return -1;
                } else if (GetDistance(lng1, lat1, Double.valueOf(o1.getLongtitue()), Double.valueOf(o1.getLatitute())) > GetDistance(lng1, lat1, Double.valueOf(o2.getLongtitue()), Double.valueOf(o2.getLatitute()))) {
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
        double shortestPickUpTime = GetDistance(lng1, lat1, Double.valueOf(shortest.getLongtitue()), Double.valueOf(shortest.getLatitute())) / STATIC_DRONE_MAX_SPEED * 60;
        double pickUpPrice = shortestPickUpTime * STATIC_DRONE_PRICE;
        drone.setPickUpTime(shortestPickUpTime);
        drone.setPrice(pickUpPrice);
        drone.setCenterId(shortest.getCenterId());


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
            double durationInMinutes = durationInSeconds / 60;
            map.put(center, durationInMinutes);
        }
        DistributionCenter shortestRobot = centers.get(0);
        double shortestMinutes = map.get(shortestRobot);
        for (Map.Entry<DistributionCenter, Double> entry : map.entrySet()) {
            if (entry.getValue() < shortestMinutes) {
                shortestRobot = entry.getKey();
                shortestMinutes = entry.getValue();
            }
        }
        double priceRobot = shortestMinutes * STATIC_ROBOT_PRICE;
        robot.setCenterId(shortestRobot.getCenterId());
        robot.setPickUpTime(shortestMinutes);
        robot.setPrice(priceRobot);


        // step2.2: calculate the path from origin to destination
        drone.setServiceType("drone");
        drone.setDeliveryType("express");
        if (weight <= STATIC_DRONE_MAX_WEIGHT) {
            drone.setEnable(true);

            double distance = GetDistance(lng1, lat1, lng2, lat2);
            double durationInMinutes = distance / STATIC_DRONE_MAX_SPEED * 60;
            drone.setDeliveryTime(durationInMinutes);

            // update price
            double price = drone.getPrice() + durationInMinutes * STATIC_DRONE_PRICE;
            drone.setPrice(price);
            drone.setCenterLat(Double.valueOf(shortest.getLatitute()));
            drone.setCenterLng(Double.valueOf(shortest.getLongtitue()));
            drone.setOriginLat(lat1);
            drone.setOriginLng(lng1);
            drone.setDestinationLat(lat2);
            drone.setDestinationLng(lng2);
        } else {
            drone.setErrorMessage("input weight is above drone's max capacity");
        }
        result.add(drone);



        robot.setServiceType("robot");
        robot.setDeliveryType("express");
        if (weight <= STATIC_ROBOT_MAX_WEIGHT) { // 1. weight, 2. location, 3. size
            robot.setEnable(true);
            // google map service
            DirectionsResult routes = DirectionsApi.newRequest(context)
                    .origin(start)
                    .destination(end)
                    .await();
            DirectionsLeg leg = routes.routes[0].legs[0];
            long durationInSeconds = leg.duration.inSeconds;
            double durationInMinutes = durationInSeconds / 60;
            robot.setDeliveryTime(durationInMinutes);

            // update price
            double price = robot.getPrice() + durationInMinutes * STATIC_ROBOT_PRICE;
            robot.setPrice(price);

            // store frontend asked data, avoid repeat calculation in tracking page
            robot.setCenterLat(Double.valueOf(shortestRobot.getLatitute()));
            robot.setCenterLng(Double.valueOf(shortestRobot.getLongtitue()));
            robot.setOriginLat(lat1);
            robot.setOriginLng(lng1);
            robot.setDestinationLat(lat2);
            robot.setDestinationLng(lng2);
        } else {
            robot.setErrorMessage("input weight is above robot's max capacity");
        }

        result.add(robot);
        context.shutdown();
        return result;
    }

    public double GetDistance(double lon1,double lat1,double lon2, double lat2) {
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
