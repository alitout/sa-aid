import React, { useState } from 'react';
import '../../style/main.scss';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle search here
        console.log(`Search term: ${searchTerm}`);
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <div className="input-group w-100">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="ابحث..."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </div>

    );
};

export default SearchBar;
