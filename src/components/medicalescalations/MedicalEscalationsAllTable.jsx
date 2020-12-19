import React, { useState, useMemo, useCallback, useEffect } from "react";
import { rowData } from "util/data/reactTableData";
import { remove } from "lodash";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import { connect } from 'react-redux';
import MedActions from "redux/medicalescalations/actions";
import { Badge } from "reactstrap";
import MedicalEscalationsModal from "components/medicalescalations/MedicalEscalationsModal";
import { convertDateTime } from 'util/constant_methods';

const { getAllEscalations } = MedActions;

const HeaderComponent = props => {
	let classes = {
		"my-2": true,
		"mx-3": true,
		"-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
		"-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
	};
	return <div className={classnames(classes)}>{props.title}</div>;
};

const MedicalEscalationsAllTable = props => {
	const [tableData, setTableData] = useState([]);
	const [incomingData, setIncData] = useState([]);
	const [viewingEscalation, setViewingEscalation] = useState({});

	useEffect(() => {
		//update the data
		props.getAllEscalations(props.authData);
	}, []);

	useEffect(() => {
		let escalationDataTemp = JSON.parse(JSON.stringify(props.escalationsData.allEscalations));
		for (var i = 0; i < escalationDataTemp.length; i++) {
			escalationDataTemp[i].EffectiveDate = convertDateTime(escalationDataTemp[i].EffectiveDate);
			escalationDataTemp[i].ReinstDate = convertDateTime(escalationDataTemp[i].ReinstDate);
			escalationDataTemp[i].AdmissionDate = convertDateTime(escalationDataTemp[i].AdmissionDate);
			escalationDataTemp[i].DischargeDate = convertDateTime(escalationDataTemp[i].DischargeDate);
		}
		setIncData(escalationDataTemp);
	}, [props.escalationsData.allEscalations]);

	const refreshEscalations = () => {
		props.getAllEscalations(props.authData);
	}

	useEffect(() => {
		//alert("haha");
		let tData = [];
		if (incomingData == null || incomingData.length == 0) return;
		for (var i = 0; i < incomingData.length; i++) {
			tData.push({
				no: i + 1,
				RocNo: incomingData[i].RocNo,
				VisitDate: incomingData[i].VisitDate.substr(0, 10),
				PriDiagnosis: incomingData[i].PrimaryDiag,
				Name: incomingData[i].Name,
				EscalatedTime: convertDateTime(incomingData[i].DateCreated),
				Status: incomingData[i].Status
			});
		}
		setTableData(tData);
	}, [incomingData]);

	const getBadgeColor = (type) => {
		switch (type) {
			case "Trace":
				return "info";
			case "Upload File":
				return "success";
			case "Comment":
				return "primary";
			case "Creation":
				return "info";
			case "Approved":
				return "success";
			case "Pending GL Team":
				return "warning";
			case "Pending Medical Review":
				return "warning";
			case "Pending Escalation":
				return "warning";
			case "Rejected":
				return "success";
			default:
				return "warning";
		}
	}


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
				disableFilters: true,
				width: 20
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
				accessor: "RocNo",
				width: 50
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
				accessor: "VisitDate",
				width: 100
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Status"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "Status",
				disableSortBy: false,
				disableFilters: true,
				width: 50,
				Cell: tableInstance => {
					return (
						<div>
							<Badge className={"c-" + getBadgeColor(tableInstance.row.original.Status)}>{tableInstance.row.original.Status}</Badge>
						</div>
					);
				}
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
				placeholder: "0",
				accessor: "Name",
				width: 80
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Escalated Time"
						/>
					);
				},
				placeholder: "Time",
				accessor: "EscalatedTime",
				disableFilters: true,
				width: 80
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
				width: 50,
				Cell: tableInstance => {
					return (
						<div className="react-action-class">
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
		[deleteClick]
	);

	const viewClick = data => {
		// Here you can view the data and make forward action for view data
		//get Escalation object
		for (var i = 0; i < incomingData.length; i++) {
			if (incomingData[i].RocNo == data.RocNo) {
				setViewingEscalation(incomingData[i]);
				break;
			}
		}
		//alert(JSON.stringify(data));
	};

	const closeCallback = () => {
		setViewingEscalation({});
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
			{
				viewingEscalation.RocNo != null &&
				<MedicalEscalationsModal
					callbackClose={closeCallback}
					escalationObject={viewingEscalation}
					callbackSuccess={refreshEscalations}
				/>
			}
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
			accessToken: state.auth.accessToken,
		},
		escalationsData: {
			allEscalations: state.escalations.allEscalations
		}
	};
};

export default connect(
	mapStateToProps,
	{ getAllEscalations }
)(MedicalEscalationsAllTable);
