/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useSelector } from 'react-redux';
import { Box, Button, List, ListItem, ListItemText, Grid, Typography, Container } from '@mui/material';

export default function BlogView() {
    const { singlePost, addStatus } = useSelector((state) => state.blogSlice);

    return (
        <Box  sx={{ padding: 2 , height:'70vh' }}>
            <Grid item md={12} spacing={2}>
                <Grid item xs={12} md={4} lg={4}>
                    <Box sx={{ width: '100%', height: 8 }}>
                        <img src="https://placehold.co/600x400" style={{ width:'100%' }} alt="" />
                    </Box>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <Typography variant="h3">{singlePost?.title}</Typography>
                    <Typography variant="subtitle1">{singlePost?.subtitle}</Typography>
                    <Typography variantMapping="p">
                        { singlePost?.body}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item md={12} spacing={2}>
                <Grid md={4}>
                    <Button variant="contained" size="medium">
                        Medium
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
