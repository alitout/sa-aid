import React from 'react'
import Navbar from '../Components/HomePage/navbar';
import HeroSection from '../Components/HomePage/heroSection';
import ObjectivesSection from '../Components/HomePage/objectivesSection';
import SecuritySection from '../Components/HomePage/securitySection';

function homePage() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <ObjectivesSection />
            <SecuritySection />
        </div>
    )
}

export default homePage;
