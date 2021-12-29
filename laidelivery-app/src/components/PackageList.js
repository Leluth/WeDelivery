import {Button, Card, List, message, PageHeader, Select, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {addItemToCart, getOrder, getPackage} from "../utils";
import {PlusOutlined} from "@ant-design/icons";
import PackageForm from "./PackageForm";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import {makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar} from '@material-ui/core';
import * as PackageService from '../services/packageService';
import * as packageService from '../services/packageService';
import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import ConfirmDialog from "../components/ConfirmDialog";


const { Option } = Select;
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))
const headCells = [
    {id: 'weight', label: 'Weight(lb)'},
    {id: 'size', label: 'Size'},
    {id: 'shippingFrom', label: 'Origin'},
    {id: 'shippingTo', label: 'Destination'},
    {id: 'deliveryType', label: 'Delivery Type'},
    {id: 'serviceType', label: 'Service Type'},
    {id: 'pickUpTime', label: 'Pick Up Time(hrs)'},
    {id: 'deliveryTime', label: 'Delivery Time(hrs)'},
    {id: 'price', label: 'Price'},
    {id: 'actions', label: 'Actions', disableSorting: true},
    {id: 'submit', label: 'Submit'},
]

const AddToCartButton = ({itemId}) => {
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
                icon={<PlusOutlined/>}
                onClick={AddToCart}
            />
        </Tooltip>
    );
};

const PackageList = () => {
    const [packageId, setPackageId] = useState([]);
    const [curPackage, setCurpackage] = useState();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingPack, setLoadingPack] = useState(false);

    const useStyles = makeStyles(theme => ({
        pageContent: {
            margin: theme.spacing(3),
            padding: theme.spacing(1)
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
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(PackageService.getAllPackage())
    const [filterFn, setFilterFn] = useState({
        fn: items => {
            return items;
        }
    })
    const [openPopup, setOpenPopup] = useState(false)
    const [setNotify] = useState({isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);


    const addOrEdit = (Package, resetForm) => {
        if (Package.id === 0)
            packageService.insertPackage(Package)
        else
            packageService.updatePackage(Package)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(packageService.getAllPackage())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    // edit
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    // delete
    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        packageService.deletePackage(id);
        setRecords(packageService.getAllPackage())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    return (
        <>
            <PageHeader
                title="Package List"
                subTitle="(Information)"
                icon={<PeopleOutlineTwoToneIcon fontSize="small"/>}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Button
                        text="Add New package"
                        variant="outlined"
                        startIcon={<AddIcon/>}
                        className={classes.newButton}
                        onClick={() => {
                            setOpenPopup(true);
                            setRecordForEdit(null);
                        }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.weight}</TableCell>
                                        <TableCell>{item.size}</TableCell>
                                        <TableCell>{item.shippingFrom}</TableCell>
                                        <TableCell>{item.shippingTo}</TableCell>
                                        <TableCell> {item.serviceType}</TableCell>
                                        <TableCell> {item.deliveryType}</TableCell>
                                        <TableCell> {item.pickUpTime}</TableCell>
                                        <TableCell> {item.deliveryTime}</TableCell>
                                        <TableCell> ${item.price}</TableCell>

                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => {
                                                    openInPopup(item)
                                                }}>
                                                <EditOutlinedIcon fontSize="small"/>
                                            </Controls.ActionButton>

                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => {
                                                            onDelete(item.id)
                                                        }
                                                    })
                                                }}>
                                                <CloseIcon fontSize="small"/>
                                            </Controls.ActionButton>
                                        </TableCell>

                                        <TableCell>
                                            <Controls.Button
                                                type="submit"
                                                text="Submit"/>
                                        </TableCell>
                                    </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>

            <Popup
                title="Package Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <PackageForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                    close={() => {
                        setOpenPopup(false)
                    }}/>
            </Popup>

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

            {curPackage && (
                <List
                    style={{marginTop: 10}}
                    loading={loading}
                    grid={{
                        gutter: 10,
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
                                extra={<AddToCartButton itemId={item.id}/>}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    style={{height: 300, width: "100%", display: "block"}}
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