import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import { connect } from "react-redux";
import ClinicActions from "redux/clinic/actions";
import { moneyFormat } from "helper/numberFormat";
const { getAllVisits } = ClinicActions;

const HeaderComponent = props => {
	let classes = {
		"my-2": true,
		"mx-3": true,
		"-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
		"-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
	};
	return <div className={classnames(classes)}>{props.title}</div>;
};

const ClinicOverviewVisitsTable = props => {
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		let newTableData = [];
		if (props.drugs == null || props.drugs.length <= 0) return;

		for (var i = 0; i < props.drugs.length; i++) {
			newTableData.push({
				no: i + 1,
				IOTDesc: props.drugs[i].IOTDesc,
				Price:
					"$" +
					(props.drugs[i].Price == null
						? 0
						: moneyFormat(props.drugs[i].Price)),
				IOTType: props.drugs[i].IOTType,
				Qty: props.drugs[i].Qty
			});
		}
		setTableData(newTableData);
	}, [props.drugs]);

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
							title="Name"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "Drug name",
				accessor: "IOTDesc"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Pricing"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "Drug pricing",
				accessor: "Price"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Type"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "Drug Type",
				accessor: "IOTType"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Quantity"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "Quantity",
				accessor: "Qty"
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
		<div>
			<ReactTableWrapper {...props}>
				<div className="roe-card-style mt-15 mb-30">
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
												{...header.getHeaderProps(
													header.getSortByToggleProps()
												)}
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
		</div>
	);
};

const FilterComponent = tableInstance => {
	const { filterValue, setFilter } = tableInstance.column;
	return (
		<input
			type="text"
			value={filterValue || ""}
			onChange={e => {
				setFilter(e.target.value || undefined);
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
			accessToken: state.auth.accessToken
		},
		clinicData: {
			clinicID: state.clinic.viewingClinicID,
			visits: state.clinic.clinicAllVisits
		}
	};
};

export default connect(mapStateToProps, { getAllVisits })(
	ClinicOverviewVisitsTable
);
