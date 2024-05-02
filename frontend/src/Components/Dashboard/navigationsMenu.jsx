import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import axios from 'axios';
import { ORG_GETSELF, USER_GETSELF } from '../../externalApi/ExternalUrls';
import permissions from '../../permissions/permissions.json'
import { routeMapping } from '../../Routes/Routes';

// untitled ui icons
import ChevronDown from '@untitled-ui/icons-react/build/cjs/ChevronDown';
import ChevronLeft from '@untitled-ui/icons-react/build/cjs/ChevronLeft';
import FileAttachment02 from '@untitled-ui/icons-react/build/cjs/FileAttachment02';
import User01 from '@untitled-ui/icons-react/build/cjs/User01';
import Users01 from '@untitled-ui/icons-react/build/cjs/Users01';
import ActivityHeart from '@untitled-ui/icons-react/build/cjs/ActivityHeart';
import Building08 from '@untitled-ui/icons-react/build/cjs/Building08';
import CoinsHand from '@untitled-ui/icons-react/build/cjs/CoinsHand';
import Settings01 from '@untitled-ui/icons-react/build/cjs/Settings01';
import LogOut01 from '@untitled-ui/icons-react/build/cjs/LogOut01';
import XClose from '@untitled-ui/icons-react/build/cjs/XClose';


const pageCodeIcons = {
    "التقرير المباشر": FileAttachment02,
    "المستخدمين": User01,
    "العائلات": Users01,
    "المستفيدين": ActivityHeart,
    "المستودع": Building08,
    "التوزيعات": CoinsHand
}

