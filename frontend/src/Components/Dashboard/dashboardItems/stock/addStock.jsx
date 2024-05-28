import React, { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';
import axios from 'axios';
import { ADDSTOCK, ADDSTOCKITEM, ADDSTOCKTYPE } from '../../../../externalApi/ExternalUrls';
import Modal from 'react-bootstrap/Modal';

function AddStock({ show, handleClose, auth, onSave, stockTypes, stockItems }) {

    // State variables
    const [stockItem, setStockItem] = useState('');
    const [isStockItemEmpty, setIsStockItemEmpty] = useState(false);
    const [stockType, setStockType] = useState('');
    const [isStockTypeEmpty, setIsStockTypeEmpty] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [isQuantityEmpty, setIsQuantityEmpty] = useState(false);
    const [expiryDate, setExpiryDate] = useState('');
    const [isExpiryDate, setIsExpiryDate] = useState(false);
    const [addStockSuccess, setAddStockSuccess] = useState();
    const [addStockFail, setAddStockFail] = useState();
    const [showAddStockItemModal, setShowAddStockItemModal] = useState(false);
    const [addStockItemSuccess, setAddStockItemSuccess] = useState();
    const [addStockItemFail, setAddStockItemFail] = useState();
    const [showAddStockTypeModal, setShowAddStockTypeModal] = useState(false);
    const [addStockTypeSuccess, setAddStockTypeSuccess] = useState();
    const [addStockTypeFail, setAddStockTypeFail] = useState();


    // Event handlers
    const handleStockItemChange = (e) => {
        setStockItem(e.target.value);
        setIsStockItemEmpty(false);
    }

    const handleStockTypeChange = (e) => {
        setStockType(e.target.value);
        setIsStockTypeEmpty(false);
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
        setIsQuantityEmpty(false);
    }

    const handleExpiryDateChange = (e) => {
        setExpiryDate(e.target.value);
        setIsExpiryDate(false);
    }

    const addStock = async (e) => {
        e.preventDefault();

        const isStockItemEmpty = stockItem === '';
        const isQuantityEmpty = quantity === '';
        const isExpiryDate = expiryDate === '';

        setIsStockItemEmpty(isStockItemEmpty);
        setIsQuantityEmpty(isQuantityEmpty);
        setIsExpiryDate(isExpiryDate);

        if (!isStockItemEmpty && !isQuantityEmpty && !isExpiryDate) {
            const addStockRequest = {
                "StockItem": stockItem,
                "Quantity": quantity,
                "ExpiryDate": expiryDate
            }

            try {
                const response = await axios.post(ADDSTOCK, addStockRequest, {
                    headers: {
                        'Authorization': auth,
                    }
                });
                setAddStockFail(null);
                setAddStockSuccess(response.data.msg);
                setTimeout(() => {
                    onSave(addStockRequest);
                }, 3000);
            } catch (error) {
                console.error(error.response);
                setAddStockFail(error.response.msg);
            }
        };
    }

    const openAddStockItemModal = () => {
        setShowAddStockItemModal(true);
    }

    const addStockItem = async (e) => {
        e.preventDefault();

        const isStockItemEmpty = stockItem === '';
        const isStockTypeEmpty = stockType === '';

        setIsStockItemEmpty(isStockItemEmpty);
        setIsStockTypeEmpty(isStockTypeEmpty);

        const addStockItemRequest = {
            "StockType": stockType,
            "ItemName": stockItem
        }

        try {
            const response = await axios.post(ADDSTOCKITEM, addStockItemRequest, {
                headers: {
                    'Authorization': auth,
                }
            });
            console.log(response.data);
            setAddStockItemFail(null);
            setAddStockItemSuccess(response.data.msg);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
        catch (error) {
            console.error(error);
            setAddStockItemFail(error.response.data);
        }
    }

    const openAddStocktypeModal = () => {
        setShowAddStockItemModal(false);
        setShowAddStockTypeModal(true);
    }

    const addStockType = async (e) => {
        e.preventDefault();

        const isStockTypeEmpty = stockType === '';

        setIsStockTypeEmpty(isStockTypeEmpty);

        if (!isStockTypeEmpty) {
            const addStockTypeRequest = {
                "TypeName": stockType
            }

            try {
                const response = await axios.post(ADDSTOCKTYPE, addStockTypeRequest, {
                    headers: {
                        'Authorization': auth,
                    }
                });
                setAddStockTypeFail(null);
                setAddStockTypeSuccess(response.data.msg);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } catch (error) {
                console.error(error);
                setAddStockTypeFail(error.response.data);
            }
        }
    }


    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
        >
            <Modal.Header closeButton />
            <Modal.Body>
                {!showAddStockItemModal && !showAddStockTypeModal && (
                    <div className="AddStock container d-flex flex-column col-12 m-auto">
                        {addStockSuccess &&
                            <div className="alert alert-success mb-4">
                                {addStockSuccess}
                            </div>}
                        {addStockFail &&
                            <div className="alert alert-danger mb-4">
                                {addStockFail}
                            </div>}
                        <form className='inputs container d-flex flex-column row-gap-1 px-3'>
                            <div className="d-flex flex-wrap justify-content-start row-gap-1 column-gap-3">
                                <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                    <label className='text-black fs-4 fw-500 align-self-start'>
                                        الصنف <span className='text-danger'>*</span>
                                    </label>
                                    <div>
                                        <select
                                            className={`form-control ${isStockItemEmpty ? 'is-invalid' : ''}`}
                                            onChange={handleStockItemChange}
                                        >
                                            <option value=''>اختر الصنف</option>
                                            {stockItems.map((item) => (
                                                <option value={item.ItemName}>{item.ItemName}</option>))}
                                        </select>
                                        {isStockItemEmpty && <div className='invalid-feedback'>الرجاء إدخال الصنف</div>}
                                    </div>
                                </div>
                                <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                    <label className='text-black fs-4 fw-500 align-self-start'>
                                        الكمية <span className='text-danger'>*</span>
                                    </label>
                                    <div>
                                        <input
                                            type='number'
                                            className={`form-control ${isQuantityEmpty ? 'is-invalid' : ''}`}
                                            placeholder='مثال: 10'
                                            onChange={handleQuantityChange}
                                        />
                                        {isQuantityEmpty &&
                                            <div className='invalid-feedback'>
                                                الرجاء إدخال الكمية
                                            </div>}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-start row-gap-1 column-gap-3">
                                <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                    <label className='text-black fs-4 fw-500 align-self-start'>
                                        تاريخ انتهاء الصلاحية <span className='text-danger'>*</span>
                                    </label>
                                    <div>
                                        <input
                                            type='date'
                                            className={`form-control ${isExpiryDate ? 'is-invalid' : ''}`}
                                            placeholder='تاريخ انتهاء الصلاحية'
                                            onChange={handleExpiryDateChange}
                                        />
                                        {isExpiryDate &&
                                            <div className='invalid-feedback'>
                                                تاريخ انتهاء الصلاحية مطلوب
                                            </div>}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-start row-gap-1 column-gap-3">
                                <a
                                    className="d-flex flex-row justify-content-center text-decoration-none text-brown-500 fs- my-2 fw-500"
                                    style={{ cursor: "pointer" }}
                                    onClick={openAddStockItemModal}
                                >
                                    إضافة صنف جديد
                                </a>
                            </div>
                            <div>
                                <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                    <button
                                        type='submit'
                                        className='button mt-3'
                                        onClick={addStock}>
                                        إضافة
                                    </button>
                                </div>
                            </div>
                        </form >
                    </div >
                )}
                {showAddStockItemModal && (
                    <div className="AddStockItem container d-flex flex-column col-12 m-auto">
                        {addStockItemSuccess &&
                            <div className="alert alert-success mb-4">
                                {addStockItemSuccess}
                            </div>}
                        {addStockItemFail &&
                            <div className="alert alert-danger mb-4">
                                {addStockItemFail}
                            </div>}
                        <form className='inputs container d-flex flex-column row-gap-1 px-3'>
                            <div className="d-flex flex-wrap justify-content-start row-gap-1 column-gap-3">
                                <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                    <label className='text-black fs-4 fw-500 align-self-start'>
                                        اسم الصنف <span className='text-danger'>*</span>
                                    </label>
                                    <div>
                                        <input
                                            type='text'
                                            className={`form-control ${isStockItemEmpty ? 'is-invalid' : ''}`}
                                            placeholder='مثال: قميص - عدس'
                                            onChange={handleStockItemChange}
                                        />
                                        {isStockItemEmpty &&
                                            <div className='invalid-feedback'>
                                                الرجاء إدخال اسم الصنف
                                            </div>}
                                    </div>
                                </div>
                                <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                    <label className='text-black fs-4 fw-500 align-self-start'>
                                        نوع الصنف <span className='text-danger'>*</span>
                                    </label>
                                    <div>
                                        <select
                                            className={`form-control ${isStockTypeEmpty ? 'is-invalid' : ''}`}
                                            onChange={handleStockTypeChange}
                                        >
                                            <option value=''>اختر نوع الصنف</option>
                                            {stockTypes.map((type) => (
                                                <option value={type.TypeName}>{type.TypeName}</option>))}
                                        </select>
                                        {isStockTypeEmpty &&
                                            <div className='invalid-feedback'>
                                                الرجاء إدخال نوع الصنف
                                            </div>}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-start row-gap-1 column-gap-3">
                                <a
                                    className="d-flex flex-row justify-content-center text-decoration-none text-brown-500 fs- my-2 fw-500"
                                    style={{ cursor: "pointer" }}
                                    onClick={openAddStocktypeModal}
                                >
                                    إضافة نوع أصناف جديد
                                </a>
                            </div>
                            <div>
                                <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                    <button
                                        type='submit'
                                        className='button'
                                        onClick={addStockItem}
                                    >
                                        إضافة
                                    </button>
                                </div>
                            </div>
                        </form >
                    </div >
                )}
                {showAddStockTypeModal && (
                    <div className="AddStockType container d-flex flex-column col-12 m-auto">
                        {addStockTypeSuccess &&
                            <div className="alert alert-success mb-4">
                                {addStockTypeSuccess}
                            </div>}
                        {addStockTypeFail &&
                            <div className="alert alert-danger mb-4">
                                {addStockTypeFail}
                            </div>}
                        <form className='inputs container d-flex flex-column row-gap-1 px-3'>
                            <div className="d-flex flex-wrap justify-content-start row-gap-1 column-gap-3">
                                <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                    <label className='text-black fs-4 fw-500 align-self-start'>
                                        نوع الأصناف <span className='text-danger'>*</span>
                                    </label>
                                    <div>
                                        <input
                                            type='text'
                                            className={`form-control ${isStockTypeEmpty ? 'is-invalid' : ''}`}
                                            placeholder='مثال: ملابس'
                                            onChange={handleStockTypeChange}
                                        />
                                        {isStockTypeEmpty &&
                                            <div className='invalid-feedback'>
                                                الرجاء إدخال نوع الأصناف الجديد
                                            </div>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                    <button
                                        type='submit'
                                        className='button mt-3'
                                        onClick={addStockType}
                                    >
                                        إضافة
                                    </button>
                                </div>
                            </div>
                        </form >
                    </div >
                )}
            </Modal.Body>
        </Modal>
    )
}

export default AddStock;
