import React, { useEffect, useState } from "react";
import PackageForm from "./PackageForm";
import * as packageService from "../services/packageService";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StepContent from '@mui/material/StepContent';
import OrderCard from "./OrderCard";
import {Descriptions, Card} from "antd";

export default function OrderStepper() {
    const [activeStep, setActiveStep] = React.useState(0);

    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(packageService.getAllPackage())
    const [setNotify] = useState({ isOpen: false, message: '', type: '' })

    const addOrEdit = (Package, resetForm) => {
        if (Package.id === 0)
            packageService.insertPackage(Package)
        else
            packageService.updatePackage(Package)
        resetForm()
        setRecordForEdit(null)
        setRecords(packageService.getAllPackage())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const steps = [
        {
            label: 'Input package information',
            description:
                <Box sx={{ display: 'vertical-align' }}>
                    <div> Step {activeStep + 1}: Package Information Form</div>
                    <Card>
                        <PackageForm
                            recordForEdit={recordForEdit}
                            addOrEdit={addOrEdit} />
                    </Card>
                </Box>,
        },
        {
            label: 'Choose a delivery option',
            description:
                <Box sx={{ display: 'vertical-align' }}>
                    <div> Step {activeStep + 1}: Options Available</div>
                    <Card>
                        <div> TBC </div>
                    </Card>
                </Box>,
        },
        {
            label: 'Review order',
            description:
                <Box sx={{ display: 'vertical-align' }}>
                    <div> Step {activeStep + 1}: Order Details Review</div>
                    <div>
                        <Card>
                            <Descriptions column={1} labelStyle={{fontWeight: 'bold'}}>
                                <Descriptions.Item label="Package Content"> tmp </Descriptions.Item>
                                <Descriptions.Item label="Weight(lb)"> tmp </Descriptions.Item>
                                <Descriptions.Item label="Size"> tmp </Descriptions.Item>
                                <Descriptions.Item label="Shipping From"> tmp </Descriptions.Item>
                                <Descriptions.Item label="Shipping To"> tmp </Descriptions.Item>
                                <Descriptions.Item label="Mode"> tmp </Descriptions.Item>
                                <Descriptions.Item label="Category"> tmp </Descriptions.Item>
                                <Descriptions.Item label="Delivery Type"> tmp </Descriptions.Item>
                                <Descriptions.Item label="PickUp Time"> tmp </Descriptions.Item>
                                <Descriptions.Item label="Delivery Time"> tmp </Descriptions.Item>
                                <Descriptions.Item label="Price"> tmp </Descriptions.Item>
                            </Descriptions>
                        </Card>

                    </div>
                </Box>,
        },
    ];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    return (
                        <Step key={step.label} {...stepProps}>
                            <StepLabel {...labelProps}>{step.label} </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        <p> {steps[activeStep].description} </p>
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}