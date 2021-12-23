import {Component} from "react";
import {Col, List, Row} from "antd";
import OrderCard from "./OrderCard";
import {MapContainer} from "./MapContainer";

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geoInfo: {}
        };
    }

    render() {
        const data = [
            {
                weight: 1.0,
                packageType: "files",
                shippingFrom: "99 Marx Meadow Dr, San Francisco, CA 94121",
                shippingTo: "767 27th Ave, San Francisco, CA 94121",
                deliveryType: "express",
                serviceType: "drone",
                deliveryTime: "Dec 25 Saturday, 14:30, 2021",
                pickUpTime: "Dec 25 Saturday, 13:30, 2021",
                centerId: "Golden State Park",
                price: 4.8,
                centerAddress: {lat: 37.76959039850192, lng: -122.48618161515449},
                shippingFromAddress: {lat: 37.7710361183368, lng: -122.48631822864473},
                shippingToAddress: {lat: 37.77522198868919, lng: -122.4862839347116},
            },
            {
                weight: 2.0,
                packageType: "files",
                shippingFrom: "99 Marx Meadow Dr, San Francisco, CA 94121",
                shippingTo: "767 27th Ave, San Francisco, CA 94121",
                deliveryType: "standard",
                serviceType: "robot",
                deliveryTime: "Dec 24 Friday, 14:30, 2021",
                pickUpTime: "Dec 24 Friday, 13:30, 2021",
                centerId: "Golden State Park",
                price: 4.8,
                centerAddress: {lat: 37.76959039850192, lng: -122.48618161515449},
                shippingFromAddress: {lat: 37.76902217385397, lng: -122.48343503299812},
                shippingToAddress: {lat: 37.771337449919294, lng: -122.4862839347116},
            },
            {
                weight: 3.0,
                packageType: "files",
                shippingFrom: "99 Marx Meadow Dr, San Francisco, CA 94121",
                shippingTo: "767 27th Ave, San Francisco, CA 94121",
                deliveryType: "express",
                serviceType: "drone",
                deliveryTime: "Dec 23 Thursday, 14:30, 2021",
                pickUpTime: "Dec 23 Thursday, 13:30, 2021",
                centerId: "Golden State Park",
                price: 4.8,
                centerAddress: {lat: 37.76959039850192, lng: -122.48618161515449},
                shippingFromAddress: {lat: 37.77022646568948, lng: -122.48877799359923},
                shippingToAddress: {lat: 37.76767368293346, lng: -122.49678170542627},
            },
        ];

        return (
            <Row className='main'>
                <Col span={7} className='left-side'>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <OrderCard info={item} onChange={(e) => {
                                    this.setState({geoInfo: item})
                                }}/>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={17} className="right-side">
                    <MapContainer geoInfo={this.state.geoInfo}/>
                </Col>
            </Row>
        );
    }
}

export default MyOrders;