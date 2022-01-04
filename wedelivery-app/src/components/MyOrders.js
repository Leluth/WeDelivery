import React, {Component} from "react";
import {Col, List, message, Row, Steps} from "antd";
import OrderCard from "./OrderCard";
import MapContainer from "./MapContainer";
import {getOrders} from "../utils";
import {getCurrentTimeStr, smallerThan} from "../timeUtils";

const {Step} = Steps;

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geoInfo: {},
            data: [],
            status: -1
        };
    }

    componentDidMount() {
        if (this.props.trackingInfo === null) {
            getOrders()
                .then((data) => {
                    this.setState({
                        data: data.orderItemList.reverse()
                    })
                })
                .catch((err) => {
                    message.error(err.message);
                })
        } else {
            this.setState({
                data: [this.props.trackingInfo]
            })
        }
    }

    updateStatus(item) {
        if (smallerThan(getCurrentTimeStr(), item.pickUpTime)) {
            // console.log('ordered')
            this.setState({status: 0})
        } else if (smallerThan(getCurrentTimeStr(), item.deliveryTime)) {
            // console.log('picked up')
            this.setState({status: 1})
        } else {
            // console.log('delivered')
            this.setState({status: 2})
        }
    }

    render() {
        return (
            <Row className='main'>
                <Col span={7} className='left-side'>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item>
                                <OrderCard info={item} onChange={(e) => {
                                    this.setState({geoInfo: item})
                                    this.updateStatus(item)
                                }}/>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={17} className="right-side">
                    {
                        this.state.status === -1 ? (
                            <></>
                        ) : (
                            <Steps progressDot current={this.state.status}>
                                <Step title="Ordered" description="Our robot/drone is on the way"/>
                                <Step title="Picked Up" description="Almost there!"/>
                                <Step title="Delivered" description="Your order has been delivered"/>
                            </Steps>
                        )
                    }
                    <MapContainer geoInfo={this.state.geoInfo}/>
                </Col>
            </Row>
        );
    }
}

export default MyOrders;