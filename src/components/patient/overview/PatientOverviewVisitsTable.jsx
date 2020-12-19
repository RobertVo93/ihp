import React, { useState, useMemo, useCallback, useEffect } from "react";
import { remove } from "lodash";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import { connect } from "react-redux";
import PatActions from "redux/patient/actions";
import { moneyFormat } from "helper/numberFormat";
import PatientOverviewVisitsModal from "./PatientOverviewVisitsModal";
const { getAllVisits } = PatActions;

const HeaderComponent = props => {
  let classes = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
    "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
  };
  return <div className={classnames(classes)}>{props.title}</div>;
};

const PatientOverviewVisitsTable = props => {
  const [tableData, setTableData] = useState([]);
  const [incomingData, setIncData] = useState([]);
  const [visitId, setVisitId] = useState("-1");
  useEffect(() => {
    //update the data
    props.getAllVisits(props.authData, props.patientData.patientID);
  }, []);

  useEffect(() => {
    setIncData(props.patientData.visits);
  }, [props.patientData.visits]);

  useEffect(() => {
    let newTableData = [];

    if (incomingData == null || incomingData.length <= 0) return;

    for (var i = 0; i < incomingData.length; i++) {
      newTableData.push({
        no: i + 1,
        Name: incomingData[i].Name,
        VDate: incomingData[i].VDate.substr(0, 10),
        Diagnosis: incomingData[i].Diagnosis,
        MCDay: incomingData[i].MCDays,
        AmtPaid: "$" + moneyFormat(incomingData[i].AmtPaid),
        RocNo: incomingData[i].RocNo,
        VisitType:
          incomingData[i].VisitType + " (" + incomingData[i].VType + ")"
      });
    }
    setTableData(newTableData);
  }, [incomingData]);

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

  /**
   * Close the popup modal
   */
  const closeCallback = () => {
    setVisitId("-1");
  };

  const columns = useMemo(() => {
    let headerDefinitions = [
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
              title="Visit Date"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "0",
        accessor: "VDate"
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
              title="MC Day"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "0",
        accessor: "MCDay"
      },
      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Amount"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "0",
        accessor: "AmtPaid"
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
        placeholder: "0",
        accessor: "VisitType"
      },
      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="RocNo"
            />
          );
        },
        Filter: FilterComponent,
        placeholder: "0",
        accessor: "RocNo"
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
    ];
    if (props.authData.permissions.includes("view_personal_diagnosis")) {
      return headerDefinitions;
    } else {
      //if user do not have role [view_personal_diagnosis] => remove diagnosis
      return headerDefinitions.filter(val => {
        return val.accessor != "Diagnosis";
      });
    }
  }, [deleteClick]);

  const viewClick = data => {
    // Here you can view the data and make forward action for view data
    setVisitId(data.RocNo);
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
        pageSize: 10,
        pageIndex: 0
      }
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      {visitId != "-1" && (
        <PatientOverviewVisitsModal
          visitId={visitId}
          callbackClose={closeCallback}
        />
      )}
      <ReactTableWrapper {...props}>
        <div className="roe-card-style mt-15 mb-30">
          <div className="roe-card-header">
            <div className="row header-container">
              <div className="float-left">
                <p className="card-main-header">Employee Visits</p>
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
    </>
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
      permissions: state.auth.permissions
    },
    patientData: {
      patientID: state.patient.viewingPatientID,
      visits: state.patient.patientVisits
    }
  };
};
export default connect(mapStateToProps, { getAllVisits })(
  PatientOverviewVisitsTable
);
