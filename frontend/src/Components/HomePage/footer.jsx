import React from 'react'
import Logo from '../Logo/Logo';

function Footer() {
    return (
        <div className='container d-flex justify-content-evenly align-items-center text-center text-decoration-none text-black fw-500 p-2 m-auto'>
            <div  className='d-none d-md-inline'>
                <Logo />
            </div>
            <div className='d-flex flex-column'>
                <div>
                    جميع الحقوق محفوظة
                </div>
                <div>
                    © 2024
                </div>
            </div>
        </div>
    )
}

export default Footer;
