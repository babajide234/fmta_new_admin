import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '../../components/Table/Table';
import { getHospital } from '../../store/reducers/users';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Grid, Chip } from '@mui/material';

const hospitals = () => {
    const { hospitals } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHospital());
        console.log('manufacturers');
    }, [dispatch]);

    useEffect(() => {
        console.log('manufacturers: ', hospitals);
    }, [hospitals]);

    const rows = hospitals.map((hospital) => {
        let row = {
            id: hospital.id,
            email: hospital.email,
            last_logged: hospital.last_logged,
            name: hospital.name,
            phone: hospital.phone,
            registered: hospital.registered,
            role: hospital.role,
            status: hospital.status,
            updated: hospital.updated,
            verified: hospital.verified,
            verification_code: hospital.verification_code,
            action: hospital.id
        };
        if (hospital.hospital) {
            Object.keys(hospital.hospital).map(() => {
                row['hospital_name'] = hospital['hospital']['hospital_name'];
                // console.log('venData: ', key + ': ' + venData['manufacturer']\[key]);
                // row['country'] = hospital['hospital']['country'];
                // row['city'] = hospital['hospital']['manufacturer_city'];
                // row['approved'] = hospital['hospital']['approved'];
            });
        } else {
            console.log('not an object');
        }
        return row;
    });

    console.log('rows: ', rows);

    const column = [
        {
            field: 'hospital_name',
            headerName: 'Hospital Name',
            width: 200,
            renderCell: (params) => {
                return <h3 className=" capitalize ">{params.row.hospital_name}</h3>;
            }
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            renderCell: (params) => {
                return <>{params.row.name}</>;
            }
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
            field: 'approved',
            headerName: 'Approved',
            width: 100,
            renderCell: (params) => {
                const approved = params.row.verified;
                return (
                    <>
                        {approved == 1 ? (
                            <Chip label="Approved" size="small" color="success" />
                        ) : (
                            <Chip label="Pending" size="small" color="warning" />
                        )}
                    </>
                );
            }
        },
        {
            field: 'verication_code',
            headerName: 'Verification Code',
            width: 150,
            renderCell: (params) => {
                const code = params.row.verification_code;
                return <>{code ? code : 'N/A'}</>;
            }
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

export default hospitals;
