import React from 'react'
import { useRoutes } from 'react-router-dom'
import HomePage from '../Pages/homePage';
import LoginPage from '../Pages/loginPage';
import SignupPage from '../Pages/signupPage';


const Routes = () => {
    // const AccessDenied = () => <div>You can't access this page</div>
    const routes = useRoutes([
        // homePage
        { path: '/', element: <HomePage /> },

        // Signup Page
        { path: '/signup', element: <SignupPage /> },

        // Login Page
        { path: '/login', element: <LoginPage /> },
    ]);

    return routes;
};

export default Routes
