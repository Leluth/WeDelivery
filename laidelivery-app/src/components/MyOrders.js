import React, {Component} from "react";
import {Col, List, message, Row} from "antd";
import OrderCard from "./OrderCard";
import MapContainer from "./MapContainer";
import {getOrders} from "../utils";

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geoInfo: {},
            data: []
        };
    }

    componentDidMount() {
        getOrders()
            .then((data) => {
                this.setState({
                    data: data.orderItemList.reverse()
                })
            })
            .catch((err) => {
                message.error(err.message);
            })
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