import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Button } from "reactstrap";
import { remove } from "lodash";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import { calculateAging } from 'util/constant_methods';
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import CMClaimsDetailsHistoryModal from "components/claimmanagers/earlywarning/CMClaimsDetailsHistoryModal";
import { connect } from 'react-redux';
import CMActions from "redux/claimmanagers/actions";
const { getClaimsDates } = CMActions;

const HeaderComponent = props => {
	let classes = {
		"my-2": true,
		"mx-3": true,
		"-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
		"-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
	};
	return <div className={classnames(classes)}>{props.title}</div>;
};

const CMEarlyWarningTable = props => {
	const [tableData, setTableData] = useState([]);
	const [claimID, setClaimID] = useState("-1");
	const [currentTAT, setCurrentTAT] = useState(0);
	const [currentZone, setCurrentZone] = useState("Green");
	const [allClaimsDates, setAllClaimsDates] = useState([]);
	const [incomingData, setIncData] = useState([]);
	const [statType, setStatType] = useState("Red");
	useEffect(() => {
		//update the data
		props.getClaimsDates(props.authData);

	}, []);

	useEffect(() => {
		setIncData(props.cmData.claimsDates);
	}, [props.cmData.claimsDates]);

	useEffect(() => {

		let newTableData = [];
		if (incomingData == null || incomingData.length <= 0) return;

		let greenControl = 2;
		let orangeControl = 4;
		let redControl = 7;
		let totalClaims = incomingData.length;
		let greenCount = 0;
		let orangeCount = 0;
		let redCount = 0;
		//do logic here and put them into the different buckets based on a 7 days TAT
		for (var i = 0; i < incomingData.length; i++) {
			let currentTAT = calculateAging(incomingData[i].LastModifiedDate);
			incomingData[i].TAT = currentTAT;
			if (currentTAT <= greenControl) {
				incomingData[i].Zone = "Green";
			} else if (currentTAT <= orangeControl) {
				incomingData[i].Zone = "Orange";
			} else {
				incomingData[i].Zone = "Red";
			}
		};

		for (var i = 0; i < incomingData.length; i++) {
			if (incomingData[i].Zone != statType) continue;
			newTableData.push({
				no: i + 1,
				VisitNo: incomingData[i].ROCNo,
				VisitDate: incomingData[i].VisitDate,
				TAT: incomingData[i].TAT,
				Zone: incomingData[i].Zone
			});
		}
		setTableData(newTableData);
	}, [incomingData]);

	let SwitchStatistics = (type) => {
		let newTableData = [];
		setStatType(type);
		for (var i = 0; i < incomingData.length; i++) {
			if (incomingData[i].Zone != type) continue;
			newTableData.push({
				no: i + 1,
				VisitNo: incomingData[i].ROCNo,
				VisitDate: incomingData[i].VisitDate,
				TAT: incomingData[i].TAT,
				Zone: incomingData[i].Zone
			});
		}
		setTableData(newTableData);
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
				width: "5%",
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Visit No"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "A123",
				accessor: "VisitNo",
				width: "5%",
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
				width: "5%",
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="TAT"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "TAT",
				width: "1%",
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Zone"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "Green",
				accessor: "Zone",
				width: "5%",
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
				width: "5%",
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
		[deleteClick]
	);

	const viewClick = data => {
		// Here you can view the data and make forward action for view data
		//show modal
		setClaimID(data.VisitNo);
		setCurrentZone(data.Zone);
		setCurrentTAT(data.TAT);
		//alert(JSON.stringify(data));
	};

	const editClick = data => {
		// Here you can view the data and make forward action for edit data
		alert(JSON.stringify(data));
	};

	const closeCallback = () => {
		setClaimID("-1");
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
				claimID != "-1" &&
				<CMClaimsDetailsHistoryModal
					claimID={claimID}
					callbackClose={closeCallback}
					TAT={currentTAT}
					Zone={currentZone} />
			}
			<ReactTableWrapper {...props}>
				<div className="roe-card-style mt-15 mb-30">
					<div className="roe-card-header">
						<div className="row header-container">
							<div className="float-left">
								<p className="card-main-header">Aging Claims Table</p>
								<p className="card-sub-header">Overview of all time</p>
							</div>
							<div className="float-right">
								<Button
									onClick={() => SwitchStatistics("Green")}
									disabled={statType == "Green"}
									className={classnames("ml-10", statType == "Green" ? "c-dark" : "btn-light")}
									size="sm"
								>
									Green
              					</Button>
								<Button
									onClick={() => SwitchStatistics("Orange")}
									disabled={statType == "Orange"}
									className={classnames("ml-10", statType == "Orange" ? "c-dark" : "btn-light")}
									size="sm"
								>
									Orange
              					</Button>
								<Button
									onClick={() => SwitchStatistics("Red")}
									disabled={statType == "Red"}
									className={classnames("ml-10", statType == "Red" ? "c-dark" : "btn-light")}
									size="sm"
								>
									Red
              					</Button>
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
											<th width={header.width}
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
		cmData: {
			claimsDates: state.claimmanagers.claimsDates[0]
		}
	};
};

export default connect(
	mapStateToProps,
	{ getClaimsDates }
)(CMEarlyWarningTable);
