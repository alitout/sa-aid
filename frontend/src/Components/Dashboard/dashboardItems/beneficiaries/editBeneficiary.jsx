import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PhoneInput from 'react-phone-number-input'
import { ORG_UPDATEUSERBYID, UPDATEBENEFICIARYBYID } from '../../../../externalApi/ExternalUrls';
import { globalVariables } from '../../../../Global/globalVariables';
import axios from 'axios';

const EditBeneficiary = ({ show, handleClose, beneficiaryData, onSave, auth }) => {

    const allCountryCodes = globalVariables.allCountryCodes;
    // State variables
    const BeneficiaryID = beneficiaryData.BeneficiaryID;
    const [beneficiaryFName, setBeneficiaryFName] = useState(beneficiaryData.BeneficiaryFName);
    const [isFNameEmpty, setIsFNameEmpty] = useState(false);
    const [beneficiaryLName, setBeneficiaryLName] = useState(beneficiaryData.BeneficiaryLName);
    const [isLNameEmpty, setIsLNameEmpty] = useState(false);
    const [beneficiaryFatherName, setBeneficiaryFatherName] = useState(beneficiaryData.BeneficiaryFatherName);
    const [isFatherNameEmpty, setIsFatherNameEmpty] = useState(false);
    const [beneficiaryNationality, setBeneficiaryNationality] = useState(beneficiaryData.BeneficiaryNationality);
    const [isNationalityEmpty, setIsNationalityEmpty] = useState(false);
    const [beneficiaryGender, setBeneficiaryGender] = useState(beneficiaryData.BeneficiaryGender);
    const [isGenderEmpty, setIsGenderEmpty] = useState(false);
    const [beneficiaryDOB, setBeneficiaryDOB] = useState(new Date(beneficiaryData.BeneficiaryDOB).toISOString().split('T')[0]);
    const [isDOBEmpty, setIsDOBEmpty] = useState(false);
    const [beneficiarySocialState, setBeneficiarySocialState] = useState(beneficiaryData.BeneficiarySocialState);
    const [isSocialStateEmpty, setIsSocialStateEmpty] = useState(false);
    const [beneficiaryEducationLevel, setBeneficiaryEducationLevel] = useState(beneficiaryData.BeneficiaryEducationLevel);
    const [isEducationLevelEmpty, setIsEducationLevelEmpty] = useState(false);
    const [beneficiaryMajor, setBeneficiaryMajor] = useState(beneficiaryData.BeneficiaryMajor);
    const [beneficiaryPlaceOfWork, setBeneficiaryPlaceOfWork] = useState(beneficiaryData.BeneficiaryPlaceOfWork);
    const [beneficiaryJob, setBeneficiaryJob] = useState(beneficiaryData.BeneficiaryJob);
    const [beneficiarySalary, setBeneficiarySalary] = useState(beneficiaryData.BeneficiarySalary);
    const [beneficiaryPhoneNumber, setBeneficiaryPhoneNumber] = useState(beneficiaryData.BeneficiaryPhone);
    const [beneficiaryMedications, setBeneficiaryMedications] = useState([beneficiaryData.BeneficiaryMedications]);
    const [isBeneficiaryHeadOfFamily, setIsBeneficiaryHeadOfFamily] = useState(beneficiaryData.isHeadOfFamily);
    const [isBeneficiaryActive, setIsBeneficiaryActive] = useState(beneficiaryData.isBeneficiaryActive);
    const [editBeneficiarySuccess, setEditBeneficiarySuccess] = useState();
    const [editBeneficiaryFail, setEditBeneficiaryFail] = useState();


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

    const editBeneficiary = async (e) => {
        e.preventDefault();

        const isFNameEmpty = beneficiaryFName === '';
        const isLNameEmpty = beneficiaryLName === '';
        const isFatherNameEmpty = beneficiaryFatherName === '';
        const isNationalityEmpty = beneficiaryNationality === '';
        const isGenderEmpty = beneficiaryGender === '';
        const isDOBEmpty = beneficiaryDOB === '';
        const isSocialStateEmpty = beneficiarySocialState === '';
        const isEducationLevelEmpty = beneficiaryEducationLevel === '';

        setIsFNameEmpty(isFNameEmpty);
        setIsLNameEmpty(isLNameEmpty);
        setIsFatherNameEmpty(isFatherNameEmpty);
        setIsNationalityEmpty(isNationalityEmpty);
        setIsGenderEmpty(isGenderEmpty);
        setIsDOBEmpty(isDOBEmpty);
        setIsSocialStateEmpty(isSocialStateEmpty);
        setIsEducationLevelEmpty(isEducationLevelEmpty);

        if (!isFNameEmpty && !isLNameEmpty && !isFatherNameEmpty && !isNationalityEmpty && !isGenderEmpty && !isDOBEmpty && !isSocialStateEmpty && !isEducationLevelEmpty) {
            const medicationsString = beneficiaryMedications.join(',') || beneficiaryMedications.join('،') || "لا يوجد";

            const editBeneficiaryRequest = {
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
                "BeneficiaryPhoneNumber": beneficiaryPhoneNumber,
                "BeneficiaryMedications": medicationsString,
                "isHeadOfFamily": isBeneficiaryHeadOfFamily,
                "isBeneficiaryActive": isBeneficiaryActive
            }

            try {
                const response = await axios.patch(`${UPDATEBENEFICIARYBYID}${BeneficiaryID}`, editBeneficiaryRequest, {
                    headers: {
                        'Authorization': auth,
                    }
                });
                setEditBeneficiaryFail(null);
                setEditBeneficiarySuccess(response.data.msg);
                setTimeout(() => {
                    onSave(editBeneficiaryRequest);
                }, 3000);
            } catch (error) {
                console.error(error);
                setEditBeneficiaryFail(error.response.msg);
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
                    {editBeneficiarySuccess &&
                        <div className="alert alert-success mb-4">
                            {editBeneficiarySuccess}
                        </div>}
                    {editBeneficiaryFail &&
                        <div className="alert alert-danger mb-4">
                            {editBeneficiaryFail}
                        </div>}
                    <form className='inputs container d-flex flex-column row-gap-1 px-3'>
                        <div className="d-flex flex-wrap justify-content-start row-gap-1 column-gap-3">
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
                                        value={beneficiaryFName}
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
                                        value={beneficiaryLName}
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
                                        value={beneficiaryFatherName}
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
                                        value={beneficiaryNationality}
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
                                        onChange={handleGenderChange}
                                        value={beneficiaryGender}>
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
                                        value={beneficiaryDOB}
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
                                        onChange={handleSocialStateChange}
                                        value={beneficiarySocialState}>
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
                                        onChange={handleEducationLevelChange}
                                        value={beneficiaryEducationLevel}>
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
                                        value={beneficiaryMajor}
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
                                        value={beneficiaryPlaceOfWork}
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
                                        value={beneficiaryJob}
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
                                        value={beneficiarySalary}
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
                                        value={beneficiaryMedications}
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
                                    checked={isBeneficiaryHeadOfFamily}
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
                                    checked={isBeneficiaryActive}
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
                                    onClick={editBeneficiary}>
                                    تعديل
                                </button>
                            </div>
                        </div>
                    </form >
                </div >
            </Modal.Body>
        </Modal>
    );
};

export default EditBeneficiary;
