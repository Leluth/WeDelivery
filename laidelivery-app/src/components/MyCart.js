import {Button, Drawer, List, message, Typography} from "antd";
import {useEffect, useState} from "react";
import {checkout, getCart} from "../utils";

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
                setCartData(data);
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
        checkout()
            .then(() => {
                message.success("Successfully checkout");
                setCartVisible(false);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setChecking(false);
            });
    };

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
            {
                showPackageList ?
                    (
                        <Button type="primary" shape="round" onClick={onShowOrders} style={{marginRight: 10}}>
                            Orders
                        </Button>
                    ) : (
                        <Button type="primary" shape="round" onClick={onShowPackageList} style={{marginRight: 10}}>
                            Packages
                        </Button>
                    )
            }
            <Button type="primary" shape="round" onClick={onOpenDrawer}>
                Cart
            </Button>
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
                        <Text strong={true}>{`Total price: $${cartData?.totalPrice}`}</Text>
                        <div>
                            <Button onClick={onCloseDrawer} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            <Button
                                onClick={onCheckOut}
                                type="primary"
                                loading={checking}
                                disabled={loading || cartData?.orderItemList.length === 0}
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
                    dataSource={cartData?.orderItemList}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.menuItem.name}
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