import React from 'react';
import { TextField, Grid, Button } from '@mui/material';
import { Formik } from 'formik';
const AddCatForm = () => {
    const intialValues = {
        cat_name: '',
        cat_description: '',
        cat_image: ''
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
                                <TextField fullWidth id="name" label="Category Name" value={values.cat_name} variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    label="Category Description"
                                    value={values.cat_description}
                                    variant="outlined"
                                    multiline
                                    minRows={3}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type={'file'}
                                    id="image"
                                    // label="Category Image"
                                    value={values.cat_image}
                                    variant="outlined"
                                />
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

export default AddCatForm;
