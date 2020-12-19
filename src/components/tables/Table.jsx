import React from 'react';
import {
    useTable,
    usePagination,
    useSortBy
} from "react-table";
import Pagination from 'components/common/Pagination';
import ReactTableWrapper from "components/reacttable/reacttbl.style";

// Our table component
export function Table({
    columns,
    data,
    fetchData,
    pageCount: controlledPageCount,
    skipPageReset = true,
    pageSize: controlledPageSize
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        gotoPage,
        state: { pageIndex, pageSize, sortBy },
    } = useTable(
        {
            columns,
            data,
            autoResetPage: !skipPageReset,
            pageCount: controlledPageCount,
            manualPagination: true,
            manualSortBy: true,
            initialState: {
                pageSize: controlledPageSize || 10
            }
        },
        useSortBy,
        usePagination
    );

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        fetchData({ pageIndex, pageSize, sortBy });
    }, [fetchData, pageIndex, pageSize, sortBy]);

    return (
        <ReactTableWrapper>
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
                pages={controlledPageCount}
                page={pageIndex}
            />
        </ReactTableWrapper>
    )
}