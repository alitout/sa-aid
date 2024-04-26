import React from 'react'
import Navbar from '../Components/HomePage/navbar';
import HeroSection from '../Components/HomePage/heroSection';
import ObjectivesSection from '../Components/HomePage/objectivesSection';

function homePage() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <ObjectivesSection />
        </div>
    )
}

export default homePage;
