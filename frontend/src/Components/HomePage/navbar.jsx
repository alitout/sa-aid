import React from 'react';
import '../../style/main.scss';
import Logo from '../Logo/Logo';

function Navbar() {
    return (
        <div className='px-0'>
            <nav className='navbar fixed-top d-sm-flex align-items-center justify-content-center justify-content-sm-between border-bottom gap-2 py-2 px-5'>
                <div className="container">
                    <div className="logo col-md-2">
                        <Logo />
                    </div>
                    <div className='navLinks d-none d-md-flex flex-row gap-3 col-6 justify-content-center align-items-center '>
                        <a href='#' className='navLink d-none d-sm-flex col-3 col-lg-2 justify-content-center text-center text-decoration-none text-black fw-500 py-4'>
                            أهدافنا
                        </a>
                        <a href='#' className='navLink d-none d-sm-flex col-3 col-lg-2 justify-content-center text-center text-decoration-none text-black fw-500 py-4'>
                            الحماية
                        </a>
                        <a href='#' className='navLink d-none d-sm-flex col-3 col-lg-2 justify-content-center text-center text-decoration-none text-black fw-500 p-4'>
                            المميزات
                        </a>
                    </div>
                    <div className="col-sm-2 d-flex justify-content-center">
                        <button className='button d-none d-sm-flex'>تسجيل الدخول</button>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar;
