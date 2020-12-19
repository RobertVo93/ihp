import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import SweetAlert from 'react-bootstrap-sweetalert';
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import alertEscalateActions from "redux/alertescalations/actions";
import AlertEscalationModal from "./AlertEscalationModal";
import { FormConfig } from "components/forms/dynamicform";
import { getDisplayValueOfSelectedKey } from "helper/methods";
const { getUserAlertEscalations, deleteAlertEscalation } = alertEscalateActions;

const HeaderComponent = props => {
    let classes = {
        "my-2": true,
        "mx-3": true,
        "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
        "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
    };
    return <div className={classnames(classes)}>{props.title}</div>;
};

const AlertEscalations = props => {
    const formConfig = new FormConfig();
    const [tableData, setTableData] = useState([]);
    const [escalationId, setEscalation] = useState(-1);
    const [showDeleteConfirmation, setDeleteConfirmation] = useState(false);
    const [showError, setShowError] = useState(false);
    const [deletedRecord, setDeletedRecord] = useState(null);

    /**
     * ComponentDidMount
     */
    useEffect(() => {
        //update the data
        props.getUserAlertEscalations(props.authData, props.authData.userID);
    }, []);

    /**
     * ComponentDidUpdate: watch props.amData.alertEscalations
     */
    useEffect(() => {
        if (props.amData.alertEscalations == null)
            return;
        //convert the response data to table data
        let newTableData = [];
        for (var i = 0; i < props.amData.alertEscalations.length; i++) {
            //traverse through all alerts and convert to data table
            newTableData.push({
                ID: props.amData.alertEscalations[i].ID,
                no: i + 1,
                alertWhen: getDisplayValueOfSelectedKey(props.amData.alertEscalations[i].AlertWhen, formConfig.options.alertWhen),
                specificCompany: props.amData.alertEscalations[i].SpecificCompany,
                specificMember: props.amData.alertEscalations[i].SpecificMember,
                exceeds: props.amData.alertEscalations[i].Exceeds,
                worthOf: getDisplayValueOfSelectedKey(props.amData.alertEscalations[i].WorthOf, formConfig.options.worthOf),
                ina: getDisplayValueOfSelectedKey(props.amData.alertEscalations[i].InA, formConfig.options.ina),
                noMatchingClaims: props.amData.alertEscalations[i].NoMatchingClaims
            });
        }
        setTableData(newTableData);
    }, [props.amData.alertEscalations]);

    /**
     * Action: Create new Alert escalation
     */
    const createNew = () => {
        //Show modal
        setEscalation(0);
    };

    /**
     * Action: Delete an alert escalation
     */
    const deleteClick = (data) => {
        setDeletedRecord(data);
        setDeleteConfirmation(true);
    };

    /**
     * Action: Edit an alert escalation
     * @param {*} data 
     */
    const editClick = (data) => {
        setEscalation(data.ID);
    };

    /**
     * Callback: close the modal
     * @param {*} needReload flag check need to reload the data
     */
    const closeCallback = (needReload) => {
        if (needReload === true) {
            //reget all alert escalation of login user
            props.getUserAlertEscalations(props.authData, props.authData.userID);
        }
        //hide modal
        setEscalation(-1);
    };

    /**
     * Popup Action: click cancel button
     */
    const onCloseCancel = () => {
        setDeleteConfirmation(false);
    }

    /**
     * Popup Action: click Confirm button
     */
    const onCloseConfirm = async () => {
        //close popup
        setDeleteConfirmation(false);
        //Delete record
        let result = await props.deleteAlertEscalation(props.authData, deletedRecord.ID);
        if (result === false) {
            //Show error
            setShowError(true);
        }
        else {
            //delete success => reget list alert escalations
            props.getUserAlertEscalations(props.authData, props.authData.userID);
        }
    }

    /**
     * Popup Action: hide error popup
     */
    const toggleError = () => {
        setShowError(false);
    }

    /**
     * Define column table
     */
    const columns = useMemo(
        () => [
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="No"
                        />
                    );
                },
                placeholder: "Index",
                accessor: "no",
                disableFilters: true
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Alert me when"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "Any Company",
                accessor: "alertWhen"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Specific Company"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "ABC Company",
                accessor: "specificCompany"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Specific Member"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "John",
                accessor: "specificMember"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Exceeds"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "0",
                accessor: "exceeds"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Worth of"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "MC days",
                accessor: "worthOf"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="In a"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "Policy Year",
                accessor: "ina"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Has Alert"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "Yes",
                id: 'noMatchingClaims',
                accessor: (record) => {
                    let result = 'No';
                    if (record.noMatchingClaims && record.noMatchingClaims > 0) {
                        result = 'Yes';
                    }
                    return result;
                }
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
                                className="react-table-edit-button"
                                onClick={() => editClick(tableInstance.row.original)}
                            >
                                <i className="fas fa-edit" />
                            </button>
                            <button
                                className="react-table-delete-button"
                                onClick={() => deleteClick(tableInstance.row.original)}
                            >
                                <i className="fas fa-trash" />
                            </button>
                        </div>
                    );
                }
            }
        ],
        []
    );

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
                pageSize: 10,
                pageIndex: 0
            }
        },
        useFilters,
        useSortBy,
        usePagination
    );

    return (
        <ReactTableWrapper {...props}>
            <SweetAlert
                title="Confirmation"
                onConfirm={onCloseConfirm}
                onCancel={onCloseCancel}
                show={showDeleteConfirmation}
                showCancel={true}
            >
                <div>
                    Do you want to delete the alert number [{deletedRecord ? deletedRecord.no : ''}]
				</div>
            </SweetAlert>
            <SweetAlert
                title="Error"
                onConfirm={toggleError}
                show={showError}
            >
                <div>
                    Something wrong !!!
				</div>
            </SweetAlert>
            {escalationId != -1 && (
                <AlertEscalationModal
                    callbackClose={closeCallback}
                    alertID={escalationId}
                />
            )}
            <div className="roe-card-style mt-15 mb-30">
                <div className="roe-card-header">
                    <span className="hash"> </span> Alert Escalations (Table)
                    <Button onClick={() => createNew()} className="success float-right" size="sm ml-10">Create New</Button>
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
    );
};

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

const mapStateToProps = state => {
    return {
        authData: {
            accessToken: state.auth.accessToken,
            userID: state.auth.userID
        },
        amData: {
            alertEscalations: state.alertescalations.userAlertEscalations
        }
    };
};

export default connect(
    mapStateToProps,
    { getUserAlertEscalations, deleteAlertEscalation }
)(AlertEscalations);
