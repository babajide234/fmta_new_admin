// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'Blog',
    title: 'Blog',
    type: 'group',
    children: [
        {
            id: 'blog',
            title: 'Blog',
            type: 'item',
            url: '/dashboard/blog',
            icon: icons.ProfileOutlined,
            breadcrumbs: false
        }
    ]
};

export default pages;
