import React, {Component} from "react";
import GoogleMapReact from 'google-map-react';

function MarkerLabel(props) {
    const {title, body, time} = props
    const contentString =
        '<div style="text-align: center; padding-right: 10px; padding-bottom: 10px;">' +
        '<h1 id="head">' + title + '</h1>' +
        '<div id="body">' +
        "<p><b>" + body +"</b>" + time + "</p>" +
        "</div>" +
        "</div>";

    return (
        contentString
    )
}

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.map = null;
        this.maps = null;
        this.flightPath = null;
        this.markers = []
    }

    addMarker(position, title, body, time) {
        const marker = new this.maps.Marker({
            position: position,
            map: this.map,
            animation: this.maps.Animation.DROP,
        });
        this.markers.push(marker);
        const infoWindow = new this.maps.InfoWindow({
            content: MarkerLabel({title: title, body: body, time: time}),
        });
        infoWindow.open(marker.get("map"), marker);
    }

    setMapOnAll(map) {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

    hideMarkers() {
        this.setMapOnAll(null);
    }

    deleteMarkers() {
        this.hideMarkers();
        this.markers = [];
    }

    addLine() {
        this.flightPath.setMap(this.map);
        this.animateCircle(this.flightPath);
    }

    removeLine() {
        this.flightPath.setMap(null);
    }

    showLine(centerAddress, shippingFromAddress, shippingToAddress, serviceType) {
        this.flightPath = new this.maps.Polyline({
            path: [],
            strokeColor: "#1890ff",
            strokeOpacity: 0.7,
            strokeWeight: 10,
            icons: [
                {
                    icon: serviceType === "robot" ? {
                            path: this.maps.SymbolPath.CIRCLE,
                            scale: 15,
                            strokeColor: "#393",
                            strokeOpacity: 1.0,
                        } :
                        {
                            path: this.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            scale: 8,
                            strokeColor: "#393",
                            strokeOpacity: 1.0,
                        },
                    offset: "100%",
                },
            ],
        });
        if (serviceType === "drone") {
            this.flightPath.setPath([
                centerAddress,
                shippingFromAddress,
                shippingToAddress,
            ])
        } else {
            const directionsService = new this.maps.DirectionsService();
            let curFlightPath = this.flightPath;
            let curMaps = this.maps;
            directionsService.route({
                origin: centerAddress,
                destination: shippingToAddress,
                waypoints: [{
                    stopover: true,
                    location: shippingFromAddress
                }],
                travelMode: this.maps.TravelMode.WALKING
            }, function (response, status) {
                if (status === curMaps.DirectionsStatus.OK) {
                    const center = new curMaps.LatLng(centerAddress.lat, centerAddress.lng)
                    const origin = new curMaps.LatLng(shippingFromAddress.lat, shippingFromAddress.lng)
                    const destination = new curMaps.LatLng(shippingToAddress.lat, shippingToAddress.lng)
                    curFlightPath.getPath().push(center);
                    const legs = response.routes[0].legs;
                    for (let i = 0; i < 2; i++) {
                        const steps = legs[i].steps;
                        for (let j = 0; j < steps.length; j++) {
                            const nextSegment = steps[j].path;
                            for (let k = 0; k < nextSegment.length; k++) {
                                curFlightPath.getPath().push(nextSegment[k]);
                            }
                        }
                        if (i === 0) {
                            curFlightPath.getPath().push(origin);
                        } else {
                            curFlightPath.getPath().push(destination);
                        }
                    }
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }
        this.addLine();
    }

    animateCircle(line) {
        let count = 0;
        window.setInterval(() => {
            count = (count + 1) % 200;
            const icons = line.get("icons");
            icons[0].offset = count / 2 + "%";
            line.set("icons", icons);
        }, 120);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.geoInfo !== this.props.geoInfo) {
            const {createTime, deliveryTime, pickUpTime,
                serviceType, centerLat, centerLng, originLat, originLng, destinationLat, destinationLng}
                = this.props.geoInfo;
            const centerAddress = {lat: centerLat, lng: centerLng}
            const shippingFromAddress = {lat: originLat, lng: originLng}
            const shippingToAddress = {lat: destinationLat, lng: destinationLng}
            this.deleteMarkers()
            if (this.flightPath != null) {
                this.removeLine()
            }
            this.map.setCenter(shippingFromAddress)
            this.addMarker(centerAddress, "Pick Center", "Create At: ", createTime)
            this.addMarker(shippingFromAddress, "Origin",  "Pick At: ", deliveryTime)
            this.addMarker(shippingToAddress, "Destination", "Deliver At: ", pickUpTime)
            const bounds = new this.maps.LatLngBounds();
            for (let i = 0; i < this.markers.length; i++) {
                const position = this.markers[i].getPosition()
                const point1 = new this.maps.LatLng(position.lat() + 0.001, position.lng() + 0.001);
                const point2 = new this.maps.LatLng(position.lat() - 0.001, position.lng() - 0.001);
                bounds.extend(point1);
                bounds.extend(point2);
            }
            this.map.fitBounds(bounds);
            this.showLine(centerAddress, shippingFromAddress, shippingToAddress, serviceType)
        }
    }

    render() {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyBKeoqUYuYx2LOxcxZZzHsExPEIXBgdI5c"}}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map, maps}) => {
                    this.map = map;
                    this.maps = maps;
                    // console.log(this.map)
                    // console.log(this.maps)
                }}
                defaultCenter={{lat: 37.76959039850192, lng: -122.48618161515449}}
                defaultZoom={16}
            >
            </GoogleMapReact>
        );
    }
}

export default MapContainer;