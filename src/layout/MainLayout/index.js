import { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from '../../menu-items';
import Breadcrumbs from '../../components/@extended/Breadcrumbs';

// types
import { openDrawer } from '../../store/reducers/menu';
// import { drawerOpen } from 'store/reducers/authSlice';
import { refresh } from '../../store/reducers/authSlice';
import ls from 'localstorage-slim';
// ==============================|| MAIN LAYOUT ||============================== //
const useAuth = () => {
    const { isLoggedin } = useSelector((state) => state.authSlice);
    const user = {
        isLoggedin
    };
    return user && user.isLoggedin;
};

const MainLayout = () => {
    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { drawerOpen } = useSelector((state) => state.menu);
    const { isLoggedin } = useSelector((state) => state.authSlice);

    // drawer toggler
    const [open, setOpen] = useState(drawerOpen);

    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer({ drawerOpen: !open }));
    };

    // set media wise responsive drawer
    useEffect(() => {
        setOpen(!matchDownLG);
        dispatch(openDrawer({ drawerOpen: !matchDownLG }));
    }, [matchDownLG]);

    useEffect(() => {
        if (open !== drawerOpen) setOpen(drawerOpen);
    }, [drawerOpen]);

    const isAuth = useAuth();

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header open={open} handleDrawerToggle={handleDrawerToggle} />
            <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar />
                <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
                {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message="Note archived" action={action} /> */}
                {isLoggedin ? <Outlet /> : <Navigate to="/login" />}
            </Box>
        </Box>
    );
};

export default MainLayout;
