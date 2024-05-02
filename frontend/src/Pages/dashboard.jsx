import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/loading';
import NavigationsMenu from '../Components/Dashboard/navigationsMenu';
import DashboardItem from '../Components/Dashboard/dashboardItem';

import Menu01 from '@untitled-ui/icons-react/build/cjs/Menu01';
import XClose from '@untitled-ui/icons-react/build/cjs/XClose';
import Logo from '../Components/Logo/Logo';

function Dashboard() {
    const navigate = useNavigate();

    const userType = localStorage.getItem('userType');
    const bearerToken = localStorage.getItem('bearerToken');

    // State variables
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (!bearerToken) {
            navigate('/login');
        } else {
            setIsLoading(false);
        }
    }, [bearerToken, navigate]);

    // Function to toggle the navigation menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <div className='d-flex dashboard'>
                <div className="flex-fill d-none d-md-flex">
                    <div className='border-end'>
                        <NavigationsMenu userType={userType} />
                    </div>
                    <div className='dashboard flex-fill py-4 px-sm-4 px-xxl-5'>
                        <DashboardItem />
                    </div>
                </div>
            </div>
            <div>
                <div className="d-flex flex-column w-100 d-md-none">
                    <div className="header border-bottom d-flex justify-content-between w-100 py-0_75">
                        <div className="align-self-center">
                            {/* offcanvas on mobile view md and smaller */}
                            <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                                <Menu01 />
                            </button>
                            <div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                                <div class="offcanvas-body p-0">
                                    <NavigationsMenu userType={userType} toggleMenu={toggleMenu} />
                                </div>
                            </div>
                        </div>
                        <div className="m-auto">
                            <Logo />
                        </div>
                        <div style={{ width: '50px' }}></div>
                    </div>
                    <div className='dashboard container py-4'>
                        <DashboardItem />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
