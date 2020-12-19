import React, { useState, useMemo, useEffect, useCallback } from "react";
import classnames from "classnames";
import { ihpLogoV1 } from "helper/constant";
import { moneyFormat, numberFormat } from "helper/numberFormat";
import { Table } from "components/tables/Table";

const CompanyListTableView = ({
    data,
    totalCompany,
    loadmoreCallback,
    skipPageReset
}) => {
    const HeaderComponent = props => {
        let classes = {
            "my-2": true,
            "mx-3": true,
            "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
            "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
        };
        return <div className={classnames(classes)}>{props.title}</div>;
    };
    const columns = useMemo(
        () => [
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title=""
                        />
                    );
                },
                accessor: () => {
                    return <img src={ihpLogoV1} height="30" />
                },
                id: 'icon'
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Company name"
                        />
                    );
                },
                accessor: "CoyName"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Average bill"
                        />
                    );
                },
                accessor: "AverageBill"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Total bill"
                        />
                    );
                },
                accessor: "TotalBill"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Employee count"
                        />
                    );
                },
                accessor: "EmployeeCount"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Dependent count"
                        />
                    );
                },
                accessor: "DependentCount"
            }
        ],
        []
    );

    const [tdata, setData] = useState([]);

    /**
     * ComponentDidUpdate: watch on props.data
     * Convert the data to table view data
     */
    useEffect(() => {
        let tData = [];
        data.forEach((val) => {
            tData.push({
                CoyName: val.CoyName
                , AverageBill: "$" + moneyFormat(parseFloat(val.AverageBill))
                , TotalBill: "$" + moneyFormat(parseFloat(val.TotalBill))
                , EmployeeCount: numberFormat(parseFloat(val.EmployeeCount))
                , DependentCount: numberFormat(parseFloat(val.DependentCount))
            });
        });
        setData(tData);
    }, [data]);

    /**
     * callback function get new record
     */
    const fetchData = useCallback(({ pageSize, pageIndex, sortBy }) => {
        loadmoreCallback(pageIndex, pageSize, sortBy);
    }, []);

    return (
        <Table columns={columns}
            data={tdata}
            pageCount={Math.ceil(totalCompany / 20)}
            fetchData={fetchData}
            skipPageReset={skipPageReset}
            pageSize={20}
        />
    )
}

export default CompanyListTableView
