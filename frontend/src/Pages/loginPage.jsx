import React, { useEffect, useState } from 'react'
import Logo from '../Components/Logo/Logo';
import { useNavigate } from 'react-router-dom';
import LoginUser from '../Components/Login/LoginUser';
import LoginOrg from '../Components/Login/LoginOrg';

function LoginPage() {
    const navigate = useNavigate();

    // State variables
    const [userType, setUserType] = useState('User');

    // Function to show the form based on userType
    const showUserForm = (userType) => {
        setUserType(userType);
        window.location.hash = userType;
    };

    useEffect(() => {
        if (localStorage.getItem('bearerToken')) {
            navigate('/dashboard/directReport');
        }
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1); // Remove the '#' from the hash
            if (hash === 'User' || hash === 'Organization') {
                setUserType(hash);
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);


    return (
        <section className='LoginPage'>
            <div className='Login d-flex flex-column justify-content-center align-items-center text-center col-12' style={{ height: '100vh' }}>
                <div className="form p-4 container d-flex flex-column w-100" style={{ maxWidth: '44rem' }}>
                    <div className="d-flex justify-content-start align-items-start text-center col-12">
                        <Logo />
                    </div>
                    <div className='d-flex justify-content-start align-items-start text-end col-12 fs-2 fs-sm-3 fw-600 text-black py-4 px-3'>
                        أهلا بك في ساعد | SA-AID
                    </div>
                    <div className="buttons d-flex justify-content-start px-3 pb-3">
                        <button
                            type="button"
                            className={`button ms-2 fw-400 p-2 ${userType === 'User' ? 'activeBtn' : ''}`}
                            onClick={() => showUserForm('User')}
                        >
                            مستخدم
                        </button>

                        <button
                            type="button"
                            className={`button ms-2 fw-400 p-2 ${userType === 'Organization' ? 'activeBtn' : ''}`}
                            onClick={() => showUserForm('Organization')}
                        >
                            مؤسسة
                        </button>
                    </div>
                    <form className={`user-form ${userType ? 'active' : ''}`}>
                        {userType === 'User' && (<LoginUser />)}
                        {userType === 'Organization' && (<LoginOrg />)}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default LoginPage;
