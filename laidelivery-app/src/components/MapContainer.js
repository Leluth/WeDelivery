import {Component} from "react";
import GoogleMapReact from 'google-map-react';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.map = null;
        this.maps = null;
        this.flightPath = null;
        this.markers = []
    }

    addMarker(position) {
        const marker = new this.maps.Marker({
            position: position,
            map: this.map,
        });
        this.markers.push(marker);
    }

    setMapOnAll(map) {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

    hideMarkers() {
        this.setMapOnAll(null);
    }
    showMarkers() {
        this.setMapOnAll(this.map);
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

    animateCircle(line) {
        let count = 0;
        window.setInterval(() => {
            count = (count + 1) % 200;
            const icons = line.get("icons");
            icons[0].offset = count / 2 + "%";
            line.set("icons", icons);
        }, 20);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.geoInfo !== this.props.geoInfo) {
            const {serviceType, centerAddress, shippingFromAddress, shippingToAddress} = this.props.geoInfo;
            const flightPathCoordinates = [
                centerAddress,
                shippingFromAddress,
                shippingToAddress,
            ];
            this.deleteMarkers()
            if (this.flightPath != null) {
                this.removeLine()
            }
            this.map.setCenter(shippingFromAddress)
            this.addMarker(centerAddress)
            this.addMarker(shippingFromAddress)
            this.addMarker(shippingToAddress)
            this.flightPath = new this.maps.Polyline({
                path: flightPathCoordinates,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                icons: [
                    {
                        icon: {
                            path: serviceType === "robot" ? this.maps.SymbolPath.CIRCLE : this.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            scale: 8,
                            strokeColor: "#393",
                        },
                        offset: "100%",
                    },
                ],
            });
            this.addLine();
        }
    }

    render() {
        const {rawAddress} = this.props.geoInfo;

        return (
            <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyBKeoqUYuYx2LOxcxZZzHsExPEIXBgdI5c"}}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => {
                    this.map = map;
                    this.maps = maps;
                    // console.log(this.map)
                    // console.log(this.maps)
                }}
                defaultCenter={{lat: 37.76959039850192, lng:-122.48618161515449}}
                defaultZoom={16}
            >
            </GoogleMapReact>
        );
    }
}

export default MapContainer;