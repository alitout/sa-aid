import React from 'react'
import { useRoutes } from 'react-router-dom'
import HomePage from '../Pages/homePage';


const Routes = () => {
    const AccessDenied = () => <div>You can't access this page</div>
    const routes = useRoutes([
        // homePage
        { path: '/', element: <HomePage /> },
    ]);

    return routes;
};

export default Routes
