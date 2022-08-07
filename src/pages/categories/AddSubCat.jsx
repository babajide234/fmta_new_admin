import React from 'react';
import { TextField, Grid, Button } from '@mui/material';
import { Formik } from 'formik';
const AddSubCat = () => {
    const intialValues = {
        subcat: '',
        cat_id: ''
    };
    const handleSubmit = (values) => {
        console.log('values: ', values);
    };

    return (
        <>
            <Formik initialValues={intialValues} onSubmit={handleSubmit}>
                {({ handleSubmit, handleChange, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField fullWidth id="name" label="SubCategory Name" value={values.subcat} variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained">Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AddSubCat;
