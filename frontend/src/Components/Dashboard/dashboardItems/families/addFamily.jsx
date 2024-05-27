import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input'
import axios from 'axios';
import { ADDFAMILY } from '../../../../externalApi/ExternalUrls';
import { globalVariables } from '../../../../Global/globalVariables';
import Modal from 'react-bootstrap/Modal';

function AddFamily({ show, handleClose, auth, onSave }) {
    const allCountryCodes = globalVariables.allCountryCodes;

    // State variables
    const [familyCountry, setFamilyCountry] = useState('');
    const [isFamilyCountryEmpty, setIsFamilyCountryEmpty] = useState(false);
    const [familyCity, setFamilyCity] = useState('');
    const [isFamilyCityEmpty, setIsFamilyCityEmpty] = useState(false);
    const [familyStreet, setFamilyStreet] = useState('');
    const [isFamilyStreetEmpty, setIsFamilyStreetEmpty] = useState(false);
    const [familyBuilding, setFamilyBuilding] = useState('');
    const [isFamilyBuildingEmpty, setIsFamilyBuildingEmpty] = useState(false);
    const [familyFloor, setFamilyFloor] = useState('');
    const [isFamilyFloorEmpty, setIsFamilyFloorEmpty] = useState(false);
    const [familyFloorPart, setFamilyFloorPart] = useState('');
    const [isFamilyFloorPartEmpty, setIsFamilyFloorPartEmpty] = useState(false);
    const [familyHomePhoneNumber, setFamilyHomePhoneNumber] = useState('');
    const [isFamilyHomePhoneNumberEmpty, setIsFamilyHomePhoneNumberEmpty] = useState(false);
    const [isFamilyHomePhoneNumberValid, setIsFamilyHomePhoneNumberValid] = useState(true);
    const [familyHaveCar, setFamilyHaveCar] = useState(false);
    const [familyType, setFamilyType] = useState('');
    const [isFamilyTypeEmpty, setIsFamilyTypeEmpty] = useState(false);
    const [addFamilySuccess, setAddFamilySuccess] = useState();
    const [addFamilyFail, setAddFamilyFail] = useState();


    const handleFamilyCountryChange = (e) => {
        setFamilyCountry(e.target.value);
        setIsFamilyCountryEmpty(false);
    }

    const handleFamilyCityChange = (e) => {
        setFamilyCity(e.target.value);
        setIsFamilyCityEmpty(false);
    }

    const handleFamilyStreetChange = (e) => {
        setFamilyStreet(e.target.value);
        setIsFamilyStreetEmpty(false);
    }

    const handleFamilyBuildingChange = (e) => {
        setFamilyBuilding(e.target.value);
        setIsFamilyBuildingEmpty(false);
    }

    const handleFamilyFloorChange = (e) => {
        setFamilyFloor(e.target.value);
        setIsFamilyFloorEmpty(false);
    }

    const handleFamilyFloorPartChange = (e) => {
        setFamilyFloorPart(e.target.value);
        setIsFamilyFloorPartEmpty(false);
    }

    const handleFamilyHomePhoneNumberChange = (e) => {
        setFamilyHomePhoneNumber(e);
        setIsFamilyHomePhoneNumberEmpty(false);
        setIsFamilyHomePhoneNumberValid(true);
    }

    const handleFamilyHaveCarChange = (e) => {
        setFamilyHaveCar(e.target.checked);
    }

    const handleFamilyTypeChange = (e) => {
        setFamilyType(e.target.value);
        setIsFamilyTypeEmpty(false);
    }

    const addFamily = async (e) => {
        e.preventDefault();

        const isFamilyCountryEmpty = familyCountry === '';
        const isFamilyCityEmpty = familyCity === '';
        const isFamilyStreetEmpty = familyStreet === '';
        const isFamilyBuildingEmpty = familyBuilding === '';
        const isFamilyFloorEmpty = familyFloor === '';
        const isFamilyFloorPartEmpty = familyFloorPart === '';
        const isFamilyTypeEmpty = familyType === '';

        setIsFamilyCountryEmpty(isFamilyCountryEmpty);
        setIsFamilyCityEmpty(isFamilyCityEmpty);
        setIsFamilyStreetEmpty(isFamilyStreetEmpty);
        setIsFamilyBuildingEmpty(isFamilyBuildingEmpty);
        setIsFamilyFloorEmpty(isFamilyFloorEmpty);
        setIsFamilyFloorPartEmpty(isFamilyFloorPartEmpty);
        setIsFamilyTypeEmpty(isFamilyTypeEmpty);

        if (!isFamilyCountryEmpty && !isFamilyCityEmpty && !isFamilyStreetEmpty && !isFamilyBuildingEmpty && !isFamilyFloorEmpty && !isFamilyFloorPartEmpty && !isFamilyTypeEmpty) {
            const addFamilyRequest = {
                "FamilyCountry": familyCountry,
                "FamilyCity": familyCity,
                "FamilyStreet": familyStreet,
                "FamilyBuilding": familyBuilding,
                "FamilyFloor": familyFloor,
                "FamilyFloorPart": familyFloorPart,
                "FamilyHomePhoneNumber": familyHomePhoneNumber,
                "HaveCar": familyHaveCar,
                "Type": familyType
            }

            try {
                const response = await axios.post(ADDFAMILY, addFamilyRequest, {
                    headers: {
                        'Authorization': auth,
                    }
                });
                setAddFamilyFail(null);
                setAddFamilySuccess(response.data.msg);
                setTimeout(() => {
                    onSave(addFamilyRequest);
                }, 3000);
            } catch (error) {
                console.error(error);
                setAddFamilyFail(error.response.data);
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
                <div className="AddFamily container d-flex flex-column col-12 m-auto">
                    {addFamilySuccess &&
                        <div className="alert alert-success mb-4">
                            {addFamilySuccess}
                        </div>}
                    {addFamilyFail &&
                        <div className="alert alert-danger mb-4">
                            {addFamilyFail}
                        </div>}
                    <form className='inputs container d-flex flex-column row-gap-1 px-3'>
                        <div className="d-flex flex-wrap justify-content-start row-gap-1 column-gap-3">
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    البلد <span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control ${isFamilyCountryEmpty ? 'is-invalid' : ''}`}
                                        placeholder='البلد'
                                        onChange={handleFamilyCountryChange}
                                    />
                                    {isFamilyCountryEmpty &&
                                        <div className='invalid-feedback align-self-start'>
                                            البلد مطلوب
                                        </div>}
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    المنطقة <span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control ${isFamilyCityEmpty ? 'is-invalid' : ''}`}
                                        placeholder='المنطقة'
                                        onChange={handleFamilyCityChange}
                                    />
                                    {isFamilyCityEmpty &&
                                        <div className='invalid-feedback'>
                                            المنطقة مطلوبة
                                        </div>}
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    الشارع <span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control ${isFamilyStreetEmpty ? 'is-invalid' : ''}`}
                                        placeholder='الشارع'
                                        onChange={handleFamilyStreetChange}
                                    />
                                    {isFamilyStreetEmpty &&
                                        <div className='invalid-feedback'>
                                            الشارع مطلوب
                                        </div>}
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    اسم البناء <span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control ${isFamilyBuildingEmpty ? 'is-invalid' : ''}`}
                                        placeholder='اسم البناء'
                                        onChange={handleFamilyBuildingChange}
                                    />
                                    {isFamilyBuildingEmpty &&
                                        <div className='invalid-feedback'>
                                            اسم البناء مطلوب
                                        </div>}
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    الطابق <span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <input
                                        type='number'
                                        className={`form-control ${isFamilyFloorEmpty ? 'is-invalid' : ''}`}
                                        placeholder='رقم الطابق'
                                        onChange={handleFamilyFloorChange}
                                    />
                                    {isFamilyFloorEmpty &&
                                        <div className='invalid-feedback'>
                                            الطابق مطلوب
                                        </div>}
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    الجهة <span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control ${isFamilyFloorPartEmpty ? 'is-invalid' : ''}`}
                                        placeholder='الجهة'
                                        onChange={handleFamilyFloorPartChange}
                                    />
                                    {isFamilyFloorPartEmpty &&
                                        <div className='invalid-feedback'>
                                            الجهة مطلوبة
                                        </div>}
                                </div>
                            </div>
                            <div className="input input-phone d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill">
                                <label className="text-black fs-4 fw-500 align-self-start">
                                    رقم الهاتف الأرضي
                                </label>
                                <div>
                                    <PhoneInput
                                        placeholder="الهاتف الأرضي"
                                        value={familyHomePhoneNumber}
                                        onChange={handleFamilyHomePhoneNumberChange}
                                        countries={allCountryCodes}
                                        defaultCountry='LB'
                                    />
                                </div>
                            </div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <label className='text-black fs-4 fw-500 align-self-start'>
                                    القرار <span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className={`form-control ${isFamilyTypeEmpty ? 'is-invalid' : ''}`}
                                        placeholder='القرار'
                                        onChange={handleFamilyTypeChange}
                                    />
                                    {isFamilyTypeEmpty &&
                                        <div className='invalid-feedback'>
                                            القرار مطلوب
                                        </div>}
                                </div>
                            </div>
                            <div className='input input-code form-check d-flex mb-1_25 gap-5 col-12 flex-fill p-0'>
                                <input
                                    type='checkbox'
                                    className='form-check-input'
                                    style={{ padding: '0.75rem' }}
                                    id='HaveCar'
                                    onChange={handleFamilyHaveCarChange}
                                />
                                <label className='text-black fs-4 fw-500 d-flex align-self-start'>
                                    العائلة تمتلك سيارة
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <button
                                    type='submit'
                                    className='button'
                                    onClick={addFamily}>
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

export default AddFamily;
