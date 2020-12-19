import React, { useState, useMemo, useCallback, useEffect } from "react";
import { rowData } from "util/data/reactTableData";
import { remove } from "lodash";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import { connect } from 'react-redux';
import MedActions from "redux/medicalescalations/actions";
import { Button, Badge } from "reactstrap";
import MedicalEscalationsModal from "components/medicalescalations/MedicalEscalationsModal";
import { convertDateTime } from 'util/constant_methods';

const { } = MedActions;

const HeaderComponent = props => {
	let classes = {
		"my-2": true,
		"mx-3": true,
		"-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
		"-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
	};
	return <div className={classnames(classes)}>{props.title}</div>;
};

const MedicalEscalationsHistoryTable = props => {

	let [tableData, setTableData] = useState([]);

	useEffect(() => {
		if (props.escHistory == null) return;
		setTableData(props.escHistory);
	}, [props.escHistory]);


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
							title="User"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "John",
				accessor: "Name",
				width: 50
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Action Date"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "ModifiedDate",
				width: 100
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
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "Action",
				width: 100
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
				placeholder: "0",
				accessor: "HistoryType",
				disableSortBy: false,
				disableFilters: true,
				width: 50,
				Cell: tableInstance => {
					return (
						<div>
							<Badge className={"c-" + getBadgeColor(tableInstance.row.original.HistoryType)}>{tableInstance.row.original.HistoryType}</Badge>
						</div>
					);
				}
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
				accessor: "ActionID",
				disableSortBy: true,
				disableFilters: true,
				width: 50,
				Cell: tableInstance => {

					return (

						<div className="react-action-class">
							{(tableInstance.row.original.HistoryType == "Upload File") &&
								<Button onClick={() => {
									props.downloadFileMethod(tableInstance.row.original.ActionID, tableInstance.row.original.ActionPath, tableInstance.row.original.ActionContent);
								}}
									className="c-success fs-14"
									size="sm"
									style={{ height: "24px", paddingTop: "1px", paddingBottom: "1px", marginLeft: "5px" }}>Download</Button>}
						</div>
					);
				}
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
				pageSize: 50,
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
	{}
)(MedicalEscalationsHistoryTable);
