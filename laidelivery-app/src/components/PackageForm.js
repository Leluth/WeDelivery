import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';
import * as packageService from "../services/packageService";


const modeItems= [
    { id: 'pickup', title: 'Pickup' },
    { id: 'dropoff', title: 'Dropoff' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    size: '',
    weight: '',
    content: '',
    mode: 'pickup',
    categoryId:'',
    PickupDate: new Date('December 22, 2021 03:24:00'),
    isMember: false,
}

export default function PackageForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('content' in fieldValues)
            temp.content = fieldValues.content ? "" : "This field is required."
        if ('weight' in fieldValues)
            temp.weight = fieldValues.weight.length > 0 ? "" : "Minimum 2 numbers required."
        if ('size' in fieldValues)
            temp.size = fieldValues.size ? "" : "This field is required."
        if ('shipFrom' in fieldValues)
            temp.shipFrom = fieldValues.shipFrom ? "" : "This field is required."
        if ('shipTo' in fieldValues)
            temp.shipTo = fieldValues.shipTo ? "" : "This field is required."

        if ('categoryId' in fieldValues)
            temp.categoryId = fieldValues.categoryId.length !== 0 ? "" : "This field is required."
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
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>

                    <Controls.Input
                        name="content"
                        label="Package Content"
                        value={values.content}
                        onChange={handleInputChange}
                        error={errors.content}
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
                        name="shipFrom"
                        value={values.shipFrom}
                        onChange={handleInputChange}
                        error={errors.shipFrom}
                    />
                    <Controls.Input
                        label="Ship to "
                        name="shipTo"
                        value={values.shipTo}
                        onChange={handleInputChange}
                        error={errors.shipTo}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="Mode"
                        label="Mode"
                        value={values.mode}
                        onChange={handleInputChange}
                        items={modeItems}
                    />
                    <Controls.Select
                        name="categoryId"
                        label="Category"
                        value={values.categoryId}
                        onChange={handleInputChange}
                        options={packageService.getCategoryCollection()}
                        error={errors.categoryId}
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
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}