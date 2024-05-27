import React from 'react';
import DirectReport from './dashboardItems/directReport/directReport';
import { useParams } from 'react-router-dom';
import Users from './dashboardItems/users/users';
import Families from './dashboardItems/families/families';

const ComponentMapping = {
    "directReport": DirectReport,
    "users": Users,
    "families": Families,
    // "beneficiaries": Beneficiaries,
    // "stocks": Stocks,
    // "distribution": Distribution,
    // "settings": Settings
};

function DashboardItem() {
    const params = useParams();
    const Component = ComponentMapping[params.route]; // Access the component based on the route parameter

    return (
        <div className='my-4'>
            {Component ? <Component /> : <div>Loading...</div>} {/* Render the component if it exists */}
        </div>
    );
}

export default DashboardItem;
