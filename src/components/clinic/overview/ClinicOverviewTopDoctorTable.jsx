import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import { connect } from "react-redux";
import ClinicActions from "redux/clinic/actions";
import DoctorAllClaimsDetailsModal from "../modals/DoctorAllClaimsDetailsModal";
const { getTopDoctors } = ClinicActions;

const HeaderComponent = props => {
	let classes = {
		"my-2": true,
		"mx-3": true,
		"-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
		"-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
	};
	return <div className={classnames(classes)}>{props.title}</div>;
};

const ClinicOverviewTopDoctorTable = props => {
	const [tableData, setTableData] = useState([]);
	const [incomingData, setIncData] = useState([]);
	const [doctorValue, setDoctorValue] = useState("-1");
	const [SClaims, setSumClaims] = useState("");
	const [Diagnosis, setDiagnosis] = useState("");
	//componentDidMount
	useEffect(() => {
		//get initial data.
		props.getTopDoctors(props.authData, props.clinicData.clinicID);
	}, []);

	//componentDidUpdate when props.clinicData.doctors changed
	useEffect(() => {
		//set incoming data when redux update props
		setIncData(props.clinicData.doctors);
	}, [props.clinicData.doctors]);

	//componentDidUpdate when incomingData changed
	useEffect(() => {
		if (incomingData == null || incomingData.length <= 0) return;

		//add incomming data to new table arr
		let newTableData = [];
		for (var i = 0; i < incomingData.length; i++) {
			newTableData.push({
				no: i + 1,
				Name: incomingData[i].Name,
				SClaims: incomingData[i].SClaims,
				Diagnosis: incomingData[i].Diagnosis
			});
		}
		//update tableData base on incomming data
		setTableData(newTableData);
	}, [incomingData]);

	/**
	 * Handle action view record
	 * @param {*} data viewing data
	 */
	const viewClick = data => {
		setDoctorValue(data.Name);
		setSumClaims(data.SClaims);
		setDiagnosis(data.Diagnosis);
	};

	/**
	 * Close the popup modal
	 */
	const closeCallback = () => {
		setDoctorValue("-1");
	};

	/**
	 * Define columns for display table
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
							title="Name"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "John",
				accessor: "Name"
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
							title="Diagnosis"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "Diagnosis"
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

	//Config table
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

	//render Table to DOM
	return (
		<div>
			{doctorValue != "-1" && (
				<DoctorAllClaimsDetailsModal
					callbackClose={closeCallback}
					doctorValue={doctorValue}
					SClaims={SClaims}
					Diagnosis={Diagnosis}
					clinicID={props.clinicData.clinicID}
				/>
			)}
			<ReactTableWrapper {...props}>
				<div className="roe-card-style mt-15 mb-30">
					<div className="roe-card-header">
						<span className="hash"> </span> Top doctors
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
		clinicData: {
			clinicID: state.clinic.viewingClinicID,
			doctors: state.clinic.clinicTopDoctors
		}
	};
};

export default connect(mapStateToProps, { getTopDoctors })(
	ClinicOverviewTopDoctorTable
);
