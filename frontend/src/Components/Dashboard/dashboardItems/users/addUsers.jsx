import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input'
import axios from 'axios';
import { ORG_ADDUSER } from '../../../../externalApi/ExternalUrls';
import { globalVariables } from '../../../../Global/globalVariables';

function AddUsers({ auth, onSave }) {
    const allCountryCodes = globalVariables.allCountryCodes;

    // State variables
    const [userFName, setUserFName] = useState('');
    const [isFNameEmpty, setIsFNameEmpty] = useState(false);
    const [userLName, setUserLName] = useState('');
    const [isLNameEmpty, setIsLNameEmpty] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [userPassword, setUserPassword] = useState('');
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [isPhoneEmpty, setIsPhoneEmpty] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [userDOB, setUserDOB] = useState('');
    const [isDOBEmpty, setIsDOBEmpty] = useState(false);
    const [userNationality, setUserNationality] = useState('');
    const [isNationalityEmpty, setIsNationalityEmpty] = useState(false);
    const [userGender, setUserGender] = useState('');
    const [isGenderEmpty, setIsGenderEmpty] = useState(false);
    const [userAddress, setUserAddress] = useState('');
    const [isAddressEmpty, setIsAddressEmpty] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [isRoleEmpty, setIsRoleEmpty] = useState(false);
    const [isUserHeadOfDistribution, setIsUserHeadOfDistribution] = useState(false);
    const [addUserSuccess, setAddUserSuccess] = useState();
    const [addUserFail, setAddUserFail] = useState();


    const handleFNameChange = (e) => {
        setUserFName(e.target.value);
        setIsFNameEmpty(false);
    };

    const handleLNameChange = (e) => {
        setUserLName(e.target.value);
        setIsLNameEmpty(false);
    }

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
        setIsEmailValid(true);
    }

    const handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
        setIsPasswordEmpty(false);
    }

    const handlePhoneChange = (e) => {
        setUserPhoneNumber(e);
        setIsPhoneEmpty(false);
        setIsPhoneValid(true);
    }

    const handleDOBChange = (e) => {
        setUserDOB(e.target.value);
        setIsDOBEmpty(false);
    }

    const handleNationalityChange = (e) => {
        setUserNationality(e.target.value);
        setIsNationalityEmpty(false);
    }

    const handleGenderChange = (e) => {
        setUserGender(e.target.value);
        setIsGenderEmpty(false);
    }

    const handleAddressChange = (e) => {
        setUserAddress(e.target.value);
        setIsAddressEmpty(false);
    }

    const handleRoleChange = (e) => {
        setUserRole(e.target.value);
        setIsRoleEmpty(false);
    }

    const handleUserHeadOfDistributionChange = (e) => {
        setIsUserHeadOfDistribution(e.target.checked);
    }

    const addUser = async (e) => {
        e.preventDefault();

        const isFNameEmpty = userFName === '';
        const isLNameEmpty = userLName === '';
        const emailRegex = globalVariables.emailRegex;
        const isEmailValid = emailRegex.test(userEmail);
        const isPasswordEmpty = userPassword === '';
        const isPhoneEmpty = userPhoneNumber === '';
        const isPhoneValid = userPhoneNumber !== '';
        const isDOBEmpty = userDOB === '';
        const isNationalityEmpty = userNationality === '';
        const isGenderEmpty = userGender === '';
        const isAddressEmpty = userAddress === '';
        const isRoleEmpty = userRole === '';

        setIsFNameEmpty(isFNameEmpty);
        setIsLNameEmpty(isLNameEmpty);
        setIsEmailValid(isEmailValid);
        setIsPasswordEmpty(isPasswordEmpty);
        setIsPhoneEmpty(isPhoneEmpty);
        setIsPhoneValid(isPhoneValid);
        setIsDOBEmpty(isDOBEmpty);
        setIsNationalityEmpty(isNationalityEmpty);
        setIsGenderEmpty(isGenderEmpty);
        setIsAddressEmpty(isAddressEmpty);
        setIsRoleEmpty(isRoleEmpty);

        if (!isFNameEmpty && !isLNameEmpty && isEmailValid && !isPasswordEmpty && !isPhoneEmpty && isPhoneValid && !isDOBEmpty && !isNationalityEmpty && !isGenderEmpty && !isAddressEmpty && !isRoleEmpty) {
            const addUserRequest = {
                "UserFName": userFName,
                "UserLName": userLName,
                "UserEmail": userEmail,
                "UserPassword": userPassword,
                "UserPhoneNumber": userPhoneNumber,
                "UserDOB": userDOB,
                "UserNationality": userNationality,
                "UserGender": userGender,
                "UserAddress": userAddress,
                "UserRole": userRole,
                "isHeadOfDistribution": isUserHeadOfDistribution
            }

            try {
                const response = await axios.post(ORG_ADDUSER, addUserRequest, {
                    headers: {
                        'Authorization': auth,
                    }
                });
                setAddUserFail(null);
                setAddUserSuccess(response.data.msg);
                setTimeout(() => {
                    onSave(addUserRequest);
                }, 3000);
            } catch (error) {
                console.error(error);
                setAddUserFail(error.response.msg);
            }
        };
    }

    return (
        <div className="AddUser container d-flex flex-column col-12 m-auto">
            {addUserSuccess &&
                <div className="alert alert-success mb-4">
                    {addUserSuccess}
                </div>}
            {addUserFail &&
                <div className="alert alert-danger mb-4">
                    {addUserFail}
                </div>}
            <form className='inputs container d-flex flex-column row-gap-1 px-3'>
                <div className="d-flex flex-wrap justify-content-start row-gap-1 column-gap-3">
                    <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                        <label className='text-black fs-4 fw-500 align-self-start'>
                            الإسم الأول <span className='text-danger'>*</span>
                        </label>
                        <div>
                            <input
                                type='text'
                                className={`form-control ${isFNameEmpty ? 'is-invalid' : ''}`}
                                placeholder='الإسم الأول'
                                onChange={handleFNameChange}
                            />
                            {isFNameEmpty &&
                                <div className='invalid-feedback align-self-start'>
                                    الإسم الأول مطلوب
                                </div>}
                        </div>
                    </div>
                    <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                        <label className='text-black fs-4 fw-500 align-self-start'>
                            الإسم الأخير <span className='text-danger'>*</span>
                        </label>
                        <div>
                            <input
                                type='text'
                                className={`form-control ${isLNameEmpty ? 'is-invalid' : ''}`}
                                placeholder='الإسم الأخير'
                                onChange={handleLNameChange}
                            />
                            {isLNameEmpty &&
                                <div className='invalid-feedback'>
                                    الإسم الأخير مطلوب
                                </div>}
                        </div>
                    </div>
                    <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                        <label className='text-black fs-4 fw-500 align-self-start'>
                            البريد الإلكتروني <span className='text-danger'>*</span>
                        </label>
                        <div>
                            <input
                                type='email'
                                className={`form-control ${!isEmailValid ? 'is-invalid' : ''}`}
                                placeholder='البريد الإلكتروني'
                                onChange={handleEmailChange}
                            />
                            {!isEmailValid &&
                                <div className='invalid-feedback'>
                                    البريد الإلكتروني غير صحيح
                                </div>}
                        </div>
                    </div>
                    <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                        <label className='text-black fs-4 fw-500 align-self-start'>
                            كلمة المرور <span className='text-danger'>*</span>
                        </label>
                        <div>
                            <input
                                type='password'
                                className={`form-control ${isPasswordEmpty ? 'is-invalid' : ''}`}
                                placeholder='كلمة المرور'
                                onChange={handlePasswordChange}
                            />
                            {isPasswordEmpty &&
                                <div className='invalid-feedback'>
                                    كلمة المرور مطلوبة
                                </div>}
                        </div>
                    </div>
                    <div className="input input-phone d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill">
                        <label className="text-black fs-4 fw-500 align-self-start">
                            رقم الهاتف<span className='text-danger'> *</span>
                        </label>
                        <div>
                            <PhoneInput
                                placeholder="رقم الهاتف"
                                value={userPhoneNumber}
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
                    </div>
                    <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                        <label className='text-black fs-4 fw-500 align-self-start'>
                            تاريخ الميلاد <span className='text-danger'>*</span>
                        </label>
                        <div>
                            <input
                                type='date'
                                className={`form-control ${isDOBEmpty ? 'is-invalid' : ''}`}
                                placeholder='تاريخ الميلاد'
                                onChange={handleDOBChange}
                            />
                            {isDOBEmpty &&
                                <div className='invalid-feedback'>
                                    تاريخ الميلاد مطلوب
                                </div>}
                        </div>
                    </div>
                    <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                        <label className='text-black fs-4 fw-500 align-self-start'>
                            الجنسية <span className='text-danger'>*</span>
                        </label>
                        <div>
                            <input
                                type='text'
                                className={`form-control ${isNationalityEmpty ? 'is-invalid' : ''}`}
                                placeholder='الجنسية'
                                onChange={handleNationalityChange}
                            />
                            {isNationalityEmpty &&
                                <div className='invalid-feedback'>
                                    الجنسية مطلوبة
                                </div>}
                        </div>
                    </div>
                    <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                        <label className='text-black fs-4 fw-500 align-self-start'>
                            الجنس <span className='text-danger'>*</span>
                        </label>
                        <div>
                            <select
                                className={`form-control ${isGenderEmpty ? 'is-invalid' : ''}`}
                                onChange={handleGenderChange}>
                                <option value=''>الجنس</option>
                                <option value='ذكر'>ذكر</option>
                                <option value='أنثى'>أنثى</option>
                            </select>
                            {isGenderEmpty &&
                                <div className='invalid-feedback'>
                                    الجنس مطلوب
                                </div>}
                        </div>
                    </div>
                    <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                        <label className='text-black fs-4 fw-500 align-self-start'>
                            العنوان <span className='text-danger'>*</span>
                        </label>
                        <div>
                            <input
                                type='text'
                                className={`form-control ${isAddressEmpty ? 'is-invalid' : ''}`}
                                placeholder='العنوان'
                                onChange={handleAddressChange}
                            />
                            {isAddressEmpty &&
                                <div className='invalid-feedback'>
                                    العنوان مطلوب
                                </div>}
                        </div>
                    </div>
                    <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                        <label className='text-black fs-4 fw-500 align-self-start'>
                            الدور <span className='text-danger'>*</span>
                        </label>
                        <div>
                            <select
                                className={`form-control ${isRoleEmpty ? 'is-invalid' : ''}`}
                                onChange={handleRoleChange}>
                                <option value='not admin'>not admin</option>
                                <option value='Distributions admin'>Distributions admin</option>
                                <option value='Beneficiaries admin'>Beneficiaries admin</option>
                            </select>
                            {isRoleEmpty &&
                                <div className='invalid-feedback'>
                                    الدور مطلوب
                                </div>}
                        </div>
                    </div>
                    <div className='input input-code form-check d-flex mb-1_25 gap-5 col-12 col-sm-4 flex-fill p-0'>
                        <input
                            type='checkbox'
                            className='form-check-input'
                            style={{ padding: '0.75rem' }}
                            id='headOfDistribution'
                            onChange={handleUserHeadOfDistributionChange}
                        />
                        <label className='text-black fs-4 fw-500 d-flex align-self-start'>
                            مسؤول توزيعة؟
                        </label>
                    </div>
                </div>
                <div>
                    <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                        <button
                            type='submit'
                            className='button'
                            onClick={addUser}>
                            إضافة
                        </button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default AddUsers;
