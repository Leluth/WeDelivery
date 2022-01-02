import {Button, Drawer, List, message, Space, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {checkout, getCart, getTmpOrder, cancelCart} from "../utils";
import {getCurrentTimeStr, getNewTimeStr} from "../timeUtils";

const {Text} = Typography;

const MyCart = (props) => {

    const [cartVisible, setCartVisible] = useState(false);
    const [cartData, setCartData] = useState();
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);
    const [showPackageList, setShowPackageList] = useState(true);
    useEffect(() => {
        if (!cartVisible) {
            return;
        }

        setLoading(true);
        getCart()
            .then((data) => {
                // console.log(data)
                setCartData(data);
                // console.log(cartData);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [cartVisible]);

    const onCheckOut = () => {
        setChecking(true);
        cartData.forEach((item) => {
            item.createTime = getCurrentTimeStr()
            item.pickUpTime = getNewTimeStr(item.createTime, item.pickUpTime)
            item.deliveryTime = getNewTimeStr(item.createTime, item.deliveryTime)
            // console.log(item)
        });
        checkout(cartData)
            .then(() => {
                message.success("Successfully checkout");
                setCartVisible(false);
                // trigger package list update
                props.setSignal()
            })
            .catch((err) => {
                // message.success("Successfully checkout");
                message.error(err.message);
            })
            .finally(() => {
                setChecking(false);
            });

    };

    const onCancel = () => {
        cancelCart()
            .then(() => {
                message.success("Successfully cancel");
                // setCartVisible(false);
                // trigger package list update
                props.setSignal()
            })
            .catch((err) => {
                // message.success("Successfully checkout");
                message.error(err.message);
            })
            .finally(() => {
                setChecking(false);
            });

    };

    function sum(obj) {
        var sum = 0.0;
        for (var index in obj) {
            // console.log(obj[index])
            sum += obj[index].price;
        }
        return sum;
    }

    const onCloseDrawer = () => {
        setCartVisible(false);
    };

    const onOpenDrawer = () => {
        setCartVisible(true);
    };

    const onShowOrders = () => {
        setShowPackageList(false);
        props.setShowPackageList(false);
    };

    const onShowPackageList = () => {
        setShowPackageList(true);
        props.setShowPackageList(true);
    };

    return (
        <>
            <Space>
                {
                    showPackageList ?
                        (
                            <Button type="primary" shape="round" onClick={onShowOrders} style={{marginRight: 10}}>
                                Track
                            </Button>
                        ) : (
                            <Button type="primary" shape="round" onClick={onShowPackageList} style={{marginRight: 10}}>
                                Manage Packages
                            </Button>
                        )
                }
                <Button type="primary" shape="round" onClick={onOpenDrawer}>
                    Cart
                </Button>
            </Space>
            <Drawer
                title="My Shopping Cart"
                onClose={onCloseDrawer}
                visible={cartVisible}
                width={520}
                footer={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text strong={true}>{`Total price: $${sum(cartData)}`}</Text>
                        <div>
                            <Button onClick={() => {
                                onCloseDrawer();
                                onCancel();
                            }} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            <Button
                                onClick={onCheckOut}
                                type="primary"
                                loading={checking}
                                // disabled={loading || cartData?.orderItemList.length === 0}
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                }
            >
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={cartData}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                // add more if needed
                                title={item.packageContent}
                                description={`$${item.price}`}
                            />
                        </List.Item>
                    )}

                />
            </Drawer>
        </>
    );
}

export default MyCart;