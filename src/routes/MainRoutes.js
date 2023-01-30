import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Blog = Loadable(lazy(() => import('pages/blog')));
const Products = Loadable(lazy(() => import('pages/products')));
const Categories = Loadable(lazy(() => import('pages/categories')));
const Users = Loadable(lazy(() => import('pages/users')));
const Vendors = Loadable(lazy(() => import('pages/users/Vendors')));
const Manufactures = Loadable(lazy(() => import('pages/users/Manufactures')));
const Hospitals = Loadable(lazy(() => import('pages/users/hospitals')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'blog',
                    element: <Blog />
                },
                {
                    path: 'blog/add',
                    element: <Blog />
                },
                {
                    path: 'blog/:id',
                    element: <Blog />
                },
                {
                    path: 'blog/edit/:id',
                    element: <Blog />
                }
            ]
        },
        {
            path: 'products',
            children: [
                {
                    path: '/products',
                    element: <Products />
                },
                {
                    path: 'products/add',
                    element: <Products />
                },
                {
                    path: 'products/:id',
                    element: <Products />
                },
                {
                    path: 'products/edit/:id',
                    element: <Products />
                }
            ]
        },
        {
            path: 'users',
            children: [
                {
                    path: '/users/buyers',
                    element: <Users />
                },
                {
                    path: '/users/vendors',
                    element: <Vendors />
                },
                {
                    path: '/users/manufacturers',
                    element: <Manufactures />
                },
                {
                    path: '/users/hospitals',
                    element: <Hospitals />
                }
            ]
        },
        {
            path: 'categories',
            children: [
                {
                    path: '/categories',
                    element: <Categories />
                }
            ]
        }
    ]
};

export default MainRoutes;
