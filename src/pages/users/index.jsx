import { useEffect, useState } from 'react';
import Table from './../../components/Table/Table';
import { IconButton, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from 'store/reducers/users';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Users = () => {
    const { users } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        dispatch(getUsers());
        console.log('Users');
    }, [dispatch]);

    useEffect(() => {
        console.log('Users: ', users);
        const rowsData = [];
        users.map((user) => {
            rowsData.push({
                id: user.id,
                email: user.email,
                last_logged: user.last_logged,
                name: user.name,
                phone: user.phone,
                registered: user.registered,
                role: user.role,
                status: user.status,
                updated: user.updated,
                verified: user.verified,
                action: user.id
            });
        });
        setRows(rowsData);
    }, [users]);

    const column = [
        {
            field: 'name',
            headerName: 'Name',
            width: 250
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 150
        },
        {
            field: 'registered',
            headerName: 'Registeration Date',
            width: 150
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
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

export default Users;
