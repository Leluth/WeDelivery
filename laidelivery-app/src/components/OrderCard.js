import React from "react";
import {Button, Card, Col, Collapse, Descriptions, Row, Tooltip} from "antd";
import {CaretRightOutlined, EnvironmentOutlined} from "@ant-design/icons";

const {Panel} = Collapse;

class OrderCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    };

    render = () => {
        const {
            weight, packageType, shippingFrom, shippingTo, packageContent,
            deliveryType, serviceType, createTime, deliveryTime, pickUpTime, centerId, price,
        } = this.props.info;

        return (
            <Card
                title={packageContent}
                extra={<h1>${price}</h1>}
            >
                <Descriptions column={1} labelStyle={{fontWeight: 'bold'}}>
                    <Descriptions.Item label="Shipping From">{shippingFrom}</Descriptions.Item>
                    <Descriptions.Item label="Shipping To">{shippingTo}</Descriptions.Item>
                    <Descriptions.Item label="PickUp Time">{pickUpTime}</Descriptions.Item>
                    <Descriptions.Item label="Delivery Time">{deliveryTime}</Descriptions.Item>
                    <Descriptions.Item label="Pick Up Center">{centerId}</Descriptions.Item>
                </Descriptions>
                <Row>
                    <Col span={22}>
                        <Collapse
                            ghost
                            expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}>
                            <Panel header="more" key="1">
                                <Descriptions column={2} labelStyle={{fontWeight: 'bold'}}>
                                    <Descriptions.Item label="Weight">{weight}</Descriptions.Item>
                                    <Descriptions.Item label="Package Type">{packageType}</Descriptions.Item>
                                    <Descriptions.Item label="Delivery Type">{deliveryType}</Descriptions.Item>
                                    <Descriptions.Item label="Service Type">{serviceType}</Descriptions.Item>
                                </Descriptions>
                            </Panel>
                        </Collapse>
                    </Col>
                    <Col span={2}>
                        <Tooltip title="track">
                            <Button
                                shape="circle"
                                size="large"
                                icon={<EnvironmentOutlined />}
                                onClick={this.updateInfo}/>
                        </Tooltip>
                    </Col>
                </Row>
            </Card>
        );
    };

    updateInfo = e => {
        this.props.onChange();
    }
}

export default OrderCard;