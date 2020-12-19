import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import { connect } from "react-redux";
import DiagnosisActions from "redux/diagnosis/actions";
import { moneyFormat, numberFormat } from "helper/numberFormat";
const { getTopClinics } = DiagnosisActions;

const HeaderComponent = props => {
	let classes = {
		"my-2": true,
		"mx-3": true,
		"-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
		"-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
	};
	return <div className={classnames(classes)}>{props.title}</div>;
};

const DiagnosisOverviewTopClinicsTable = props => {
	const [tableData, setTableData] = useState([]);
	const [incomingData, setIncData] = useState([]);
	useEffect(() => {
		//update the data
		props.getTopClinics(props.authData, props.diagnosisData.diagnosisID);
	}, []);

	useEffect(() => {
		setIncData(props.diagnosisData.topClinics);
	}, [props.diagnosisData.topClinics]);

	useEffect(() => {
		let newTableData = [];

		if (incomingData == null || incomingData.length <= 0) return;

		for (var i = 0; i < incomingData.length; i++) {
			newTableData.push({
				no: i + 1,
				Name: incomingData[i].ClinicName,
				Count: numberFormat(incomingData[i].SCount),
				AClaims:
					"$" +
					(incomingData[i].AClaims == null
						? 0
						: moneyFormat(incomingData[i].AClaims)),
				SClaims:
					"$" +
					(incomingData[i].SClaims == null
						? 0
						: moneyFormat(incomingData[i].SClaims)),
				ClinicType: incomingData[i].VType
			});
		}
		setTableData(newTableData);
	}, [incomingData]);

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
							title="Clinic Name"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "Clinic A",
				accessor: "Name"
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Count"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "Count"
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
							title="Total Claims"
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
							title="Clinic Type"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "Panel",
				accessor: "ClinicType"
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
						</div>
					);
				}
			}
		],
		[]
	);

	const viewClick = data => {
		// Here you can view the data and make forward action for view data
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
			<div className="roe-card-style mt-15 mb-30">
				<div className="roe-card-header">
					<div className="row header-container">
						<div className="float-left">
							<p className="card-main-header">Top Clinics</p>
							<p className="card-sub-header">Overview of all time</p>
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
			accessToken: state.auth.accessToken
		},
		diagnosisData: {
			diagnosisID: state.diagnosis.viewingDiagnosisID,
			topClinics: state.diagnosis.diagnosisTopClinics
		}
	};
};

export default connect(mapStateToProps, { getTopClinics })(
	DiagnosisOverviewTopClinicsTable
);
