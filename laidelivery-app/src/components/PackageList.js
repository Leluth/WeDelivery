import {Button, Card, List, message, PageHeader, Select, Tooltip} from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getPackage, getOrder } from "../utils";
import { PlusOutlined } from "@ant-design/icons";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import PackageForm from "./PackageForm";
import { Paper,makeStyles } from '@material-ui/core';


const { Option } = Select;
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
}))

const AddToCartButton = ({ itemId }) => {
    const [loading, setLoading] = useState(false);

    const AddToCart = () => {
        setLoading(true);
        addItemToCart(itemId)
            .then(() => message.success(`Successfully add item`))
            .catch((err) => message.error(err.message))
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Tooltip title="Add to shopping cart">
            <Button
                loading={loading}
                type="primary"
                icon={<PlusOutlined />}
                onClick={AddToCart}
            />
        </Tooltip>
    );
};

const PackageList = () => {
    const [packageId, setPackageId] = useState([]);
    const [curPackage, setCurpackage ] = useState();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingPack, setLoadingPack] = useState(false);

    const useStyles = makeStyles(theme => ({
        pageContent: {
            margin: theme.spacing(5),
            padding: theme.spacing(3)
        }
    }))

    useEffect(() => {
        setLoadingPack(true);
        getOrder()
            .then((data) => {
                setOrders(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoadingPack(false);
            });
    }, []);

    useEffect(() => {
        if (curPackage) {
            setLoading(true);
            getPackage(curPackage)
                .then((data) => {
                    setPackageId(data);
                })
                .catch((err) => {
                    message.error(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [curPackage]);

    const classes = useStyles();
    return (
        <>
            <PageHeader
                title="New Package"
                subTitle="(Information)"
                icon={<PeopleOutlineTwoToneIcon fontSize="small" />}
            />
            <Paper className={classes.pageContent}>
                <PackageForm />
            </Paper>

            <Select
                value={curPackage}
                onSelect={(value) => setCurpackage(value)}
                placeholder="Select an option"
                loading={loadingPack}
                style={{marginleft:20, width: 300 }}

                onChange={() => {}}
            >
                {orders.map((item) => {
                    return <Option value={item.id}>{item.name}</Option>;
                })}
            </Select>
            {curPackage && (
                <List
                    style={{ marginTop: 20 }}
                    loading={loading}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={packageId}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                title={item.name}
                                extra={<AddToCartButton itemId={item.id} />}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    style={{ height: 340, width: "100%", display: "block" }}
                                />
                                {`Price: ${item.price}`}
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </>
    );
};

export default PackageList;