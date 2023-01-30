import { useEffect, useState } from 'react';
import Table from './../../components/Table/Table';
import { IconButton, Box, Grid, Modal } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getCat, getSubCat } from 'store/reducers/users';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AddCatForm from './AddCatForm';
import AddSubCat from './AddSubCat';
const Categories = () => {
    const { cat, subCat } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    useEffect(() => {
        dispatch(getCat());
    }, [dispatch]);

    useEffect(() => {
        console.log('Categories: ', cat);
    }, [cat]);
    useEffect(() => {
        console.log('Sub Categories: ', subCat);
    }, [subCat]);

    const getSubCategories = (id) => {
        dispatch(getSubCat(id));
        console.log('SubCategories: ', id);
    };

    const rows = cat?.map((category) => {
        return {
            id: category.id,
            name: category.cat_name,
            subat: category.id,
            action: category.id
        };
    });
    const column = [
        {
            field: 'name',
            headerName: 'Name',
            width: 220
        },
        {
            field: 'subat',
            headerName: 'Sub Category',
            width: 100,
            renderCell: (params) => {
                return (
                    <IconButton aria-label="delete" onClick={() => getSubCategories(params.id)}>
                        <MoreVertIcon />
                    </IconButton>
                );
            }
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

    const row2 = subCat.map((subCategory) => {
        return {
            id: subCategory.id,
            name: subCategory.subCategories,
            action: subCategory.id
        };
    });
    // const row2 = [
    //     {
    //         id: 1,
    //         name: 'snfdjnk',
    //         action: 2
    //     }
    // ];

    const column2 = [
        {
            field: 'name',
            headerName: 'Name',
            width: 250
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
    const handleOpen = () => setOpen(true);
    const handleOpen2 = () => setOpen2(true);

    const handleEdit = (id) => {
        console.log('edit: ', id);
    };
    const handleDelete = (id) => {
        console.log('delete: ', id);
    };
    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '80%',
        overflow: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '5px'
    };
    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <AddCatForm />
                </Box>
            </Modal>
            <Modal open={open2} onClose={handleClose2} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <AddSubCat />
                </Box>
            </Modal>
            <Box
                sx={{
                    display: 'flex',
                    margin: '0 auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    width: '95%'
                }}
            >
                <Grid container spacing={3}>
                    <Grid container item xs={6}>
                        <Grid
                            item
                            container
                            xs={12}
                            sx={{
                                background: '#fff',
                                borderRadius: '10px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <Grid item xs={12} justifyContent="flex-end" display="flex" mb={3}>
                                <IconButton aria-label="add new category" onClick={handleOpen}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Table rows={rows} columns={column} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={6}>
                        <Grid
                            item
                            container
                            xs={12}
                            sx={{
                                background: '#fff',
                                borderRadius: '10px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <Grid item xs={12} justifyContent="flex-end" display="flex" mb={3}>
                                <IconButton aria-label="add new category" onClick={handleOpen2}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Table rows={row2} columns={column2} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Categories;
