import React, { useEffect, useState } from 'react'
import Logo from '../Components/Logo/Logo';
import { useNavigate } from 'react-router-dom';
import LoginUser from '../Components/Login/LoginUser';
import LoginOrg from '../Components/Login/LoginOrg';

function LoginPage() {
    const navigate = useNavigate();

    // State variables
    const [formType, setFormType] = useState('user');

    // Function to show the form based on userType
    const showUserForm = (userType) => {
        setFormType(userType);
        window.location.hash = userType;
    };

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1); // Remove the '#' from the hash
            if (hash === 'user' || hash === 'organization') {
                setFormType(hash);
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    localStorage.clear();

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
                            className={`button ms-2 fw-400 p-2 ${formType === 'user' ? 'activeBtn' : ''}`}
                            onClick={() => showUserForm('user')}
                        >
                            مستخدم
                        </button>

                        <button
                            type="button"
                            className={`button ms-2 fw-400 p-2 ${formType === 'organization' ? 'activeBtn' : ''}`}
                            onClick={() => showUserForm('organization')}
                        >
                            مؤسسة
                        </button>
                    </div>
                    <form className={`user-form ${formType ? 'active' : ''}`}>
                        {formType === 'user' && (<LoginUser />)}
                        {formType === 'organization' && (<LoginOrg />)}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default LoginPage;
