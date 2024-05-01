import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { USER_LOGIN } from '../../externalApi/ExternalUrls';

function LoginUser() {
    const navigate = useNavigate();

    // state variables 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [failedToLogin, setFailedToLogin] = useState(null);
    const userType = 'User';


    // Event handlers
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsEmailValid(true);
        setFailedToLogin(null);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsPasswordEmpty(false);
        setFailedToLogin(null);
    };

    // navigations
    const navigateToHome = () => {
        navigate('/');
    };

    const login = async (e) => {
        e.preventDefault();

        const emailRegex = /^[_a-z0-9-]+(.[a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
        const isEmailValid = emailRegex.test(email);
        const isPasswordEmpty = password.trim() === '';

        setIsEmailValid(isEmailValid);
        setIsPasswordEmpty(isPasswordEmpty);

        if (isEmailValid && !isPasswordEmpty) {
            const loginRequest = {
                "UserEmail": email,
                "UserPassword": password
            };

            try {
                const response = await axios.post(USER_LOGIN, loginRequest);

                const bearerToken = response.data.bearerToken;

                localStorage.setItem("bearerToken", bearerToken);

                localStorage.setItem("userType", userType);


                navigate(`/dashboard/directReport`);

            } catch (error) {
                console.log(error);
                setFailedToLogin("فشل في تسجيل الدخول، يرجى المحاولة مرة أخرى")
            }
        };
    };


    return (
        <div>
            {failedToLogin != null &&
                <div className="alert alert-danger mb-4" role="alert">
                    {failedToLogin}
                </div>
            }
            <form className="inputs d-flex flex-column col-12 gap-4 px-3">
                <div className="d-flex flex-column gap-3">
                    <div className="input input-email d-flex flex-column mb-1_25 gap-2">
                        <label className="text-black fs-3 fw-500 align-self-start">
                            البريد الالكتروني
                        </label>
                        <input
                            autoComplete='off'
                            id='email'
                            type="email"
                            label="email"
                            for="email"
                            placeholder="البريد الالكتروني"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {!isEmailValid && (
                            <div className="text-danger align-self-start">
                                البريد الالكتروني غير صحيح
                            </div>
                        )}
                    </div>
                    <div className="input input-password d-flex flex-column gap-2">
                        <label className="text-black fs-3 fw-500 align-self-start">
                            كلمة المرور
                        </label>
                        <input
                            id='password'
                            type="password"
                            label="password"
                            for="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {isPasswordEmpty && (
                            <div className="text-danger align-self-start">
                                كلمة المرور لا يمكن أن تكون فارغة
                            </div>
                        )}
                    </div>
                </div>
                <button className="Sign-in button" onClick={login}>
                    تسجيل الدخول
                </button>
            </form>
            <a className="backToLogin d-flex flex-row justify-content-center text-decoration-none text-brown-500 fs- mt-3 px-3 fw-500" onClick={navigateToHome}>
                العودة إلى الصفحة الرئيسية
            </a>
        </div>
    )
}

export default LoginUser
