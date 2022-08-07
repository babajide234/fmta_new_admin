/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import {
    Grid,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    FormControlLabel,
    InputAdornment,
    Autocomplete
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// import SaveIcon from '@mui/icons-material/Save';
import { Formik } from 'formik';
import SunEditor from 'suneditor-react';
import { axiosPrivate } from 'utils/request';

const ProductForm = (props) => {
    const [editvalues, setEditValues] = useState([]);
    const [curr, setcurr] = useState('$');
    const [loading, setLoading] = useState(false);
    const [hscode, setHscode] = useState('');
    useEffect(() => {
        getGet();
    }, []);

    useEffect(() => {
        let arr = [];
        if (props.edit) {
            for (let data in props.data) {
                if (typeof data === 'object') {
                    for (let item in data) {
                        arr.push(item);
                    }
                } else {
                    arr.push(data);
                }
            }
            setEditValues(arr);
            console.log(`data from product: `, arr);
        }
    }, [props.data, props.edit]);

    const value = ['Units', 'Packs', 'Pieces', 'Cartons', 'Containers'];
    // const moqValue = edit ? value.map((value) => value == data.quantitySize && value) : 'Units';

    const initialValues = {
        name: props.edit ? props.data.productName : '',
        quantity: props.edit ? props.data.minimumOrderQuantity : '',
        quantityValue: props.data.quantitySize,
        price: props.edit ? props.data.productPrice : '',
        currency: props.edit ? props.data.productName : '',
        description: props.edit ? props.data.details?.productDescription : '',
        discount: props.edit ? props.data.productDiscount : '',
        inStock: props.edit ? props.data.quantityInStock : '',
        inStockValue: props.edit ? props.data.quantitySize : '',
        category: props.edit ? props.data.details?.productCategory : '',
        subCategory: props.edit ? props.data.details?.productSubCategory : '',
        model: props.edit ? props.data.details?.productModelNumber : '',
        brand: props.edit ? props.data.productBrand : '',
        color: props.edit ? props.data.details?.productColor : '',
        weight: props.edit ? props.data.details?.productWeight.split(' ')[0] : '',
        sizeVariations: props.edit ? props.data.details?.productSize : '',
        isAdult: '',
        countryOfOrigin: props.edit ? props.data.details?.productionCountry : '',
        manufacturedDate: props.edit ? props.data.details?.productManufacture : '',
        expiryDate: props.edit ? props.data.details?.productExpiry : '',
        inTheBox: props.edit ? props.data.details?.intheBox : '',
        lenght: props.edit ? props.data.details?.productDimension.split('x')[0] : '',
        width: props.edit ? props.data.details?.productDimension.split('x')[1] : '',
        height: props.edit ? props.data.details?.productDimension.split('x')[2] : '',
        shippedFromAbroad: props.edit ? props.data.details?.productShipped : '',
        country: props.edit ? props.data.details?.productShippedCountry : '',
        city: props.edit ? props.data.details?.productShippedCity : '',
        address: props.edit ? props.data.details?.productShippedAddress : '',
        postalCode: props.edit ? props.data.details?.productShippedPostal : '',
        hscCode: props.edit ? props.data.details?.productShippedHSC : ''
    };
    const handleSubmit = (values) => {
        console.log('values: ', values);
    };
    const handleCurr = (event) => {
        if (curr === '$') {
            setcurr('₦');
        } else {
            setcurr('$');
        }
    };
    const getGet = async () => {
        const res = await axiosPrivate.get('/hsc');
        const arr = [];
        arr.push(
            res.data.map((item) => ({
                label: item.Description,
                value: item.TSN
            }))
        );
        // res.data.map((item) => {
        //     data.push({
        //         id: item.id,
        //         label: item.Description,
        //         tsn: item.TSN
        //     });
        //     return arr;
        // });
        setHscode(arr);
        console.log(arr);
        console.log(res.data);
    };
    const editor = useRef();
    const editor2 = useRef();

    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };
    const getSunEditorInstance2 = (sunEditor) => {
        editor2.current = sunEditor;
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting }) => {
                    setLoading(true);
                    setSubmitting(true);
                    console.log(values);
                    setSubmitting(false);
                    setLoading(false);
                }}
            >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid container item spacing={4} md={12}>
                                <Grid item xs={12}>
                                    <Typography variant="h4">Name, price and quantity</Typography>
                                </Grid>
                                <Grid container item spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            label="Product Name"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                name="moq"
                                                value={values.quantity}
                                                label="Minimum Order Quantity"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Value</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="quantityValue"
                                                    value={values.quantityValue}
                                                >
                                                    {value.map((item) => (
                                                        <MenuItem key={item} value={item}>
                                                            {item}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                name="price"
                                                value={values.price}
                                                label="Product Price"
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">{curr}</InputAdornment>
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            {/* <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="currency"
                                                    value={values.currency}
                                                    // label="Age"
                                                    // onChange={handleChange}
                                                >
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl> */}
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={values.currency === 'NGN' ? true : false}
                                                        onChange={() => {
                                                            if (values.currency === 'USD') {
                                                                values.currency = 'NGN';
                                                                setcurr('₦');
                                                            } else {
                                                                values.currency = 'USD';
                                                                setcurr('$');
                                                            }
                                                        }}
                                                    />
                                                }
                                                label={curr === '₦' ? 'Nigerian Naira' : 'American Dollar'}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth name="discount" value={values.discount} label="Discount" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container item spacing={4} md={12}>
                                <Grid item xs={12}>
                                    <Typography variant="h4">Description</Typography>
                                </Grid>
                                <Grid container item spacing={2}>
                                    <Grid item xs={12}>
                                        {/* <TextField
                                            fullWidth
                                            multiline
                                            minRows={8}
                                            name="description"
                                            value={values.description}
                                            label="Product Description"
                                            variant="outlined"
                                        /> */}
                                        <SunEditor
                                            getSunEditorInstance={getSunEditorInstance}
                                            height="40vh"
                                            placeholder="Please type here..."
                                            defaultValue={values.description}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container item spacing={4} md={12}>
                                <Grid item xs={12}>
                                    <Typography variant="h4">Specification</Typography>
                                </Grid>
                                <Grid container item spacing={2}>
                                    <Grid container item spacing={2}>
                                        <Grid item xs={8}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                name="inStock"
                                                value={values.inStock}
                                                label="Quantity In Stock"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Value</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="inStockValue"
                                                    value={values.inStockValue}
                                                    // label="Age"
                                                    // onChange={handleChange}
                                                >
                                                    {value.map((item) => (
                                                        <MenuItem key={item} value={item}>
                                                            {item}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                name="lenght"
                                                value={values.lenght}
                                                label="Lenght"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                name="width"
                                                value={values.width}
                                                label="Width"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                name="height"
                                                value={values.height}
                                                label="Height"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Is this product for an adult or a child?</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Is this product for an adult or a child?"
                                                name="isAdult"
                                                value={values.isAdult}
                                                // value={age}
                                                // label="Age"
                                                // onChange={handleChange}
                                            >
                                                <MenuItem value={``}>Default</MenuItem>
                                                <MenuItem value={`Yes`}>Yes</MenuItem>
                                                <MenuItem value={`NO`}>No</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="sizeVariations"
                                            value={values.sizeVariations}
                                            label="Product size (Enter sizes seperated by comma(,))"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                name="weight"
                                                value={values.weight}
                                                label="Product Weight"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                name="color"
                                                value={values.color}
                                                label="Product Color"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                name="model"
                                                value={values.model}
                                                label="Model/Batch Number"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                name="category"
                                                value={values.category}
                                                label="Product Category"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                name="subCategory"
                                                value={values.subCategory}
                                                label="Product Sub-Category"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                name="videoLink"
                                                value={values.videoLink}
                                                label="Video Link"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField fullWidth name="brand" value={values.brand} label="Brand" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                name="countryOfOrigin"
                                                value={values.countryOfOrigin}
                                                label="Made In"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                name="manufacturedDate"
                                                value={values.manufacturedDate}
                                                label="Manufactured Date"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                name="expiryDate"
                                                value={values.expiryDate}
                                                label="Expiry Date"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* <TextField
                                            fullWidth
                                            multiline
                                            name="inTheBox"
                                            value={values.inTheBox}
                                            minRows={4}
                                            label="Whats In The Box?"
                                            variant="outlined"
                                        /> */}
                                        <SunEditor
                                            getSunEditorInstance={getSunEditorInstance2}
                                            height="40vh"
                                            placeholder="Please type here..."
                                            defaultValue={values.inTheBox}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container item spacing={4} md={12}>
                                <Grid item xs={12}>
                                    <Typography variant="h4">Shipping Information</Typography>
                                </Grid>
                                <Grid container item spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Shipped From Abroad?</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Shipped From Abroad?"
                                                name="shippedFromAbroad"
                                                value={values.shippedFromAbroad}
                                                // value={age}
                                                // label="Age"
                                                // onChange={handleChange}
                                                placeholder="Shipped From Abroad?"
                                            >
                                                <MenuItem value={`Yes`}>Yes</MenuItem>
                                                <MenuItem value={`No`}>No</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item xs={4}>
                                            <TextField fullWidth name="country" value={values.country} label="Country" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField fullWidth name="city" value={values.city} label="City" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                name="postalCode"
                                                value={values.postalCode}
                                                label="Postal Code"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={4}
                                            name="address"
                                            value={values.address}
                                            label="Address"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            id="hscCode"
                                            disablePortal
                                            name="hscCode"
                                            options={hscode}
                                            // value={values.hscCode}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} fullWidth label="Customs HSC Code" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LoadingButton loading={loading} type="Submit" variant="outlined" size="large">
                                            Submit
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default ProductForm;
