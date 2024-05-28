import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PhoneInput from 'react-phone-number-input'
import { ORG_UPDATEUSERBYID, UPDATESTOCKBYID } from '../../../../externalApi/ExternalUrls';
import { globalVariables } from '../../../../Global/globalVariables';
import axios from 'axios';

const EditStock = ({ show, handleClose, stockData, onSave, auth, stockItems, stockTypes }) => {

    const allCountryCodes = globalVariables.allCountryCodes;

    // State variables
    const [stockItem, setStockItem] = useState(stockData.StockItem);
    const [isStockItemEmpty, setIsStockItemEmpty] = useState(false);
    const [quantity, setQuantity] = useState(stockData.Quantity);
    const [isQuantityEmpty, setIsQuantityEmpty] = useState(false);
    const [expiryDate, setExpiryDate] = useState(new Date(stockData.ExpiryDate).toISOString().split('T')[0]);
    const [isExpiryDate, setIsExpiryDate] = useState(false);
    const [editStockSuccess, setEditStockSuccess] = useState();
    const [editStockFail, setEditStockFail] = useState();

    // Handle stock item change
    const handleStockItemChange = (e) => {
        setStockItem(e.target.value);
    }

    // Handle quantity change
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }

    // Handle expiry date change
    const handleExpiryDateChange = (e) => {
        setExpiryDate(e.target.value);
    }

    // edit stock
    const editStock = async (e) => {
        e.preventDefault();

        const isStockItemEmpty = stockItem === '';
        const isQuantityEmpty = quantity === '';
        const isExpiryDateEmpty = expiryDate === '';

        setIsStockItemEmpty(isStockItemEmpty);
        setIsQuantityEmpty(isQuantityEmpty);
        setIsExpiryDate(isExpiryDateEmpty);

        if (!isStockItemEmpty && !isQuantityEmpty && !isExpiryDateEmpty) {
            const editStockRequest = {
                "StockItem": stockItem,
                "Quantity": quantity,
                "ExpiryDate": expiryDate
            }

            try {
                const response = await axios.patch(`${UPDATESTOCKBYID}${stockData._id}`, editStockRequest, {
                    headers: {
                        "Authorization": auth,
                    }
                });
                setEditStockFail(null)
                console.log(response.data);
                setEditStockSuccess(response.data.msg);
                setTimeout(() => {
                    onSave(editStockRequest);
                }, 3000);
            }
            catch (error) {
                console.error(error);
                setEditStockSuccess(null)
                setEditStockFail(error.response.data.message);
            }
        };
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className="AddStock container d-flex flex-column col-12 m-auto">
                    {editStockSuccess &&
                        <div className="alert alert-success mb-4">
                            {editStockSuccess}
                        </div>}
                    {editStockFail &&
                        <div className="alert alert-danger mb-4">
                            {editStockFail}
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
                                        value={stockItem}
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
                                        value={quantity}
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
                                        value={expiryDate}
                                    />
                                    {isExpiryDate &&
                                        <div className='invalid-feedback'>
                                            تاريخ انتهاء الصلاحية مطلوب
                                        </div>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='input input-code d-flex flex-column mb-1_25 gap-2 col-12 col-sm-4 flex-fill'>
                                <button
                                    type='submit'
                                    className='button mt-3'
                                    onClick={editStock}>
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

export default EditStock;
