import React, { useEffect, useMemo, useState } from 'react';
import { AccessDenied } from '../../../../Routes/Routes';
import SearchBar from '../../searchBar';
import axios from 'axios';
import { GETALLBENEFICIARIES, GETBENEFICIARYBYID, DELETEBENEFICIARYBYID } from '../../../../externalApi/ExternalUrls';
import beneficiaryFields from '../../../../fields/beneficiary.json';
import { useTable, useFilters } from 'react-table';
import Modal from 'react-bootstrap/Modal';
import AddBeneficiaries from './addBeneficiary';
import EditBeneficiary from './editBeneficiary';
import { useNavigate } from 'react-router-dom';


import FilterLines from '@untitled-ui/icons-react/build/cjs/FilterLines';
import UserPlus01 from '@untitled-ui/icons-react/build/cjs/UserPlus01';
import UsersX from '@untitled-ui/icons-react/build/cjs/UsersX';
import Edit05 from '@untitled-ui/icons-react/build/cjs/Edit05';
import Trash03 from '@untitled-ui/icons-react/build/cjs/Trash03';


function Beneficiaries() {
    const navigate = useNavigate();
    const bearerToken = localStorage.getItem('bearerToken');
    const auth = `Bearer ${bearerToken}`;
    const userType = localStorage.getItem('userType');
    const userRole = localStorage.getItem('userRole');

    // State variables
    const [isOrganization, setIsOrganization] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isDistributionsAdmin, setIsDistributionsAdmin] = useState(false);
    const [isBeneficiariesAdmin, setIsBeneficiariesAdmin] = useState(false);
    const [isNotAdmin, setIsNotAdmin] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [filtersVisibility, setFiltersVisibility] = useState({});
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [noBeneficiaries, setNoBeneficiaries] = useState(true);
    const [columns, setColumns] = useState([]);
    const [validKeys, setValidKeys] = useState([]);
    // const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBeneficiaryData, setSelectedBeneficiaryData] = useState({});

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
                <button className='button p-1 px-2 m-1' onClick={toggleColumnFilter}> {/* Toggle the visibility of the input field when the OK button is clicked */}
                    {visible ? 'OK' : ''}
                </button>
                <button className='button p-1 px-2 m-1' onClick={() => { resetFilter(); toggleColumnFilter(); }}> {/* Keep the Reset Filters button */}
                    إلغاء
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
                setIsBeneficiariesAdmin(false);
                setIsNotAdmin(false);
            } else if (userRole === 'Beneficiaries admin') {
                setIsBeneficiariesAdmin(true);
                setIsDistributionsAdmin(false);
                setIsNotAdmin(false);
            } else {
                setIsNotAdmin(true);
                setIsDistributionsAdmin(false);
                setIsBeneficiariesAdmin(false);
            }
        }
        const getBeneficiaries = async () => {
            try {
                const response = await axios.get(GETALLBENEFICIARIES, {
                    headers: {
                        'Authorization': auth
                    }
                });
                if (response.data.length === 0) {
                    setNoBeneficiaries(true);
                } else {
                    setBeneficiaries(response.data);
                    setNoBeneficiaries(false);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getBeneficiaries();
    }, [auth, userRole, userType]);



    useEffect(() => {
        if (beneficiaries.length > 0) {
            const validKeys = Object.keys(beneficiaries[0]).filter(key => beneficiaryFields.hasOwnProperty(key));
            setValidKeys(validKeys);
            const mappedColumns = validKeys.map(key => ({
                Header: beneficiaryFields[key],
                accessor: key,
                Filter: DefaultColumnFilter,
            }));

            if (isBeneficiariesAdmin) {
                // Adding action columns for Edit and Delete
                mappedColumns.push({
                    id: 'actions',
                    Cell: ({ row }) => (
                        <div>
                            <Edit05 onClick={() => handleEdit(row.cells[0].value)} className='mx-2' style={{ cursor: 'pointer' }} />
                            <Trash03 onClick={() => handleDelete(row.cells[0].value)} className='mx-2' style={{ cursor: 'pointer' }} />
                        </div>
                    ),
                });
            }
            setColumns(mappedColumns);
        }
    }, [beneficiaries]);

    const handleEdit = async (BeneficiaryID) => {
        try {
            const response = await axios.get(`${GETBENEFICIARYBYID}${BeneficiaryID}`, {
                headers: {
                    'Authorization': auth
                }
            });
            console.log(response.data);
            setSelectedBeneficiaryData(response.data);
            setShowEditModal(true);
        } catch (error) {
            console.error("Failed to find beneficiary:", error);
        }
    };

    const handleDelete = async (BeneficiaryID) => {
        try {
            const response = await axios.get(`${GETBENEFICIARYBYID}${BeneficiaryID}`, {
                headers: {
                    'Authorization': auth
                }
            });
            setSelectedBeneficiaryData(response.data);
            setShowDeleteModal(true);
        } catch (error) {
            console.error("Failed to find beneficiary:", error);
        }
    };

    const handleConfirmDelete = async (BeneficiaryID) => {
        try {
            const response = await axios.delete(`${DELETEBENEFICIARYBYID}${BeneficiaryID}`, {
                headers: {
                    'Authorization': auth
                }
            });
            window.location.reload();
            setShowDeleteModal(false); // Close the confirmation modal
        } catch (error) {
            console.error("Failed to delete beneficiary:", error);
            setShowDeleteModal(false); // Ensure the modal is closed even if the delete fails
        }
    };

    const navigateToFamilies = () => {
        navigate('/dashboard/families');
    };


    // create the table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        getVisibleColumns,
        setAllFilters,
    } = useTable({ columns, data: beneficiaries }, useFilters);

    if (isOrganization || (isUser && isDistributionsAdmin) || (isUser && isBeneficiariesAdmin)) {
        return (
            <div className="">
                <div className='d-flex flex-column w-100' style={{ maxHeight: '95vh' }}>
                    <>
                        <div className="header d-flex flex-row w-100 justify-content-between gap-3">
                            <div className="title fs-3 fw-700">
                                إدارة المستفيدين
                            </div>
                            {isBeneficiariesAdmin &&
                                <div className="action">
                                    <button className="button d-none d-sm-flex gap-2" onClick={() => navigateToFamilies()}>
                                        <UserPlus01 />
                                        إضافة مستفيد
                                    </button>
                                    <button className="button d-sm-none" onClick={() => navigateToFamilies()}>
                                        <UserPlus01 />
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="subHeader d-flex align-items-center justify-content-center w-100 py-0_75 gap-3">
                            <div className="subTitle fs-5 fw-500 d-none d-md-block ms-auto">
                                {isBeneficiariesAdmin &&
                                    <span>أضف و</span>}
                                راقب ونظم حركة المستفيدين
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
                        {noBeneficiaries ? (
                            <div className="d-flex justify-content-center align-items-center flex-fill mt-5 mt-md-1">
                                <div className="text-center">
                                    <UsersX />
                                    <div className="fs-4 fw-500">لا يوجد مستفيدين</div>
                                    {isBeneficiariesAdmin && (
                                        <div className='d-flex flex-column align-items-center gap-2'>
                                            <div className="fs-5 fw-400">يبدو أنك لم تقم بإضافة مستفيدين بعد</div>
                                            <div className="fs-5 fw-400">لإضافة مستفيد، عليك الضغط على زر الإضافة في العائلة التي سينتمي إليها هذا المستفيد</div>
                                            <button className="button d-flex gap-2" onClick={() => navigateToFamilies()}>
                                                <UserPlus01 />
                                                إضافة مستفيد
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
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
                                            const beneficiary = row.original;
                                            const includesSearch = Object.values(beneficiary)
                                                .filter((_, index) => validKeys.includes(Object.keys(beneficiary)[index]))
                                                .some(value => String(value).toLowerCase().includes(searchInput.toLowerCase()));

                                            return includesSearch;
                                        }).map((row, i) => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map(cell => {
                                                        if (cell.column.id === 'isHeadOfFamily' || cell.column.id === 'isBeneficiaryActive') {
                                                            return <td {...cell.getCellProps()}>{cell.value ? "نعم" : "لا"}</td>;
                                                        } else if (cell.column.id === 'BeneficiaryDOB') {
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
                        )}
                    </>
                </div>
                {/* {isBeneficiariesAdmin && showAddModal && (
                    <AddBeneficiaries
                        show={showAddModal}
                        handleClose={() => setShowAddModal(false)}
                        onSave={() => {
                            setShowAddModal(false);
                            window.location.reload();
                        }}
                        auth={auth}
                    />
                )} */}
                {isBeneficiariesAdmin && showEditModal && (
                    <EditBeneficiary
                        show={showEditModal}
                        handleClose={() => setShowEditModal(false)}
                        beneficiaryData={selectedBeneficiaryData}
                        onSave={(updatedData) => {
                            // Handle saving the updated user data
                            console.log(updatedData);
                            setShowEditModal(false);
                            window.location.reload();
                        }}
                        auth={auth}
                    />
                    
                )}
                {isBeneficiariesAdmin && showDeleteModal && (
                    <Modal
                        show={showDeleteModal}
                        onHide={() => setShowDeleteModal(false)}
                    >
                        <Modal.Header closeButton />
                        <Modal.Body>
                            <div>
                                تأكيد إلغاء المستفيد {selectedBeneficiaryData.BeneficiaryFName + ' ' + selectedBeneficiaryData.BeneficiaryFatherName + ' ' + selectedBeneficiaryData.BeneficiaryLName}
                            </div>
                            <div className="alert alert-danger">
                                لا يمكن التراجع عن هذه الخطوة
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={() => setShowDeleteModal(false)} className='button'>رجوع</button>
                            <button onClick={() => handleConfirmDelete(selectedBeneficiaryData.BeneficiaryID)} className='button'>تأكيد</button>
                        </Modal.Footer>
                    </Modal>
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

export default Beneficiaries;
