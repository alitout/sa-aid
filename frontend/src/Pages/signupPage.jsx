import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Logo from '../Components/Logo/Logo';
import axios from 'axios';
import { ORG_REGISTER } from '../externalApi/ExternalUrls';

function SignupPage() {
    const navigate = useNavigate();

    const allCountryCodes = [
        'AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TA', 'TC', 'TD', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW'
    ];

    // State variables
    const [organizationCode, setOrganizationCode] = useState('');
    const [isCodeValid, setIsCodeValid] = useState(true);
    const [organizationName, setOrganizationName] = useState('');
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [organizationAddress, setOrganizationAddress] = useState('');
    const [isAddressEmpty, setIsAddressEmpty] = useState(false);
    const [organizationPhone, setOrganizationPhone] = useState('');
    const [isPhoneEmpty, setIsPhoneEmpty] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [organizationEmail, setOrganizationEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [organizationPassword, setOrganizationPassword] = useState('');
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [organizationConfirmPassword, setOrganizationConfirmPassword] = useState('');
    const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
    const [createOrganizationAccess, setCreateOrganizationAccess] = useState();
    const [createOrganizationFail, setCreateOrganizationFail] = useState();

    useEffect(() => {
        if (organizationPassword === organizationConfirmPassword && !isPasswordEmpty) {
            setIsPasswordConfirmed(true);
        } else {
            setIsPasswordConfirmed(false);
        }
    }, [organizationPassword, organizationConfirmPassword, isPasswordEmpty]);

    // Event handlers
    const handleCodeChange = (e) => {
        setOrganizationCode(e.target.value);
        const codeRegex = /^[a-zA-Z]{2,4}$/;
        setIsCodeValid(codeRegex.test(e.target.value));
        if (e.target.value === '') {
            setIsCodeValid(true);
        }
    };

    const handleNameChange = (e) => {
        setOrganizationName(e.target.value);
        setIsNameEmpty(false);
    };

    const handlePhoneChange = (value) => {
        setOrganizationPhone(value);
        setIsPhoneValid(true);
        setIsPhoneEmpty(false);
    };

    const handleAddressChange = (e) => {
        setOrganizationAddress(e.target.value);
        setIsAddressEmpty(false);
    };

    const handleEmailChange = (e) => {
        setOrganizationEmail(e.target.value);
        setIsEmailValid(true);
    };

    const handlePasswordChange = (e) => {
        setOrganizationPassword(e.target.value);
        setIsPasswordEmpty(false);
    };

    const handleConfirmPasswordChange = (e) => {
        setOrganizationConfirmPassword(e.target.value);
        setIsConfirmPasswordEmpty(false);
    };

    const navigateToSignIn = () => {
        navigate('/login#Organization');
    };

    const signup = async (e) => {
        e.preventDefault();

        const codeRegex = /^[a-zA-Z]{2,4}$/;
        const isCodeValid = codeRegex.test(organizationCode);
        const emailRegex = /^[_a-z0-9-]+(.[a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
        const isEmailValid = emailRegex.test(organizationEmail);
        const isPasswordEmpty = organizationPassword.trim() === '';
        const isNameEmpty = organizationName.trim() === '';
        const isAddressEmpty = organizationAddress.trim() === '';
        const isPhoneEmpty = organizationPhone.trim() === '';
        const isConfirmPasswordEmpty = organizationConfirmPassword.trim() === '';

        setIsCodeValid(isCodeValid)
        setIsEmailValid(isEmailValid);
        setIsPasswordEmpty(isPasswordEmpty);
        setIsNameEmpty(isNameEmpty);
        setIsAddressEmpty(isAddressEmpty);
        setIsPhoneEmpty(isPhoneEmpty);
        setIsConfirmPasswordEmpty(isConfirmPasswordEmpty);

        if (isCodeValid && !isNameEmpty && !isAddressEmpty && !isPhoneEmpty && isEmailValid && !isPasswordEmpty && !isConfirmPasswordEmpty && isPasswordConfirmed) {
            const signupRequest = {
                "OrganizationCode": organizationCode.toUpperCase(),
                "OrganizationName": organizationName,
                "OrganizationAddress": organizationAddress,
                "OrganizationPhone": organizationPhone,
                "OrganizationEmail": organizationEmail,
                "OrganizationPassword": organizationPassword
            };

            try {
                const response = await axios.post(ORG_REGISTER, signupRequest);
                setCreateOrganizationFail(null);
                setCreateOrganizationAccess(response.data.msg);

                setTimeout(() => {
                    navigate('/login');
                }, 3000);

            } catch (error) {
                console.log(error);
                setCreateOrganizationFail(error.response.data);
            }
        };
    };
    return (
        <section className='SignUpPage'>
            <div className='SignUp d-flex flex-column text-center col-12 m-auto'>
                <div className="form pt-4 pb-3 container d-flex flex-column w-100" style={{ maxWidth: '50rem' }}>
                    <div className="d-flex justify-content-start align-items-start" >
                        <Logo />
                    </div>
                    <div className='d-flex justify-content-start align-items-start text-end fs-3 fs-sm-4 fw-600 text-black p-3'>
                        أهلا بك في ساعد | SA-AID
                    </div>
                    {createOrganizationFail != null &&
                        <div className='alert alert-danger mb-4' role='alert'>
                            {createOrganizationFail}
                        </div>
                    }
                    {createOrganizationAccess != null &&
                        <div className="alert alert-success mb-4" role='alert'>
                            {createOrganizationAccess}
                        </div>
                    }
                    <form className="inputs d-flex flex-column col-12 row-gap-1 px-3">
                        <div className="d-flex flex-wrap justify-content-start row-gap-1 column-gap-3">
                            <div className="input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill">
                                <label className="text-black fs-4 fw-500 align-self-start">
                                    رمز المؤسسة<span className='text-danger'> *</span>
                                </label>
                                <input
                                    autocomplete='off'
                                    id='code'
                                    type="code"
                                    label="code"
                                    for="code"
                                    placeholder="رمز المؤسسة"
                                    value={organizationCode}
                                    onChange={handleCodeChange}
                                />
                                {!isCodeValid && (
                                    <div className="text-danger align-self-start">
                                        الرمز من 2 إلى 4 حروف إنجليزية
                                    </div>
                                )}
                            </div>
                            <div className="input input-name d-flex flex-column mb-1_25 gap-2 col-12 col-sm-7 flex-fill">
                                <label className="text-black fs-4 fw-500 align-self-start">
                                    اسم المؤسسة<span className='text-danger'> *</span>
                                </label>
                                <input
                                    autocomplete='off'
                                    id='name'
                                    type="name"
                                    label="name"
                                    for="name"
                                    placeholder="اسم المؤسسة"
                                    value={organizationName}
                                    onChange={handleNameChange}
                                />
                                {isNameEmpty && (
                                    <div className="text-danger align-self-start">
                                        اسم المؤسسة لا يمكن أن يكون فارغا
                                    </div>
                                )}
                            </div>
                            <div className="input input-phone d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill">
                                <label className="text-black fs-4 fw-500 align-self-start">
                                    رقم الهاتف<span className='text-danger'> *</span>
                                </label>
                                <PhoneInput
                                    placeholder="رقم الهاتف"
                                    value={organizationPhone}
                                    onChange={handlePhoneChange}
                                    countries={allCountryCodes}
                                    defaultCountry='LB'
                                />
                                {isPhoneEmpty && (
                                    <div className="text-danger align-self-start">
                                        الرقم لا يمكن أن يكون فارغا
                                    </div>
                                )}
                            </div>
                            <div className="input input-address d-flex flex-column mb-1_25 gap-2 col-12 col-sm-7 flex-fill">
                                <label className="text-black fs-4 fw-500 align-self-start">
                                    العنوان<span className='text-danger'> *</span>
                                </label>
                                <input
                                    autocomplete='off'
                                    id='address'
                                    type="address"
                                    label="address"
                                    for="address"
                                    placeholder="العنوان"
                                    value={organizationAddress}
                                    onChange={handleAddressChange}
                                />
                                {isAddressEmpty && (
                                    <div className='text-danger align-self-start'>
                                        العنوان لا يمكن أن يكون فارغا
                                    </div>
                                )}
                            </div>
                            <div className="input input-email d-flex flex-column mb-1_25 gap-2 col-11 flex-fill">
                                <label className="text-black fs-4 fw-500 align-self-start">
                                    البريد الالكتروني<span className='text-danger'> *</span>
                                </label>
                                <input
                                    autocomplete='off'
                                    id='email'
                                    type="email"
                                    label="email"
                                    for="email"
                                    placeholder="البريد الالكتروني"
                                    value={organizationEmail}
                                    onChange={handleEmailChange}
                                />
                                {!isEmailValid && (
                                    <div className="text-danger align-self-start">
                                        البريد الالكتروني غير صحيح
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center gap-3">
                            <div className="input input-password d-flex flex-column mb-1_25 gap-2 col-12 col-sm-5 flex-fill">
                                <label className="text-black fs-4 fw-500 align-self-start">
                                    كلمة المرور<span className='text-danger'> *</span>
                                </label>
                                <input
                                    autocomplete='off'
                                    id='password'
                                    type="password"
                                    label="password"
                                    for="password"
                                    placeholder="••••••••"
                                    value={organizationPassword}
                                    onChange={handlePasswordChange}
                                />
                                {isPasswordEmpty && (
                                    <div className="text-danger align-self-start">
                                        كلمة المرور لا يمكن أن تكون فارغة
                                    </div>
                                )}
                            </div>
                            <div className="input input-confirmPassword d-flex flex-column mb-1_25 gap-2 col-12 col-sm-5 flex-fill">
                                <label className="text-black fs-4 fw-500 align-self-start">
                                    تأكيد كلمة المرور<span className='text-danger'> *</span>
                                </label>
                                <input
                                    autocomplete='off'
                                    id='confirmPassword'
                                    type="password"
                                    label="confirmPassword"
                                    for="confirmPassword"
                                    placeholder="••••••••"
                                    value={organizationConfirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                {isConfirmPasswordEmpty && (
                                    <div className="text-danger align-self-start">
                                        كلمة المرور لا يمكن أن تكون فارغة
                                    </div>
                                )}
                                {!isPasswordConfirmed && !isConfirmPasswordEmpty && (
                                    <div className="text-danger align-self-start">
                                        كلمة المرور غير متطابقة
                                    </div>
                                )}
                            </div>
                        </div>
                        <button className="Sign-up button mt-3" onClick={signup}>
                            إنشاء حساب جديد
                        </button>
                    </form>
                    <a className="backToLogin d-flex flex-row justify-content-center text-decoration-none text-brown-500 fs- mt-3 px-3 fw-500" onClick={navigateToSignIn}>
                        لديك حساب؟ سجل الدخول
                    </a>
                </div>
            </div >
        </section >
    )
}

export default SignupPage;
