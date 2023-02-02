import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import { Typography, IconButton, Chip, Box, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getVendors } from '../../store/reducers/users';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Vendors = () => {
    const { vendors } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    // const [rows, setRows] = useState([]);

    useEffect(() => {
        dispatch(getVendors());
        console.log('vendors');
    }, [dispatch]);

    useEffect(() => {
        console.log('vendors: ', vendors);
    }, [vendors]);

    const rows = vendors.map((vendor) => {
        let row = {
            id: vendor.id,
            email: vendor.email,
            last_logged: vendor.last_logged,
            name: vendor.name,
            phone: vendor.phone,
            registered: vendor.registered,
            role: vendor.role,
            status: vendor.status,
            updated: vendor.updated,
            verified: vendor.verified,
            action: vendor.id
        };
        if (vendor.vendor) {
            Object.keys(vendor.vendor).map((key, i) => {
                // console.log('venData: ', key + ': ' + venData['vendor'][key]);
                row['storeName'] = vendor['vendor']['storeName'];
                row['country'] = vendor['vendor']['country'];
                row['city'] = vendor['vendor']['vendors_city'];
            });
        } else {
            console.log('not an object');
        }
        return row;
    });
    console.log('rows: ', rows);
    const column = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200
        },
        {
            field: 'storeName',
            headerName: 'Store Name',
            width: 200
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 220
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 130
        },
        {
            field: 'country',
            headerName: 'Country',
            width: 80
        },
        {
            field: 'city',
            headerName: 'City',
            width: 100
        },
        {
            field: 'registered',
            headerName: 'Registeration Date',
            width: 150
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
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
    const handleEdit = (id) => {
        console.log('Edit: ', id);
    };
    const handleDelete = (id) => {
        console.log('Delete: ', id);
    };
    return (
        <>
            <Grid container spacing={3}>
                <Grid
                    container
                    item
                    xs={11}
                    sx={{
                        background: '#fff',
                        borderRadius: '10px',
                        padding: '20px',
                        margin: '20px auto',
                        border: '1px solid #ccc'
                    }}
                >
                    <Table rows={rows} columns={column} />
                </Grid>
            </Grid>
        </>
    );
};

export default Vendors;
