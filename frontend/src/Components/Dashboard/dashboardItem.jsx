import React from 'react';
import DirectReport from './directReport';
import { useParams } from 'react-router-dom';
import Users from './users';

const ComponentMapping = {
    "directReport": DirectReport,
    "users": Users,
    // "families": Families,
    // "beneficiaries": Beneficiaries,
    // "stocks": Stocks,
    // "distribution": Distribution,
    // "settings": Settings
};

function DashboardItem() {
    const params = useParams();
    const Component = ComponentMapping[params.route]; // Access the component based on the route parameter

    return (
        <div>
            {Component ? <Component /> : <div>Loading...</div>} {/* Render the component if it exists */}
        </div>
    );
}

export default DashboardItem;
