import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import React, { useEffect, useMemo, useState } from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";
import { Button } from "reactstrap";
import WhiteLabelSettingsModal from "./WhiteLabelSettingsModal";

const HeaderComponent = props => {
    let classes = {
        "my-2": true,
        "mx-3": true,
        "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
        "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
    };
    return <div className={classnames(classes)}>{props.title}</div>;
};

const WhiteLabelSettingsTable = (props) => {
    const [tableData, setTableData] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState(null);
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
                            title="Id"
                        />
                    );
                },
                placeholder: "Index",
                accessor: "id",
                disableFilters: true
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
                placeholder: "Main Color",
                accessor: "mainColor",
                disableFilters: true
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Logo Text"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "Logo Text",
                accessor: "logoText"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Logo Name"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "Logo Name",
                accessor: "logo_name"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Logo Mime"
                        />
                    );
                },
                Filter: FilterComponent,
                placeholder: "Logo Mime",
                accessor: "logo_mime"
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
     * Action: View white label record
     */
    const viewClick = data => {
        setSelectedLabel(data);
        setViewMode(true);
    };

    /**
     * Action: edit white label record
     */
    const editClick = data => {
        setSelectedLabel(data);
    };

    /**
     * Action: Create new white label record
     */
    const createNew = () => {
        //Show modal
        setCreateMode(true);
    };

    // close modal
    const closeCallback = () => {
        setSelectedLabel(null);
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
                selectedLabel &&
                <WhiteLabelSettingsModal
                    viewMode={viewMode}
                    selectedLabel={selectedLabel}
                    callbackClose={closeCallback} />
            }
            {
                createMode &&
                <WhiteLabelSettingsModal
                    viewMode={false}
                    callbackClose={closeCallback} />
            }
            <ReactTableWrapper {...props}>
                <div className="roe-card-style mt-15 mb-30">
                    <div className="roe-card-header">
                        <div className="row header-container">
                            <div className="float-left">
                                <p className="card-main-header">WhiteLabel Settings Info</p>
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

export default WhiteLabelSettingsTable
