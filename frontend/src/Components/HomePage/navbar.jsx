import React, { useRef } from 'react';
import '../../style/main.scss';
import Logo from '../Logo/Logo';

function Navbar() {

    const topRef = useRef(null);
    const scrollToTop = () => {
        topRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToSection = (section) => {
        const element = document.getElementById(section);
        element.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className='px-0'>
            <nav className='navbar fixed-top d-sm-flex align-items-center justify-content-center justify-content-sm-between border-bottom gap-2 py-2 px-5'>
                <div className="container justify-content-center justify-content-sm-between">
                    <div className="logo col-md-2" id="logo" style={{ cursor: 'pointer' }} onClick={scrollToTop}>
                        <Logo />
                    </div>
                    <div className='navLinks d-none d-md-flex flex-row gap-3 col-6 justify-content-center align-items-center '>
                        <a className='navLink d-none d-sm-flex col-3 col-lg-2 justify-content-center text-center text-decoration-none text-black fw-500 py-4'
                            onClick={() => scrollToSection('objectives')} style={{ cursor: 'pointer' }}>
                            أهدافنا
                        </a>
                        <a className='navLink d-none d-sm-flex col-3 col-lg-2 justify-content-center text-center text-decoration-none text-black fw-500 py-4'
                            onClick={() => scrollToSection('security')} style={{ cursor: 'pointer' }}>
                            الحماية
                        </a>
                        <a className='navLink d-none d-sm-flex col-3 col-lg-2 justify-content-center text-center text-decoration-none text-black fw-500 p-4'
                            onClick={() => scrollToSection('advantages')} style={{ cursor: 'pointer' }}>
                            المميزات
                        </a>
                    </div>
                    <div className="col-sm-2 d-flex justify-content-center">
                        <button className='button d-none d-sm-flex'>تسجيل الدخول</button>
                    </div>
                </div>
            </nav>
            <div ref={topRef} style={{ position: 'absolute', top: 0 }}></div>
        </div>
    )
}

export default Navbar;
