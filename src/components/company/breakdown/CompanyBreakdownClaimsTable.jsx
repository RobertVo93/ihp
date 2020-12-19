import React, { useState, useMemo, useCallback, useEffect } from "react";
import { rowData } from "util/data/reactTableData";
import { remove } from "lodash";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import { connect } from 'react-redux';

const HeaderComponent = props => {
	let classes = {
		"my-2": true,
		"mx-3": true,
		"-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
		"-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
	};
	return <div className={classnames(classes)}>{props.title}</div>;
};

const CompanyBreakdownClaimsTable = props => {
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		//update the data
		setTableData(props.tData);
	}, [props.tData]);


	const deleteClick = useCallback(
		data => {
			// Here you can view the data and delete through API calling
			const array = tableData;
			remove(array, function (n) {
				return n.id === data.id;
			});
			setTableData([...array]);
		},
		[tableData]
	);

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
							title="Visit Type"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "GP",
				accessor: "VisitType"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Sum Claims"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "SClaims"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Avg Claims"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "AClaims"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Visits"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "SCount"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Unique Claimants"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "TotalCount"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Employee Claimants"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "EmployeeCount"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Spouse Claimants"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "SpouseCount"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Child Claimants"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "ChildCount"
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
		[deleteClick]
	);

	const viewClick = data => {
		// Here you can view the data and make forward action for view data
		alert(JSON.stringify(data));
	};

	const editClick = data => {
		// Here you can view the data and make forward action for edit data
		alert(JSON.stringify(data));
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
		<ReactTableWrapper {...props}>

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
		},
	};
};

export default connect(
	mapStateToProps,
	{}
)(CompanyBreakdownClaimsTable);
