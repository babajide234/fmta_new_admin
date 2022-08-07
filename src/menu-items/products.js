// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const products = {
    id: 'Products',
    title: 'Products',
    type: 'group',
    children: [
        {
            id: 'Products',
            title: 'Products',
            type: 'item',
            url: '/products',
            icon: icons.ProfileOutlined,
            breadcrumbs: true
        },
        {
            id: 'categories',
            title: 'Products Categories',
            type: 'item',
            url: '/categories',
            icon: icons.ProfileOutlined,
            breadcrumbs: true
        }
    ]
};

export default products;
