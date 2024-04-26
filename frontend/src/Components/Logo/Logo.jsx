import React from 'react';
import logo from '../../assets/logo.svg';

function Logo() {
    return (
        <div className="logo d-flex flex-row align-items-center justify-content-center gap-3 flex-nowrap" style={{minWidth: '10rem'}}>
            <img src={logo} alt="SA-AID icon" style={{maxWidth: '3.5rem'}}/>
            <div className="name d-flex flex-column fs-1_25 fw-500 text-black text-nowrap">
                <div className='border-bottom border-dark-subtle'>
                    ساعد
                </div>
                <div>
                    SA-AID
                </div>
            </div>
        </div>
    )
}

export default Logo;
