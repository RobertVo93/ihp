import React, { useState, useMemo, useCallback, useEffect } from "react";
import { rowData } from "util/data/reactTableData";
import { remove } from "lodash";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import { connect } from 'react-redux';
import CCActions from "redux/contactcenter/actions";
import { Badge, Button } from "reactstrap";
import OrderCreationModal from "components/contactcenter/OrderCreationModal";
import { convertDateTime } from 'util/constant_methods';
import SweetAlert from 'react-bootstrap-sweetalert';
import OrderViewPopupModal from 'components/contactcenter/OrderViewPopupModal'

const { getAllOrders } = CCActions;

const HeaderComponent = props => {
	let classes = {
		"my-2": true,
		"mx-3": true,
		"-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
		"-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
	};
	return <div className={classnames(classes)}>{props.title}</div>;
};

const OrdersTable = props => {
	const [tableData, setTableData] = useState([]);
	const [incomingData, setIncData] = useState([]);
	const [viewingOrder, setViewingOrder] = useState({});
	const [creating, setCreating] = useState(false);
	const [successMessage, setSM] = useState("Order Creation Succesful!");
	const [showSM, setShowSM] = useState(false);

	useEffect(() => {
		//update the data
		props.getAllOrders(props.authData);
	}, []);

	useEffect(() => {
		let ordersDataTemp = JSON.parse(JSON.stringify(props.ordersData.allOrders));
		for (var i = 0; i < ordersDataTemp.length; i++) {
			ordersDataTemp[i].OrderDateCreated = convertDateTime(ordersDataTemp[i].OrderDateCreated);
			ordersDataTemp[i].OrderReceivedDateTime = convertDateTime(ordersDataTemp[i].OrderReceivedDateTime);
		}
		setIncData(ordersDataTemp);
	}, [props.ordersData.allOrders]);

	const refreshOrders = () => {
		props.getAllOrders(props.authData);
	}

	const successAction = (successText) => {
		setSM(successText);
		setShowSM(true);
	}

	useEffect(() => {
		//alert("haha");
		let tData = [];
		if (incomingData == null || incomingData.length == 0) return;
		for (var i = 0; i < incomingData.length; i++) {
			tData.push({
				no: i + 1,
				OrderID: incomingData[i].OrderID,
				OrderNo: incomingData[i].OrderNo,
				MemberName: incomingData[i].MemberName,
				Insurer: incomingData[i].Insurer,
				CreatedDate: incomingData[i].OrderDateCreated,
				OrderReceivedDate: incomingData[i].OrderReceivedDateTime,
				Status: incomingData[i].OrderStatus
			});
		}
		setTableData(tData);
	}, [incomingData]);

	const getBadgeColor = (type) => {
		switch (type) {
			case "Awaiting Appointment":
				return "warning";
			case "Order Closed":
				return "warning";
			case "Order Cancelled":
				return "warning";
			case "Appointment Booked":
				return "info";
			case "Appointment Fulfilled":
				return "info";
			case "Order Closed":
				return "success";
			default:
				return "warning";
		}
	}

	const createOrder = () => {
		setCreating(true);
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
							title="Order No"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "OrderNo",
				width: 30
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Member Name"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "MemberName",
				width: 100
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Insurer"
						/>
					);
				},
				Filter: FilterComponent,
				placeholder: "0",
				accessor: "Insurer",
				width: 50
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
							title="Order Time"
						/>
					);
				},
				placeholder: "Time",
				accessor: "OrderReceivedDate",
				disableFilters: true,
				width: 60
			},
			{
				Header: tableInstance => {
					return (
						<HeaderComponent
							isSortedDesc={tableInstance.column.isSortedDesc}
							title="Created Date"
						/>
					);
				},
				placeholder: "Time",
				accessor: "CreatedDate",
				disableFilters: true,
				width: 60
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
			if (incomingData[i].OrderID == data.OrderID) {
				setViewingOrder(incomingData[i]);
				break;
			}
		}
		//alert(JSON.stringify(data));
	};

	const closeCallback = () => {
		setViewingOrder({});
		refreshOrders();
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
			{creating &&
				<OrderCreationModal
					modalCallback={setCreating}
					modalShow={creating}
					successCallback={successAction} />}
			{
				viewingOrder.OrderID != null &&
				<OrderViewPopupModal
					callbackClose={closeCallback}
					orderObject={viewingOrder}
					callbackSuccess={refreshOrders}
				/>
			}

			<SweetAlert
				success
				show={showSM}
				title={successMessage}
				onConfirm={() => {
					refreshOrders();
					setShowSM(false);
				}
				}
				confirmBtnCssClass="sweet-alert-confirm-button"
				cancelBtnCssClass="sweet-alert-cancel-button"
			>
				Action successful!
        </SweetAlert>


			<ReactTableWrapper {...props}>
				<div className="roe-card-style mt-15 mb-30" >

					<div className="roe-card-header">
						<div className="row" style={{ marginLeft: "0px" }}>
							<span className="hash"> </span> <p>All Orders</p>
							<Button onClick={() => createOrder()} className="success" size="sm ml-10">Create New Order</Button>
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
		ordersData: {
			allOrders: state.contactcenter.allOrders
		}
	};
};

export default connect(
	mapStateToProps,
	{ getAllOrders }
)(OrdersTable);
