import React, { useState } from 'react';
import '../../style/main.scss';

const SearchBar = ({ onSearchChange }) => {


    return (
        <div className="search-bar">
            <form>
                <div className="input-group w-100">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="ابحث..."
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </form>
        </div>

    );
};

export default SearchBar;
