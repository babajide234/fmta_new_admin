/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Box, Button, List, ListItem, ListItemText, Grid, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BlogView({ id }) {
    const { singlePost, addStatus } = useSelector((state) => state.blogSlice);

    return (
        <Box sx={{ padding: 3, minHeight: '70vh' }}>
            <Grid container md={12} spacing={2}>
                <Grid item xs={12} md={4} lg={4}>
                    <Box sx={{ width: '100%', height: 8 }}>
                        <img src="https://placehold.co/600x400" style={{ width: '100%' }} alt="" />
                    </Box>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <Typography variant="h3">{singlePost?.title}</Typography>
                    <Typography variant="subtitle1">{singlePost?.subtitle}</Typography>
                    <Typography variantMapping="p">{singlePost?.body}</Typography>
                </Grid>
            </Grid>
            <Grid container md={12} lg={12} spacing={2} />
            <Grid container md={12} lg={12} spacing={2}>
                <Grid md={4} lg={4}>
                    <Button component={Link} to={`/dashboard/blog/edit/${id}`} variant="contained" size="medium">
                        Edit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

BlogView.propTypes = {
    id: PropTypes.string.isRequired
};
