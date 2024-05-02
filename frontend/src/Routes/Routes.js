import React from 'react'
import { useRoutes } from 'react-router-dom'
import HomePage from '../Pages/homePage';
import LoginPage from '../Pages/loginPage';
import SignupPage from '../Pages/signupPage';
import Dashboard from '../Pages/dashboard';
import DirectReport from '../Components/Dashboard/directReport';

export const routeMapping = {
    "التقرير المباشر": "/directReport",
    "المستخدمين": "/users",
    "العائلات": "/families",
    "المستفيدين": "/beneficiaries",
    "المستودع": "/stocks",
    "التوزيعات": "/distribution",
    "الإعدادات": "/settings",
};

export const AccessDenied = () => <div>You can't access this page</div>

const Routes = () => {
    const routes = useRoutes([
        // homePage
        { path: '/', element: <HomePage /> },

        // Signup Page
        { path: '/signup', element: <SignupPage /> },

        // Login Page
        { path: '/login', element: <LoginPage /> },

        // Nested routes for Dashboard
        { path: '/dashboard/:route', element: <Dashboard /> },

    ]);

    return routes;
};

export default Routes
