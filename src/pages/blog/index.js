
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import MainCard from '../../components/MainCard';
import BlogTable from './blogTable';
import BlogView from './blogView';
import AddBlog from './addBlog';
import { getBlogPosts, getSingleBlogPosts } from '../../store/reducers/blog';
import { useLocation, useParams, Link, useMatch } from 'react-router-dom';
import { blogSlice } from '../../store/reducers/blog';

const Blog = () => {
    const { id } = useParams();
    const { singlePost } = useSelector((state) => state.blogSlice);

    const dispatch = useDispatch();
    const AddPost = useMatch(`/dashboard/blog/add`);
    const EditPost = useMatch(`/blog/:id/edit`);

    const location = useLocation();

    const [view, setview] = useState(false);
    const [list, setlist] = useState(false);
    const [add, setadd] = useState(false);
    const [edit, setedit] = useState(false);

    useEffect(() => {
        dispatch(getBlogPosts());
        setlist(true);
        setview(false);
        setadd(false);
        setedit(false);
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            dispatch(getSingleBlogPosts(id));
            setview(true);
            setadd(false);
            setlist(false);
            setedit(false);
        } else {
            setlist(true);
            setview(false);
            setadd(false);
            setedit(false);
        }
        if (AddPost) {
            // console.log('making a new blog');
            setadd(true);
            setview(false);
            setlist(false);
            setedit(false);
        }
        if (location.pathname === EditPost?.pathname) {
            setadd(false);
            setview(false);
            setlist(false);
            setedit(true);
        }
    }, [id, AddPost, EditPost]);

    // useEffect(() => {
    //     console.log('post Id: ', id);
    //     if(id
    //     setview(true);
    // }, [id]);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: 2 }}>
                {/* <Typography variant="h5">Blog</Typography> */}
                <Button component={Link} to={'/dashboard/blog/add'} variant="contained" color="primary">
                    Add New Article
                </Button>
            </Grid>
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        {list && <Typography variant="h5">Recent Blog Posts</Typography>}
                        {view && <Typography variant="h5"></Typography>}
                        {add && <Typography variant="h5">Create New Post</Typography>}
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    {list && <BlogTable />}
                    {view && <BlogView id={id} />}
                    {add && <AddBlog />}
                    {edit && <AddBlog />}
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Blog;
