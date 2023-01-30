/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Box, Button, List, ListItem, ListItemText, Grid, Typography, Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BlogView({ id }) {
    const { singlePost, addStatus } = useSelector((state) => state.blogSlice);

    return (
        <Box sx={{ padding: 3, minHeight: '70vh' }}>
            <Grid container md={12} spacing={2}>
                <Grid item xs={12} md={4}>
                    <img src="https://placehold.co/600x400" style={{ width: '100%' }} alt="" />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Stack
                        direction={'row'}
                        sx={{
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="h3">Title:</Typography>
                        <Typography variant="p">{singlePost?.title}</Typography>
                    </Stack>
                    <Typography variant="subtitle1">{singlePost?.subtitle}</Typography>
                    <Typography variantMapping="p">{singlePost?.body}</Typography>
                </Grid>
                <Grid item md={4} lg={4}>
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
