import Table from '../../components/Table/Table';
import { useState, useEffect } from 'react';
import { getProducts, getProductById } from '../../store/reducers/product';
import { useSelector, useDispatch } from 'react-redux';
// import { GridRowsProp, GridColDef } from '@mui/x-data-grid';

// import { Link } from 'react-router-dom';

import { Typography, Drawer, Chip, MenuItem, Menu, IconButton, Modal, Button, Box } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ProductForm from './ProductForm';
const ViewProducts = () => {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    // const [openDrawer, setopenDrawer] = useState(false);
    // const [columns, setColumns] = useState([]);
    const { products, product } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const handleOpen = () => {
        setEdit(false);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleDelete = (id) => {
        console.log('delete: ', id);
    };
    const handleEdit = (id) => {
        console.log('edit: ', id);
        dispatch(getProductById(id));
        setEdit(true);
        setOpen(true);
    };
    const handleApprove = (id) => {
        console.log('Approve: ', id);
    };
    const handleDisapprove = (id) => {
        console.log('Disapprove: ', id);
    };
    const handleDetails = (id) => {
        console.log('Details: ', id);
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = () => {
        dispatch(getProducts());
    };
    useEffect(() => {
        products && console.log(products);
        const rowsData = [];
        products.map((product) => {
            rowsData.push({
                id: product.id,
                name: product.productName,
                price: product.productPrice,
                currency: product.productPriceCurr,
                moq: product.minimumOrderQuantity,
                discount: product.productDiscount,
                vendor: product.vendor,
                createdAt: product.dateCreated,
                status: product.product_approved,
                type: product.vendor_type,
                action: product.id
            });
        });
        console.log(rowsData);
        setRows(rowsData);
    }, [products]);

    useEffect(() => {
        product && console.log(product);
    }, [product]);

    // const options = ['Edit', 'Delete', 'Approve', 'Disapprove', 'View Details'];
    // const ITEM_HEIGHT = 48;

    const currencyFormatter = new Intl.NumberFormat('en-US');
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
            renderCell: (params) => (
                <Typography to="/" onClick={(e) => toggleDrawer(e, params.row.id)}>
                    {params.row.name}
                </Typography>
            )
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 80,
            valueGetter: (params) => `${params.row.currency === 'USD' ? '$' : '₦'} ${currencyFormatter.format(params.row.price)}`
        },
        { field: 'moq', headerName: 'M.O.Q', width: 50 },
        {
            field: 'discount',
            headerName: 'Discount',
            width: 70,
            renderCell: (params) => {
                return `${params.value}%`;
            }
        },
        { field: 'vendor', headerName: 'Vendor', width: 150 },
        { field: 'createdAt', headerName: 'Created At', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            renderCell: (params) => {
                return (
                    <Chip
                        size="small"
                        label={params.value === 1 ? 'Approved' : 'Pending'}
                        color={params.value === 1 ? 'success' : 'error'}
                    />
                );
            }
        },
        { field: 'type', headerName: 'Type', width: 70 },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 220,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const id = params.id;
                return (
                    <>
                        <IconButton aria-label="delete" onClick={() => handleEdit(id)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="edit" onClick={() => handleDelete(id)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                );
            }
        }
    ];

    const toggleDrawer = (e, id) => {
        e.preventDefault();
        console.log('toggleDrawer: ', id);
        setOpen(true);
        //
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '80%',
        overflow: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '5px'
    };
    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h1">
                    Products
                </Typography>
                <Box display="flex" alignItems="center">
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        Add Product
                    </Button>
                </Box>
            </Box>
            <Table rows={rows} columns={columns} />
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <ProductForm edit={edit} data={product} onClose={handleClose} reload={getAllProducts} />
                </Box>
            </Modal>
        </>
    );
};

export default ViewProducts;
