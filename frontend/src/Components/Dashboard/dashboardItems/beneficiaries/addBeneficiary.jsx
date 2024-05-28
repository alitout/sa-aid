import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input'
import axios from 'axios';
import { ADDBENEFICIARY } from '../../../../externalApi/ExternalUrls';
import { globalVariables } from '../../../../Global/globalVariables';
import Modal from 'react-bootstrap/Modal';

function AddBeneficiaries({ show, handleClose, auth, onSave, FamilyID }) {
    const allCountryCodes = globalVariables.allCountryCodes;

    // State variables
    const [beneficiaryID, setBeneficiaryID] = useState('');
    const [isIDEmpty, setIsIDEmpty] = useState(false);
    const [beneficiaryFName, setBeneficiaryFName] = useState('');
    const [isFNameEmpty, setIsFNameEmpty] = useState(false);
    const [beneficiaryLName, setBeneficiaryLName] = useState('');
    const [isLNameEmpty, setIsLNameEmpty] = useState(false);
    const [beneficiaryFatherName, setBeneficiaryFatherName] = useState('');
    const [isFatherNameEmpty, setIsFatherNameEmpty] = useState(false);
    const [beneficiaryNationality, setBeneficiaryNationality] = useState('');
    const [isNationalityEmpty, setIsNationalityEmpty] = useState(false);
    const [beneficiaryGender, setBeneficiaryGender] = useState('');
    const [isGenderEmpty, setIsGenderEmpty] = useState(false);
    const [beneficiaryDOB, setBeneficiaryDOB] = useState('');
    const [isDOBEmpty, setIsDOBEmpty] = useState(false);
    const [beneficiarySocialState, setBeneficiarySocialState] = useState('');
    const [isSocialStateEmpty, setIsSocialStateEmpty] = useState(false);
    const [beneficiaryEducationLevel, setBeneficiaryEducationLevel] = useState('');
    const [isEducationLevelEmpty, setIsEducationLevelEmpty] = useState(false);
    const [beneficiaryMajor, setBeneficiaryMajor] = useState('لا يوجد');
    const [beneficiaryPlaceOfWork, setBeneficiaryPlaceOfWork] = useState('لا يوجد');
    const [beneficiaryJob, setBeneficiaryJob] = useState('لا يوجد');
    const [beneficiarySalary, setBeneficiarySalary] = useState('0');
    const [beneficiaryPhoneNumber, setBeneficiaryPhoneNumber] = useState('');
    const [beneficiaryMedications, setBeneficiaryMedications] = useState(['لا يوجد']);
    const [isBeneficiaryHeadOfFamily, setIsBeneficiaryHeadOfFamily] = useState(false);
    const [isBeneficiaryActive, setIsBeneficiaryActive] = useState(true);
    const [addBeneficiarySuccess, setAddBeneficiarySuccess] = useState();
    const [addBeneficiaryFail, setAddBeneficiaryFail] = useState();

    // Event handlers
    const handleIDChange = (e) => {
        setBeneficiaryID(e.target.value);
        setIsIDEmpty(false);
    }

    const handleFNameChange = (e) => {
        setBeneficiaryFName(e.target.value);
        setIsFNameEmpty(false);
    }

    const handleLNameChange = (e) => {
        setBeneficiaryLName(e.target.value);
        setIsLNameEmpty(false);
    }

    const handleFatherNameChange = (e) => {
        setBeneficiaryFatherName(e.target.value);
        setIsFatherNameEmpty(false);
    }

    const handleNationalityChange = (e) => {
        setBeneficiaryNationality(e.target.value);
        setIsNationalityEmpty(false);
    }

    const handleGenderChange = (e) => {
        setBeneficiaryGender(e.target.value);
        setIsGenderEmpty(false);
    }

    const handleDOBChange = (e) => {
        setBeneficiaryDOB(e.target.value);
        setIsDOBEmpty(false);
    }

    const handleSocialStateChange = (e) => {
        setBeneficiarySocialState(e.target.value);
        setIsSocialStateEmpty(false);
    }

    const handleEducationLevelChange = (e) => {
        setBeneficiaryEducationLevel(e.target.value);
        setIsEducationLevelEmpty(false);
    }

    const handleMajorChange = (e) => {
        setBeneficiaryMajor(e.target.value);
    }

    const handlePlaceOfWorkChange = (e) => {
        setBeneficiaryPlaceOfWork(e.target.value);
    }

    const handleJobChange = (e) => {
        setBeneficiaryJob(e.target.value);
    }

    const handleSalaryChange = (e) => {
        setBeneficiarySalary(e.target.value);
    }

    const handlePhoneNumberChange = (e) => {
        setBeneficiaryPhoneNumber(e);
    }

    const handleMedicationsChange = (e) => {
        // setBeneficiaryMedications(e.target.value.split(',') || e.target.value.split('،'));
        let medicationsArray = e.target.value.split(',') || e.target.value.split('،');
        if (medicationsArray.length === 0) {
            medicationsArray = ["لا يوجد"];
        }
        setBeneficiaryMedications(medicationsArray);
    }

    const handleIsHeadOfFamily = (e) => {
        setIsBeneficiaryHeadOfFamily(e.target.checked);
    }

    const handleIsActiveChange = (e) => {
        setIsBeneficiaryActive(e.target.checked);
    }

    const addBeneficiary = async (e) => {
        e.preventDefault();

        const medicationsString = beneficiaryMedications.join(',') || beneficiaryMedications.join('،') || 'لا يوجد';
        const phoneNumber = beneficiaryPhoneNumber ? beneficiaryPhoneNumber : 'لا يوجد';

        const isIDEmpty = beneficiaryID === '';
        const isFNameEmpty = beneficiaryFName === '';
        const isLNameEmpty = beneficiaryLName === '';
        const isFatherNameEmpty = beneficiaryFatherName === '';
        const isNationalityEmpty = beneficiaryNationality === '';
        const isGenderEmpty = beneficiaryGender === '';
        const isDOBEmpty = beneficiaryDOB === '';
        const isSocialStateEmpty = beneficiarySocialState === '';
        const isEducationLevelEmpty = beneficiaryEducationLevel === '';

        setIsIDEmpty(isIDEmpty);
        setIsFNameEmpty(isFNameEmpty);
        setIsLNameEmpty(isLNameEmpty);
        setIsFatherNameEmpty(isFatherNameEmpty);
        setIsNationalityEmpty(isNationalityEmpty);
        setIsGenderEmpty(isGenderEmpty);
        setIsDOBEmpty(isDOBEmpty);
        setIsSocialStateEmpty(isSocialStateEmpty);
        setIsEducationLevelEmpty(isEducationLevelEmpty);

        if (!isIDEmpty && !isFNameEmpty && !isLNameEmpty && !isFatherNameEmpty && !isNationalityEmpty && !isGenderEmpty && !isDOBEmpty && !isSocialStateEmpty && !isEducationLevelEmpty) {
            const addBeneficiaryRequest = {
                "BeneficiaryID": beneficiaryID,
                "FamilyID": FamilyID,
                "BeneficiaryFName": beneficiaryFName,
                "BeneficiaryLName": beneficiaryLName,
                "BeneficiaryFatherName": beneficiaryFatherName,
                "BeneficiaryNationality": beneficiaryNationality,
                "BeneficiaryGender": beneficiaryGender,
                "BeneficiaryDOB": beneficiaryDOB,
                "BeneficiarySocialState": beneficiarySocialState,
                "BeneficiaryEducationLevel": beneficiaryEducationLevel,
                "BeneficiaryMajor": beneficiaryMajor,
                "BeneficiaryPlaceOfWork": beneficiaryPlaceOfWork,
                "BeneficiaryJob": beneficiaryJob,
                "BeneficiarySalary": beneficiarySalary,
                "BeneficiaryPhone": phoneNumber,
                "BeneficiaryMedications": medicationsString,
                "isHeadOfFamily": isBeneficiaryHeadOfFamily,
                "isBeneficiaryActive": isBeneficiaryActive
            }

            try {
                const response = await axios.post(ADDBENEFICIARY, addBeneficiaryRequest, {
                    headers: {
                        'Authorization': auth,
                    }
                });
                setAddBeneficiaryFail(null);
                setAddBeneficiarySuccess(response.data.msg);
                setTimeout(() => {
                    onSave(addBeneficiaryRequest);
                }, 3000);
            } catch (error) {
                console.error(error);
                setAddBeneficiaryFail(error.response.msg);
            }
        };
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <div className="AddUser container d-flex flex-column col-12 m-auto">
                    {addBeneficiarySuccess &&
                        <div className="alert alert-success mb-4">
                            {addBeneficiarySuccess}
                        </div>}
                    {addBeneficiaryFail &&
                        <div className="alert alert-danger mb-4">
                            {addBeneficiaryFail}
                        </div>}
                    <form className='inputs container d-flex flex-column row-gap-1 px-3'>
                        <div className="d-flex flex-wrap justify-content-start row-gap-1 column-gap-3">
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    رمز المستفيد <span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control ${isIDEmpty ? 'is-invalid' : ''}`}
                                        placeholder='رقم الهوية - الباسبور - إخراج قيد - ...'
                                        onChange={handleIDChange}
                                    />
                                    {isIDEmpty &&
                                        <div className='invalid-feedback align-self-start'>
                                            رمز المستفيد مطلوب
                                        </div>}
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    اسم المستفيد <span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control ${isFNameEmpty ? 'is-invalid' : ''}`}
                                        placeholder='اسم المستفيد'
                                        onChange={handleFNameChange}
                                    />
                                    {isFNameEmpty &&
                                        <div className='invalid-feedback align-self-start'>
                                            اسم المستفيد مطلوب
                                        </div>}
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    اسم العائلة <span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control ${isLNameEmpty ? 'is-invalid' : ''}`}
                                        placeholder='اسم العائلة'
                                        onChange={handleLNameChange}
                                    />
                                    {isLNameEmpty &&
                                        <div className='invalid-feedback'>
                                            اسم العائلة مطلوب
                                        </div>}
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    اسم الأب <span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control ${isFatherNameEmpty ? 'is-invalid' : ''}`}
                                        placeholder='اسم الأب'
                                        onChange={handleFatherNameChange}
                                    />
                                    {isFatherNameEmpty &&
                                        <div className='invalid-feedback'>
                                            اسم الأب مطلوب
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
                                    الحالة الإجتماعية <span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <select
                                        className={`form-control ${isSocialStateEmpty ? 'is-invalid' : ''}`}
                                        onChange={handleSocialStateChange}>
                                        <option value=''>الحالة الإجتماعية</option>
                                        <option value='متزوج'>متزوج/ة</option>
                                        <option value='مطلق'>مطلق/ة</option>
                                        <option value='أعزب'>أعزب / عزباء</option>
                                        <option value='أرمل'>أرمل/ة</option>
                                    </select>
                                    {isSocialStateEmpty &&
                                        <div className='invalid-feedback'>
                                            الحالة الإجتماعية مطلوبة
                                        </div>}
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    المستوى التعليمي<span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <select
                                        className={`form-control ${isEducationLevelEmpty ? 'is-invalid' : ''}`}
                                        onChange={handleEducationLevelChange}>
                                        <option value=''>المستوى التعليمي</option>
                                        <option value='أمي'>أمي/ة</option>
                                        <option value='ابتدائي'>ابتدائي</option>
                                        <option value='متوسط'>متوسط</option>
                                        <option value='ثانوي'>ثانوي</option>
                                        <option value='جامعي'>جامعي</option>
                                    </select>
                                    {isEducationLevelEmpty &&
                                        <div className='invalid-feedback'>
                                            المستوى التعليمي مطلوب
                                        </div>}
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    الإختصاص
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control`}
                                        placeholder='الإختصاص'
                                        onChange={handleMajorChange}
                                    />
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    مكان العمل
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control`}
                                        placeholder='مكان العمل'
                                        onChange={handlePlaceOfWorkChange}
                                    />
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    الوظيفة
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control`}
                                        placeholder='الوظيفة'
                                        onChange={handleJobChange}
                                    />
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    الراتب الشهري
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control`}
                                        placeholder='الراتب الشهري $'
                                        onChange={handleSalaryChange}
                                    />
                                </div>
                            </div>
                            <div className="input input-phone d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill">
                                <label className="text-black fs-4 fw-500 align-self-start">
                                    رقم الهاتف
                                </label>
                                <div>
                                    <PhoneInput
                                        placeholder="رقم الهاتف"
                                        value={beneficiaryPhoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        countries={allCountryCodes}
                                        defaultCountry='LB'
                                    />
                                </div>
                            </div>
                            <div className="input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill">
                                <label className="text-black fs-4 fw-500 align-self-start">
                                    الأمراض المزمنة
                                </label>
                                <div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="الأمراض المزمنة"
                                        onChange={handleMedicationsChange}
                                    />
                                </div>
                            </div>
                            <div className='input input-code form-check d-flex mb-1_25 gap-5 col-12 col-sm-4 flex-fill p-0'>
                                <input
                                    type='checkbox'
                                    className='form-check-input'
                                    style={{ padding: '0.75rem' }}
                                    id='isHeadOfFamily'
                                    onChange={handleIsHeadOfFamily}
                                />
                                <label className='text-black fs-4 fw-500 d-flex align-self-start'>
                                    رب الأسرة؟
                                </label>
                            </div>
                            <div className='input input-code form-check d-flex mb-1_25 gap-5 col-12 col-sm-4 flex-fill p-0'>
                                <input
                                    type='checkbox'
                                    className='form-check-input'
                                    style={{ padding: '0.75rem' }}
                                    id='isBeneficiaryActive'
                                    onChange={handleIsActiveChange}
                                />
                                <label className='text-black fs-4 fw-500 d-flex align-self-start'>
                                    نشط؟
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <button
                                    type='submit'
                                    className='button'
                                    onClick={addBeneficiary}>
                                    إضافة
                                </button>
                            </div>
                        </div>
                    </form >
                </div >
            </Modal.Body>
        </Modal>
    )
}

export default AddBeneficiaries;
