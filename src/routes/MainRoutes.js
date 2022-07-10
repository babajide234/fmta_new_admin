import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Blog = Loadable(lazy(() => import('pages/blog')));

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
        }
    ]
};

export default MainRoutes;
