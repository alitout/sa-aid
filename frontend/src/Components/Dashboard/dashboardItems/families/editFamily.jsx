import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PhoneInput from 'react-phone-number-input'
import { UPDATEFAMILYBYID } from '../../../../externalApi/ExternalUrls';
import { globalVariables } from '../../../../Global/globalVariables';
import axios from 'axios';

const EditFamily = ({ show, handleClose, familyData, onSave, auth }) => {

    const allCountryCodes = globalVariables.allCountryCodes;
    const FamilyID = familyData.FamilyID;

    // State variables
    const [familyCountry, setFamilyCountry] = useState(familyData.FamilyBuilding);
    const [isFamilyCountryEmpty, setIsFamilyCountryEmpty] = useState(false);
    const [familyCity, setFamilyCity] = useState(familyData.FamilyCity);
    const [isFamilyCityEmpty, setIsFamilyCityEmpty] = useState(false);
    const [familyStreet, setFamilyStreet] = useState(familyData.FamilyStreet);
    const [isFamilyStreetEmpty, setIsFamilyStreetEmpty] = useState(false);
    const [familyBuilding, setFamilyBuilding] = useState(familyData.FamilyBuilding);
    const [isFamilyBuildingEmpty, setIsFamilyBuildingEmpty] = useState(false);
    const [familyFloor, setFamilyFloor] = useState(familyData.FamilyFloor);
    const [isFamilyFloorEmpty, setIsFamilyFloorEmpty] = useState(false);
    const [familyFloorPart, setFamilyFloorPart] = useState(familyData.FamilyFloorPart);
    const [isFamilyFloorPartEmpty, setIsFamilyFloorPartEmpty] = useState(false);
    const [familyHomePhoneNumber, setFamilyHomePhoneNumber] = useState(familyData.FamilyHomePhoneNumber);
    const [isFamilyHomePhoneNumberEmpty, setIsFamilyHomePhoneNumberEmpty] = useState(false);
    const [isFamilyHomePhoneNumberValid, setIsFamilyHomePhoneNumberValid] = useState(true);
    const [familyHaveCar, setFamilyHaveCar] = useState(familyData.HaveCar);
    const [familyType, setFamilyType] = useState(familyData.Type);
    const [isFamilyTypeEmpty, setIsFamilyTypeEmpty] = useState(false);
    const [editFamilySuccess, setEditFamilySuccess] = useState();
    const [editFamilyFail, setEditFamilyFail] = useState();


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

    const editFamily = async (e) => {
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
            const editFamilyRequest = {
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
                const response = await axios.patch(`${UPDATEFAMILYBYID}${FamilyID}`, editFamilyRequest, {
                    headers: {
                        'Authorization': auth,
                    }
                });
                setEditFamilyFail(null);
                setEditFamilySuccess(response.data.msg);
                setTimeout(() => {
                    onSave(editFamilyRequest);
                }, 3000);
            } catch (error) {
                console.error(error);
                setEditFamilyFail(error.response.data);
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
                    {editFamilySuccess &&
                        <div className="alert alert-success mb-4">
                            {editFamilySuccess}
                        </div>}
                    {editFamilyFail &&
                        <div className="alert alert-danger mb-4">
                            {editFamilyFail}
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
                                        value={familyCountry}
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
                                        value={familyCity}
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
                                        value={familyStreet}
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
                                        value={familyBuilding}
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
                                        value={familyFloor}
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
                                        value={familyFloorPart}
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
                                        value={familyType}
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
                                    checked={familyHaveCar}
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
                                    onClick={editFamily}>
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

export default EditFamily;
