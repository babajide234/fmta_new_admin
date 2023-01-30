import React, { useEffect, useState } from 'react';
import Table from './../../components/Table/Table';
import { IconButton, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getManufacturers } from 'store/reducers/users';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Manufactures = () => {
    const { manufacturers } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getManufacturers());
        console.log('manufacturers');
    }, [dispatch]);

    useEffect(() => {
        console.log('manufacturers: ', manufacturers);
    }, [manufacturers]);

    const rows = manufacturers.map((manufacturer) => {
        let row = {
            id: manufacturer.id,
            email: manufacturer.email,
            last_logged: manufacturer.last_logged,
            name: manufacturer.name,
            phone: manufacturer.phone,
            registered: manufacturer.registered,
            role: manufacturer.role,
            status: manufacturer.status,
            updated: manufacturer.updated,
            verified: manufacturer.verified,
            action: manufacturer.id
        };
        if (manufacturer.manufacturers) {
            Object.keys(manufacturer.manufacturers).map((key, i) => {
                // console.log('venData: ', key + ': ' + venData['manufacturer'][key]);
                row['manufacturer'] = manufacturer['manufacturers']['manufacturer'];
                row['country'] = manufacturer['manufacturers']['country'];
                row['city'] = manufacturer['manufacturers']['manufacturer_city'];
                row['approved'] = manufacturer['manufacturers']['approved'];
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
            field: 'manufacturer',
            headerName: 'Manufacturer',
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
            field: 'approved',
            headerName: 'Approved',
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

export default Manufactures;
