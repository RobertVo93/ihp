import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import React, { useEffect, useMemo, useState } from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";
import { Button } from "reactstrap";
import RoleManagementModal from "./RoleManagementModal";

const HeaderComponent = props => {
    let classes = {
        "my-2": true,
        "mx-3": true,
        "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
        "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
    };
    return <div className={classnames(classes)}>{props.title}</div>;
};

const RoleManagementTable = (props) => {
    const [tableData, setTableData] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [viewMode, setViewMode] = useState(false);
    const [createMode, setCreateMode] = useState(false);

    useEffect(() => {
        //update the data
        setTableData(props.tData);
    }, [props.tData]);

    const columns = useMemo(
        () => [
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Role Id"
                        />
                    );
                },
                placeholder: "Index",
                accessor: "RoleID",
                disableFilters: true
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Role Name"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "Role Name",
                accessor: "RoleName",
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Pages Allowed"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "Pages Allowed",
                id: 'PagesAllowed',
                accessor: (record) => {
                    let result = '';
                    if (record.PagesAllowed) {
                        result = JSON.stringify(record.PagesAllowed);
                        if (result.length > 30) {
                            result = result.substr(0, 30) + "...";//shorten the display value
                        }
                    }
                    return result;
                }
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Permissions"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "Permissions",
                id: 'Permissions',
                accessor: (record) => {
                    let result = '';
                    if (record.Permissions) {
                        result = JSON.stringify(record.Permissions);
                        if (result.length > 30) {
                            result = result.substr(0, 30) + "...";//shorten the display value
                        }
                    }
                    return result;
                }
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="InitialRoute"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "InitialRoute",
                accessor: "InitialRoute"
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
                accessor: "logo_url",
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
                        </div>
                    );
                }
            }
        ],
        []
    );

    /**
     * Action: View record
     */
    const viewClick = data => {
        setSelectedRole(data);
        setViewMode(true);
    };

    /**
     * Action: edit record
     */
    const editClick = data => {
        setSelectedRole(data);
    };

    /**
     * Action: Create new record
     */
    const createNew = () => {
        //Show modal
        setCreateMode(true);
    };

    // close modal
    const closeCallback = () => {
        setSelectedRole(null);
        setViewMode(false);
        setCreateMode(false);
    }

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
            {
                selectedRole &&
                <RoleManagementModal
                    viewMode={viewMode}
                    selectedRole={selectedRole}
                    callbackClose={closeCallback} />
            }
            {
                createMode &&
                <RoleManagementModal
                    viewMode={false}
                    callbackClose={closeCallback} />
            }
            <ReactTableWrapper {...props}>
                <div className="roe-card-style mt-15 mb-30">
                    <div className="roe-card-header">
                        <div className="row header-container">
                            <div className="float-left">
                                <p className="card-main-header">Roles Management</p>
                                <p className="card-sub-header">Overview of all time</p>
                            </div>
                            <div className="float-right">
                                <Button onClick={() => createNew()} className="success" size="sm ml-10">Add New</Button>
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

export default RoleManagementTable
