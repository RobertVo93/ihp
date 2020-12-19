import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Button } from "reactstrap";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import SweetAlert from "react-bootstrap-sweetalert";

import userActions from 'redux/account/actions';
import auActions from 'redux/auth/actions';
import { useDispatch, useSelector } from "react-redux";
import AccountManagementNewModal from "./AccountManagementNewModal";

const { suspendUser } = userActions;
const { sendResetPassword } = auActions;

const HeaderComponent = props => {
    let classes = {
        "my-2": true,
        "mx-3": true,
        "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
        "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
    };
    return <div className={classnames(classes)}>{props.title}</div>;
};

const AccountManagementTable = (props) => {
    const [tableData, setTableData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [viewMode, setViewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [createMode, setCreateMode] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertReset, setAlertReset] = useState(false);

    useEffect(() => {
        //update the data
        setTableData(props.tData);
    }, [props.tData]);


    const authData = {
        accessToken: useSelector(state => state.auth.accessToken)
    }
    const dispatch = useDispatch()


    const columns = useMemo(
        () => [
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="UserID"
                        />
                    );
                },
                placeholder: "Index",
                accessor: "UserID",
                disableFilters: true
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Email"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "Email",
                accessor: "Email"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Username"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "Username",
                accessor: "Username"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Role Id"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "Role Id",
                accessor: "RoleID"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Main Color"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "mainColor",
                accessor: "mainColor"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Action"
                        />
                    );
                },
                accessor: "id",
                disableSortBy: true,
                disableFilters: true,
                Cell: tableInstance => {
                    return (
                        <div className="react-action-class wide-cell">
                            <button
                                className="react-table-view-button"
                                onClick={() => viewClick(tableInstance.row.original)}
                            >
                                <i className="fas fa-eye" />
                            </button>
                            <button
                                className="react-table-edit-button"
                                onClick={() => editClick(tableInstance.row.original)}
                            >
                                <i className="fas fa-edit" />
                            </button>
                            <button
                                className="react-table-suspend-button"
                                onClick={() => suspendClick(tableInstance.row.original)}
                            >
                                <i className="fas fa-user-alt-slash" />
                            </button>
                            <button
                                className="react-table-reset-button"
                                onClick={() => resetPwClick(tableInstance.row.original)}
                            >
                                <i className="fas fa-key" />
                            </button>
                        </div>
                    );
                }
            }
        ],
        []
    );

    const viewClick = data => {
        // Here you can view the data and make forward action for view data
        setSelectedUser(data)
        setViewMode(true)
    };


    const editClick = data => {
        // Here you can view the data and make forward action for edit data
        setSelectedUser(data)
        setEditMode(true)
    };

    const suspendClick = data => {
        // Here you can view the data and make forward action for suspend data
        setSelectedUser(data)
        setAlert(true)
    };

    const resetPwClick = data => {
        // Here you can view the data and make forward action for reset password data
        setSelectedUser(data)
        setAlertReset(true)
    };

    // close modal
    const closeCallback = () => {
        setSelectedUser(null);
        setViewMode(false);
        setEditMode(false);
        setCreateMode(false);
    }

    // hide modal
    const hideAlert = () => {
        setAlert(false)
        setSelectedUser(null)
    };

    const hideAlertReset = () => {
        setAlertReset(false)
        setSelectedUser(null)
    }

    // hide suspend modal
    const onCancel = () => {
        hideAlert()
    }

    // hide reset modal
    const onCancelReset = () => {
        hideAlertReset()
    }

    // confirm suspend user
    const onConfirm = () => {
        dispatch(suspendUser(authData, { UserID: selectedUser.UserID }))
        hideAlert()
    }

    // confirm send reset password
    const onConfirmSendResetPassword = () => {
        dispatch(sendResetPassword({ Username: selectedUser.Username }))
        hideAlertReset()
    }

    /**
     * Action: Create new Account
     */
    const createNew = () => {
        //Show modal
        setCreateMode(true);
    };

    const {
        getTableProps,
        getTableBodyProps,
        prepareRow,
        page,
        headerGroups,
        pageCount,
        gotoPage,
        state: { pageIndex }
    } = useTable(
        {
            data: tableData,
            columns: columns,
            initialState: {
                pageSize: 5,
                pageIndex: 0
            }
        },
        useFilters,
        useSortBy,
        usePagination
    );

    return (
        <>
            {alert && (
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Yes, Suspend it!"
                    confirmBtnBsStyle="danger"
                    title={`Are you sure to suspend this account? - UserID: ${selectedUser.UserID}`}
                    focusCancelBtn
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                >
                </SweetAlert>
            )}
            {alertReset && (
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Yes, Send it!"
                    confirmBtnBsStyle="warning"
                    title={`Are you sure to reset password?`}
                    focusCancelBtn
                    onConfirm={onConfirmSendResetPassword}
                    onCancel={onCancelReset}
                >
                    An email will be sent to your email: {selectedUser.Username}
                </SweetAlert>
            )}
            {
                !alert && !alertReset && selectedUser &&
                <AccountManagementNewModal
                    viewMode={viewMode}
                    selectedUser={selectedUser}
                    callbackClose={closeCallback} />
            }
            {
                createMode &&
                <AccountManagementNewModal
                    viewMode={false}
                    callbackClose={closeCallback} />
            }

            <ReactTableWrapper {...props}>
                <div className="roe-card-style mt-15 mb-30">
                    <div className="roe-card-header">
                        <div className="row header-container">
                            <div className="float-left">
                                <p className="card-main-header">User Info</p>
                                <p className="card-sub-header">Overview of all time</p>
                            </div>
                            <div className="float-right">
                                <Button onClick={() => createNew()} className="success" size="sm ml-10">Add User</Button>
                            </div>
                        </div>
                    </div>
                    <div className="table-container text-center overflow-auto">
                        <table
                            border={1}
                            className="custom-react-table-theme-class"
                            {...getTableProps()}
                        >
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(header => (
                                            <th
                                                {...header.getHeaderProps(header.getSortByToggleProps())}
                                            >
                                                <div>{header.render("Header")}</div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(header => {
                                            return (
                                                <td
                                                    {...header.getHeaderProps(
                                                        header.getSortByToggleProps()
                                                    )}
                                                >
                                                    <div>
                                                        {header.canFilter ? header.render("Filter") : null}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                                {page.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => (
                                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        onPageChange={gotoPage}
                        pages={pageCount}
                        page={pageIndex}
                    />
                </div>
            </ReactTableWrapper>
        </>

    )
}

const FilterComponent = tableInstance => {
    const { filterValue, setFilter } = tableInstance.column;
    return (
        <input
            type="text"
            value={filterValue || ""}
            onChange={e => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            className="tabl-search react-form-input"
            placeholder={`Search ${tableInstance.column.placeholder}`}
            onClick={e => e.stopPropagation()}
        />
    );
};

export default AccountManagementTable
