/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import BlogTable from './blogTable';
import { getBlogPosts, getSingleBlogPosts } from 'store/reducers/blog';
import BlogView from './blogView';

const Blog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    const [view, setview] = useState(false);
    const [list, setlist] = useState(false);
    const [edit, setedit] = useState(false);

    useEffect(() => {
        dispatch(getBlogPosts());
        setlist(true);
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            dispatch(getSingleBlogPosts(id));
            setview(true);
            setlist(false);
        }
    }, [id]);

    // useEffect(() => {
    //     console.log('post Id: ', id);
    //     if(id
    //     setview(true);
    // }, [id]);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Blog</Typography>
            </Grid>
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        {list && <Typography variant="h5">Recent Blog Posts</Typography>}
                        {view && <Typography variant="h5"></Typography>}
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    {list && <BlogTable />}
                    {view && <BlogView />}
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Blog;
