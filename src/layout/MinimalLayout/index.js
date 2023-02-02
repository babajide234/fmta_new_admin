import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { refresh } from '../../store/reducers/authSlice';
import ls from 'localstorage-slim';
import Breadcrumbs from '../../components/@extended/Breadcrumbs';
import navigation from '../../menu-items';
// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
    const dispatch = useDispatch();
    const { isLoggedin } = useSelector((state) => state.authSlice);
    let navigate = useNavigate();

    useEffect(() => {
        // console.log('is Logged In: ', isLoggedin);
        if (ls.get('token') !== null) {
            const data = ls.get('token').isloggedin;
            // console.log('user data: ', data);
            data && dispatch(refresh());
        }
        if (isLoggedin) {
            navigate('/dashboard/default');
        }
    }, [dispatch, isLoggedin, navigate]);

    return (
        <>
            <Breadcrumbs navigation={navigation} title={true} titleBottom={true} card={false} divider={false} />
            <Outlet />
        </>
    );
};

export default MinimalLayout;
