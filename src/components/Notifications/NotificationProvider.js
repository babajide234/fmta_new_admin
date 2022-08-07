/* eslint-disable react/prop-types */
import React from 'react';
import { v4 } from 'uuid';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector, useDispatch } from 'react-redux';

import { openToast } from 'store/reducers/toast';
const NotificationProvider = (props) => {
    const { toastStatus } = useSelector((state) => state.toast);
    const dispatch = useDispatch();

    const notifications = [
        {
            id: v4(),
            type: 'success',
            message: 'Login Successfull',
            icon: <CheckIcon fontSize="inherit" />
        },
        {
            id: v4(),
            type: 'error',
            message: 'Login Error',
            icon: <CheckIcon fontSize="inherit" />
        }
    ];
    const [timeout, settimeout] = React.useState(toastStatus);

    React.useEffect(() => {
        console.log('status: ', timeout);

        setTimeout(() => {
            settimeout(!timeout);
            dispatch(openToast({ status: !timeout }));
        }, 3000);
    }, [dispatch, timeout]);
    console.log(notifications);
    return (
        <div>
            <Box
                sx={{
                    width: '200px',
                    display: timeout ? 'flex' : 'none',
                    flexDirection: 'column',
                    gap: '10px',
                    position: 'fixed',
                    top: '30px',
                    right: '30px',
                    zIndex: 1000
                }}
            >
                {notifications.map((note) => (
                    <Alert variant="filled" icon={note.icon} key={note.id} severity={note.type}>
                        {note.message}
                    </Alert>
                ))}
            </Box>
        </div>
    );
};

export default NotificationProvider;
