import React, { useEffect, useMemo, useState } from 'react';
import { AccessDenied } from '../../Routes/Routes';
import SearchBar from './searchBar';
import axios from 'axios';
import { ORG_GETALLUSERS } from '../../externalApi/ExternalUrls';
import userFields from '../../fields/users.json';
import { useTable, useFilters } from 'react-table';

import FilterLines from '@untitled-ui/icons-react/build/cjs/FilterLines';
import UserPlus01 from '@untitled-ui/icons-react/build/cjs/UserPlus01';
import UsersX from '@untitled-ui/icons-react/build/cjs/UsersX';
import { Navigate } from 'react-router-dom';


function Users() {
    const bearerToken = localStorage.getItem('bearerToken');
    const auth = `Bearer ${bearerToken}`;
    const userType = localStorage.getItem('userType');
    const userRole = localStorage.getItem('userRole');

    // State variables
    const [isOrganization, setIsOrganization] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isDistributionsAdmin, setIsDistributionsAdmin] = useState(false);
    const [isBeneciariesAdmin, setIsBeneciariesAdmin] = useState(false);
    const [isNotAdmin, setIsNotAdmin] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [filtersVisibility, setFiltersVisibility] = useState({});
    const [users, setUsers] = useState([]);
    const [noUsers, setNoUsers] = useState(false);
    const [columns, setColumns] = useState([]);
    const [validKeys, setValidKeys] = useState([]);

    // Function to toggle the visibility of the filters in the table
    const toggleFilters = () => {
        setShowFilters(!showFilters);
        setFiltersVisibility({}); // Reset all filters visibility
        setAllFilters([]); // Reset all filters
    };

    // Function to toggle the visibility of the filters in the table in a specific column
    const toggleColumnFilter = (columnId) => {
        if (filtersVisibility[columnId]) { // Check if the clicked column is already open
            setFiltersVisibility(prevState => ({ // If it's open, close it
                ...prevState,
                [columnId]: false
            }));
        } else {
            setFiltersVisibility(prevState => { // If it's closed, open it and close any other open filter
                const newState = { ...prevState };
                Object.keys(newState).forEach(key => {
                    if (key !== columnId && newState[key]) {
                        newState[key] = false;
                    }
                });
                newState[columnId] = true;
                return newState;
            });
        }
    };

    // Default filter component for a column in the table
    const DefaultColumnFilter = ({ column: { filterValue, setFilter }, visible }) => {
        const handleInputChange = (e) => {
            setFilter(e.target.value || undefined);
        };

        const resetFilter = () => {
            setFilter(undefined);
        };

        return (
            <div className="filter">
                {visible && (
                    <input
                        value={filterValue || ''}
                        onChange={handleInputChange}
                        placeholder={`اكتب المحتوى للبحث...`}
                    />
                )}
                <button onClick={toggleColumnFilter}> {/* Toggle the visibility of the input field when the OK button is clicked */}
                    {visible ? 'OK' : ''}
                </button>
                <button onClick={() => { resetFilter(); toggleColumnFilter(); }}> {/* Keep the Reset Filters button */}
                    Reset Filter
                </button>
            </div>
        );
    };

    const resetFilter = () => {
        // Call of the resetFilter function passed from the child component
        this.props.onResetFilter();
    };
    <DefaultColumnFilter onResetFilter={resetFilter} />

    useEffect(() => {
        if (userType === 'Organization') {
            setIsOrganization(true);
            setIsUser(false);
        } else if (userType === 'User') {
            setIsUser(true);
            setIsOrganization(false);

            if (userRole === 'Distributions admin') {
                setIsDistributionsAdmin(true);
                setIsBeneciariesAdmin(false);
                setIsNotAdmin(false);
            } else if (userRole === 'Beneciaries admin') {
                setIsBeneciariesAdmin(true);
                setIsDistributionsAdmin(false);
                setIsNotAdmin(false);
            } else {
                setIsNotAdmin(true);
                setIsDistributionsAdmin(false);
                setIsBeneciariesAdmin(false);
            }
        }
        const getUsers = async () => {
            try {
                const response = await axios.get(ORG_GETALLUSERS, {
                    headers: {
                        'Authorization': auth
                    }
                });
                if (response.data.length === 0) {
                    setNoUsers(true);
                } else {
                    setUsers(response.data);
                    setNoUsers(false);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getUsers();
    }, [auth, userRole, userType]);


    useEffect(() => {
        if (users.length > 0) {
            const validKeys = Object.keys(users[0]).filter(key => userFields.hasOwnProperty(key));
            setValidKeys(validKeys);
            const mappedColumns = validKeys.map(key => ({
                Header: userFields[key],
                accessor: key,
                Filter: DefaultColumnFilter,
            }));

            setColumns(mappedColumns);
        }
    }, [users]);

    // create the table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        getVisibleColumns,
        setAllFilters,
    } = useTable({ columns, data: users }, useFilters);


    if (isOrganization || (isUser && isDistributionsAdmin)) {
        return (
            <div className='d-flex flex-column w-100' style={{ maxHeight: '95vh' }}>
                <div className="header d-flex flex-row w-100 justify-content-between gap-3">
                    <div className="title fs-3 fw-700">
                        إدارة المستخدمين
                    </div>
                    {isOrganization &&
                        <div className="action">
                            <button className="button d-none d-sm-flex gap-2">
                                <UserPlus01 />
                                إضافة مستخدم
                            </button>
                            <button className="button d-sm-none"><UserPlus01 /></button>
                        </div>
                    }
                </div>
                <div className="subHeader d-flex align-items-center justify-content-center w-100 py-0_75 gap-3">
                    <div className="subTitle fs-5 fw-500 d-none d-md-block ms-auto">
                        {isOrganization &&
                            <span>أضف و</span>}
                        راقب ونظم حركة المستخدمين
                    </div>
                    <div className='Search d-flex gap-3'>
                        <div className="searchBar">
                            <SearchBar onSearchChange={setSearchInput} />
                        </div>
                        <button
                            className={`filterIcon d-flex justify-content-center align-items-center border rounded p-2 ${showFilters ? 'bg-green-500 text-white' : 'bg-white'}`}
                            onClick={toggleFilters}
                        >
                            <FilterLines />
                        </button>
                    </div>
                </div>
                {!noUsers ? (
                    <div className="table-responsive border rounded flex-fill" style={{ overflowY: 'auto' }}>
                        <table {...getTableProps()} className="table">
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()}>
                                                <div className='filterIcon bg-white d-inline'>
                                                    {column.render('Header')}
                                                    {showFilters &&
                                                        <>
                                                            <FilterLines className={`me-2 ${column.filterValue ? 'active-filter-icon text-green-500' : ''}`} style={{ width: '1rem' }} onClick={() => toggleColumnFilter(column.id)} />
                                                            {filtersVisibility[column.id] && // Check visibility state here
                                                                <div>
                                                                    {column.canFilter ? column.render('Filter', { visible: true }) : null}
                                                                </div>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.filter(row => {
                                    const user = row.original;
                                    const includesSearch = Object.values(user)
                                        .filter((_, index) => validKeys.includes(Object.keys(user)[index]))
                                        .some(value => String(value).toLowerCase().includes(searchInput.toLowerCase()));

                                    return includesSearch;
                                }).map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                if (cell.column.id === 'isHeadOfDistribution') {
                                                    return <td {...cell.getCellProps()}>{cell.value ? "نعم" : "لا"}</td>;
                                                } else if (cell.column.id === 'UserDOB') {
                                                    return <td {...cell.getCellProps()}>{new Date(cell.value).toLocaleDateString()}</td>;
                                                }
                                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center flex-fill mt-5 mt-md-1">
                        <div className="text-center">
                            <UsersX />
                            <div className="fs-4 fw-500">لا يوجد مستخدمين</div>
                            {isOrganization && (
                                <div className='d-flex flex-column align-items-center gap-2'>
                                    <div className="fs-5 fw-400">يبدو أنك لم تقم بإضافة مستخدمين بعد</div>
                                    <button className="button d-flex gap-2">
                                        <UserPlus01 />
                                        إضافة مستخدم
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }
    else {
        return (
            <AccessDenied />
        )
    }
}

export default Users;
