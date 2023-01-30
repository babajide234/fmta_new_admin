// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const users = {
    id: 'users',
    title: 'users',
    type: 'group',
    children: [
        {
            id: 'buyer',
            title: 'Buyers',
            type: 'item',
            url: '/users/buyers',
            icon: icons.ProfileOutlined,
            breadcrumbs: true
        },
        {
            id: 'vendors',
            title: 'Vendors',
            type: 'item',
            url: '/users/vendors',
            icon: icons.ProfileOutlined,
            breadcrumbs: true
        },
        {
            id: 'manufacturers',
            title: 'Manufacturers',
            type: 'item',
            url: '/users/manufacturers',
            icon: icons.ProfileOutlined,
            breadcrumbs: true
        },
        {
            id: 'hospitals',
            title: 'Hospitals',
            type: 'item',
            url: '/users/hospitals',
            icon: icons.ProfileOutlined,
            breadcrumbs: true
        }
    ]
};

export default users;
