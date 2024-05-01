import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/loading';
import NavigationsMenu from '../Components/Dashboard/navigationsMenu';
import DashboardItem from '../Components/Dashboard/dashboardItem';

function Dashboard() {
    const navigate = useNavigate();

    const userType = localStorage.getItem('userType');

    const bearerToken = localStorage.getItem('bearerToken');

    // state variables
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        if (!bearerToken) {
            navigate('/login');
        }
        else {
            setIsLoading(false);
        }
    }, [bearerToken, navigate]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='d-flex'>
            <div className='border-end'>
                <NavigationsMenu userType={userType} />
            </div>
            <div className='dashboard'>
                <DashboardItem />
            </div>
        </div>
    )
}

export default Dashboard;
