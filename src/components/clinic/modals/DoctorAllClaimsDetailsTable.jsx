import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import { connect } from "react-redux";

/**
 * Define Header
 * @param {*} props
 */
const HeaderComponent = props => {
	let classes = {
		"my-2": true,
		"mx-3": true,
		"-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
		"-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
	};
	return <div className={classnames(classes)}>{props.title}</div>;
};

const DoctorAllClaimsDetailsTable = props => {
	const [tableData, setTableData] = useState([]);

	/**
	 * componentDidMount
	 */
	useEffect(() => {
		//update table
		setTableData(props.tableData);
	}, []);

	/**
	 * componentDidUpdate when props.tableData changed
	 */
	useEffect(() => {
		setTableData(props.tableData);
	}, [props.tableData]);

	/**
	 * Define table's columns
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
				disableFilters: true,
				width: "5%"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="ROC No"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "ROCNo"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Claimant Name"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "Dr. John",
				accessor: "claimantName"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Claim"
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
							title="Visit Date"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "VisitDate"
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
										width={header.width}
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
											{...header.getHeaderProps(header.getSortByToggleProps())}
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
			<Pagination onPageChange={gotoPage} pages={pageCount} page={pageIndex} />
		</ReactTableWrapper>
	);
};

/**
 * Define header filter
 * @param {*} tableInstance
 */
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
	return {};
};

export default connect(mapStateToProps, {})(DoctorAllClaimsDetailsTable);
