import React from 'react'
import Navbar from '../Components/HomePage/navbar';
import HeroSection from '../Components/HomePage/heroSection';
import ObjectivesSection from '../Components/HomePage/objectivesSection';
import SecuritySection from '../Components/HomePage/securitySection';
import Footer from '../Components/HomePage/footer';

function homePage() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <ObjectivesSection />
            <SecuritySection />
            <Footer />
        </div>
    )
}

export default homePage;