function NavigationsMenu({ userType, toggleMenu }) {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    const bearerToken = localStorage.getItem('bearerToken');
    const auth = `Bearer ${bearerToken}`;

    // state variables
    const [isUserTypeOrganization, setIsUserTypeOrganization] = useState(false);
    const [isUserTypeUser, setIsUserTypeUser] = useState(false);
    const [name, setName] = useState('');
    const [userRole, setUserRole] = useState('');

    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [route, setRoute] = useState('');
    const [activeSubValue, setActiveSubValue] = useState(''); // Add a state for active subValue

    const handleCategoryClick = () => setIsCategoryOpen(!isCategoryOpen);

    const handleSubValueClick = (subValue) => {
        setActiveSubValue(subValue);
        const route = routeMapping[subValue];
        setRoute(route);
        if (route) {
            navigate(`/dashboard${route}`);
        }
        if (subValue === 'تسجيل الخروج') {
            localStorage.clear();
            navigate('/login');
        }
    };

    useEffect(() => {
        const currentRoute = location.pathname.replace('/dashboard', '');
        const activeSubValue = Object.keys(routeMapping).find(key => routeMapping[key] === currentRoute);
        setActiveSubValue(activeSubValue);
        if (userType === 'Organization') {
            setIsUserTypeOrganization(true);
        } else if (userType === 'User') {
            setIsUserTypeUser(true);
        }
        const fetchDetails = async () => {
            try {
                let response;
                if (userType === 'Organization') {
                    response = await axios.get(ORG_GETSELF, {
                        headers: {
                            'Authorization': auth
                        }
                    });
                    setName(response.data.OrganizationName);
                } else if (userType === 'User') {
                    response = await axios.get(USER_GETSELF, {
                        headers: {
                            'Authorization': auth
                        }
                    });
                    setName(response.data.UserFName + ' ' + response.data.UserLName);
                    setUserRole(response.data.UserRole);
                }
            } catch (error) {
                console.error(`Failed to fetch ${userType} details:`, error);
            }
        };

        fetchDetails();
    }, [auth, userType, location]);

    const generateMenuItems = () => {
        if (userType === 'User') {
            return generateMenuItemsByRole(userRole);
        }
        const menuStructure = permissions.Type;
        return menuStructure[userType];
    };

    const generateMenuItemsByRole = (userRole) => {
        const menuStructure = permissions.Type.User.role;
        return menuStructure[userRole];
    }

    return (
        <div className='d-flex flex-column align-items-stretch border-start fixed bg-white' style={{ maxWidth: '18rem', height: '100vh' }}>
            {name &&
                <div className="">
                    <div className='d-flex justify-content-start align-items-center fs-3 fw-700 text-white text-center p-3 py-4 bg-green-500 '>
                        <div className='uiIcon ps-2 text-reset d-flex d-md-none' data-bs-dismiss="offcanvas" onClick={toggleMenu}>{React.createElement(XClose, { width: '1.5rem', height: '1.5rem' })}</div>
                        <div>
                            {name}
                        </div>
                    </div>
                    <div className="bg-brown-200" style={{ height: '0.75rem' }}></div>
                </div>
            }
            <div className='d-flex flex-column flex-fill justify-content-between'>
                {isUserTypeOrganization && generateMenuItems() && Object.entries(generateMenuItems()).map(([key, value]) => (
                    <div className='py-2 px-3' key={key}>
                        <div
                            className='text-black pb-2 fs-5 fw-700 d-flex justify-content-between align-items-center'
                            style={{ cursor: 'pointer' }}
                            onClick={handleCategoryClick}
                        >
                            {key}
                            {isCategoryOpen ? <ChevronDown width="1.5rem" height="1.5rem" className='uiIcon' /> : <ChevronLeft width="1.5rem" height="1.5rem" className='uiIcon' />}
                        </div>
                        {isCategoryOpen && Object.entries(value).map(([subKey, subValue]) => (
                            <div
                                className={`fs-5 fw-500 d-flex justify-content-start align-items-center py-1 px-2 ${activeSubValue === subValue ? 'activePage' : ''}`} // Add 'bg-green-500' class if the current subValue is active
                                style={{ cursor: 'pointer' }}
                                key={subKey}
                                onClick={() => handleSubValueClick(subValue)} // Add onClick handler to subValue
                            >
                                {pageCodeIcons[subValue] && <div className='uiIcon ps-2 d-flex'>{React.createElement(pageCodeIcons[subValue], { width: '1.5rem', height: '1.5rem' })}</div>}
                                {subValue}
                            </div>
                        ))}
                    </div>
                ))}
                {isUserTypeUser && userRole && generateMenuItems() && Object.entries(generateMenuItems()).map(([key, value]) => (
                    <div className='py-2 px-3' key={key}>
                        <div
                            className='text-black pb-2 fs-5 fw-700 d-flex justify-content-between align-items-center'
                            style={{ cursor: 'pointer' }}
                            onClick={handleCategoryClick}
                        >
                            {key}
                            {isCategoryOpen ? <ChevronDown width="1.5rem" height="1.5rem" className='uiIcon' /> : <ChevronLeft width="1.5rem" height="1.5rem" className='uiIcon' />}
                        </div>
                        {isCategoryOpen && Object.entries(value).map(([subKey, subValue]) => (
                            <div
                                className={`fs-5 fw-400 d-flex justify-content-start align-items-center py-1 px-2 ${activeSubValue === subValue ? 'activePage' : ''}`} // Add 'bg-green-500' class if the current subValue is active
                                style={{ cursor: 'pointer' }}
                                key={subKey}
                                onClick={() => handleSubValueClick(subValue)} // Add onClick handler to subValue
                            >
                                {pageCodeIcons[subValue] && <div className='uiIcon ps-2'>{React.createElement(pageCodeIcons[subValue], { width: '1.5rem', height: '1.5rem' })}</div>}
                                {subValue}
                            </div>
                        ))}
                    </div>
                ))}
                <div className='py-2 px-3 border-top'>
                    <div
                        className={`fs-5 fw-500 d-flex justify-content-start align-items-center py-1 px-2 ${activeSubValue === 'الإعدادات' ? 'activePage' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSubValueClick('الإعدادات')}
                    >
                        <div className='uiIcon ps-2'>{React.createElement(Settings01, { width: '1.5rem', height: '1.5rem' })}</div>
                        الإعدادات
                    </div>
                    <div
                        className={`fs-5 fw-500 d-flex justify-content-start align-items-center py-1 px-2 ${activeSubValue === 'تسجيل الخروج' ? 'activePage' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSubValueClick('تسجيل الخروج')}
                    >
                        <div className='uiIcon ps-2'>{React.createElement(LogOut01, { width: '1.5rem', height: '1.5rem' })}</div>
                        تسجيل الخروج
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavigationsMenu;
