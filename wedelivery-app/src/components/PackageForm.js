import React, {useEffect, useState} from 'react'
import {Grid,} from '@material-ui/core';
import Controls from "../components/controls/Controls";
import {Form, useForm} from '../components/useForm';
import * as packageService from "../services/packageService";
import {InboxOutlined, SmileOutlined, UsbOutlined} from '@ant-design/icons';
import {Button, Card, Descriptions, message, Radio, Space, Spin, Steps} from 'antd';
import {getDeliveryOptions} from "../utils";

const {Step} = Steps;
const {Meta} = Card;

const modeItems = [
    {id: 'pickup', title: 'Pickup'},
    {id: 'dropoff', title: 'Dropoff'},
]

const initialFValues = {
    id: 0,
    size: '',
    weight: 0,
    packageContent: '',
    mode: 'pickup',
    packageType: '',
    PickupDate: new Date('December 22, 2021 03:24:00'),
    isMember: false,
    shippingFrom: '', // The Marina at Pier 39
    shippingTo: '' // Marina Middle School
}

export default function PackageForm(props) {
    const {addOrEdit, recordForEdit, close} = props
    const [current, setCurrent] = useState(0);
    const [select, setSelect] = useState();
    const [options, setOptions] = useState([{}]);
    const [fetching, setFetching] = useState(true);
    const [saving, setSaving] = useState(true);
    const [order, setOrder] = useState({});

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('packageContent' in fieldValues)
            temp.packageContent = fieldValues.packageContent ? "" : "This field is required."
        if ('weight' in fieldValues)
            temp.weight = fieldValues.weight.length > 0 ? "" : "Minimum 2 numbers required."
        if ('size' in fieldValues)
            temp.size = fieldValues.size ? "" : "This field is required."
        if ('shippingFrom' in fieldValues)
            temp.shippingFrom = fieldValues.shippingFrom ? "" : "This field is required."
        if ('shippingTo' in fieldValues)
            temp.shippingTo = fieldValues.shippingTo ? "" : "This field is required."

        if ('packageType' in fieldValues)
            temp.packageType = fieldValues.packageType.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            setOrder(values)
            setCurrent(1);
            setFetching(true)
            getDeliveryOptions(values)
                .then((data) => {
                    setOptions(data)
                    setOptions(prevOptions => {
                        return prevOptions;
                    });
                })
                .catch((err) => {
                    message.error(err.message);
                    setCurrent(0);
                })
                .finally(() => {
                    setFetching(false)
                });
        }
    }

    const onSelectChange = e => {
        setSelect(e.target.value)
    };

    const onChoose = () => {
        setSaving(true)
        setCurrent(2)
        const newOrder = {...order, ...options[select]};
        setSaving(false)
        addOrEdit(newOrder, resetForm)
        close()
    }

    const onPre = () => {
        setCurrent(0)
        setSelect(null)
        setOptions([{}])
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const steps = [
        {
            title: 'Input package Info',
            content:
                <Form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={6}>

                            <Controls.Input
                                name="packageContent"
                                label="Package Content"
                                value={values.packageContent}
                                onChange={handleInputChange}
                                error={errors.packageContent}
                            />
                            <Controls.Input
                                label="Weight(lb)"
                                name="weight"
                                value={values.weight}
                                onChange={handleInputChange}
                                error={errors.weight}
                            />
                            <Controls.Input
                                name="size"
                                label="Size"
                                value={values.size}
                                onChange={handleInputChange}
                                error={errors.size}
                            />
                            <Controls.Input
                                label="Ship from "
                                name="shippingFrom"
                                value={values.shippingFrom}
                                onChange={handleInputChange}
                                error={errors.shippingFrom}
                            />
                            <Controls.Input
                                label="Ship to "
                                name="shippingTo"
                                value={values.shippingTo}
                                onChange={handleInputChange}
                                error={errors.shippingTo}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Controls.RadioGroup
                                name="mode"
                                label="Mode"
                                value={values.mode}
                                onChange={handleInputChange}
                                items={modeItems}
                            />
                            <Controls.Select
                                name="packageType"
                                label="Category"
                                value={values.packageType}
                                onChange={handleInputChange}
                                options={packageService.getCategoryCollection()}
                                error={errors.packageType}
                            />
                            <Controls.DatePicker
                                name="PickupDate"
                                label="Pickup Time"
                                value={values.PickupDate}
                                onChange={handleInputChange}
                            />
                            <Controls.Checkbox
                                name="isMember"
                                label="I am a member"
                                value={values.isMember}
                                onChange={handleInputChange}
                            />

                            <div>
                                <Controls.Button
                                    type="submit"
                                    text="Get delivery options"/>
                                <Controls.Button
                                    text="Reset"
                                    color="default"
                                    onClick={resetForm}/>
                            </div>
                        </Grid>
                    </Grid>
                </Form>,
            icon: <InboxOutlined/>,
        },
        {
            title: 'Select delivery option',
            content:
                <div>
                    <Space direction="vertical">
                        <Radio.Group onChange={onSelectChange} value={select}>
                            {options.map((item, index) => (
                                <Radio value={index} disabled={!item.enable}>
                                    <Card
                                        style={{width: 300, marginTop: 16}}
                                        loading={fetching}
                                        title={"Options " + index}
                                        extra={
                                            item.enable ?
                                                (
                                                    <h1>${item.price}</h1>
                                                ) : (<></>)
                                        }>
                                        {
                                            item.enable ?
                                                (
                                                    <Descriptions column={1} labelStyle={{fontWeight: 'bold'}}>
                                                        <Descriptions.Item
                                                            label="Delivery Type">{item.deliveryType}</Descriptions.Item>
                                                        <Descriptions.Item
                                                            label="Service Type">{item.serviceType}</Descriptions.Item>
                                                        <Descriptions.Item
                                                            label="PickUp Time">{item.pickUpTime}</Descriptions.Item>
                                                        <Descriptions.Item
                                                            label="Delivery Time">{item.deliveryTime}</Descriptions.Item>
                                                        <Descriptions.Item
                                                            label="Pick Up Center">{item.centerId}</Descriptions.Item>
                                                    </Descriptions>
                                                ) : (
                                                    <Descriptions column={1} labelStyle={{fontWeight: 'bold'}}>
                                                        <Descriptions.Item
                                                            label="Delivery Type">{item.deliveryType}</Descriptions.Item>
                                                        <Descriptions.Item
                                                            label="Service Type">{item.serviceType}</Descriptions.Item>
                                                        <Descriptions.Item
                                                            label="Error Message">{item.errorMessage}</Descriptions.Item>
                                                    </Descriptions>
                                                )
                                        }


                                    </Card>
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Space>
                    <div style={{textAlign: "center", marginTop: 20}}>
                        <Space size="middle">
                            <Button onClick={onPre}>
                                Prev
                            </Button>
                            <Button type="primary" disabled={select == null} onClick={onChoose}>
                                Done!
                            </Button>
                        </Space>
                    </div>
                </div>,
            icon: <UsbOutlined/>,
        },
        {
            title: 'Done',
            content:
                <Spin spinning={saving} size="large">
                    <div style={{width: 900, height: 400}}/>
                </Spin>,
            icon: <SmileOutlined/>
        }
    ];

    return (
        <>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} icon={item.icon}/>
                ))}
            </Steps>
            <div>{steps[current].content}</div>
        </>
    )
}