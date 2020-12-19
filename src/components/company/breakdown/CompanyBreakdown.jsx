import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import NewBar from "components/newchartswrapper/NewBar";
import CompActions from "redux/company/actions";
import CompanyBreakdownClaimsTables from "./CompanyBreakdownClaimsTable";
import { useHistory } from "react-router-dom";
import { moneyFormat, numberFormat } from "helper/numberFormat";

const { getCompanyClaimsBreakdown } = CompActions;

const CompanyBreakdown = props => {

    //call apis
    const [incomingData, setIncData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [tableData2, setTableData2] = useState([]);

    useEffect(() => {
        //update the data
        props.getCompanyClaimsBreakdown(props.authData, props.companyData.companyID);
    }, []);

    useEffect(() => {
        setIncData(props.companyData.claimsBreakdown);
    }, [props.companyData.claimsBreakdown]);

    useEffect(() => {
        //alert("haha");
        let tData = [];
        let tData2 = [];
        if (incomingData == null || incomingData.length == 0) return;
        for (var i = 0; i < incomingData[0].length; i++) {
            tData.push({
                no: i + 1,
                VisitType: incomingData[0][i].VisitType,
                SClaims: moneyFormat(incomingData[0][i].SClaims),
                AClaims: moneyFormat(incomingData[0][i].AClaims),
                SCount: numberFormat(incomingData[0][i].SCount),
                TotalCount: numberFormat(incomingData[0][i].Employee + incomingData[0][i].Spouse + incomingData[0][i].Child),
                EmployeeCount: numberFormat(incomingData[0][i].Employee),
                SpouseCount: numberFormat(incomingData[0][i].Spouse),
                ChildCount: numberFormat(incomingData[0][i].Child),
            });
        }
        for (var i = 0; i < incomingData[1].length; i++) {
            tData2.push({
                no: i + 1,
                VisitType: incomingData[1][i].VisitType,
                SClaims: moneyFormat(incomingData[1][i].SClaims),
                AClaims: moneyFormat(incomingData[1][i].AClaims),
                SCount: numberFormat(incomingData[1][i].SCount),
                TotalCount: numberFormat(incomingData[1][i].Employee + incomingData[1][i].Spouse + incomingData[1][i].Child),
                EmployeeCount: numberFormat(incomingData[1][i].Employee),
                SpouseCount: numberFormat(incomingData[1][i].Spouse),
                ChildCount: numberFormat(incomingData[1][i].Child),
            });
        }
        setTableData(tData);
        setTableData2(tData2);
    }, [incomingData]);


    return (
        <div className="row">

            <div className="col-lg-12">
                <div className="roe-card-style mt-15 mb-30" >
                    <div className="roe-card-header">
                    <div className="row header-container">
                        <div className="float-left">
                            <p className="card-main-header">Panel Claims Breakdown</p>
                            <p className="card-sub-header">Overview of all time</p>
                        </div>
                    </div>
                    </div>
                    {(incomingData != null && incomingData.length) > 0 &&
                        <CompanyBreakdownClaimsTables tData={tableData} />
                    }
                    {
                        (incomingData == null || incomingData.length == 0) &&
                        <div style={{ marginLeft: "23px", marginBottom: "15px" }}>
                            <p>This chart contains no data</p>
                        </div>
                    }
                </div>
            </div>
            <div className="col-lg-12">
                <div className="roe-card-style mt-15 mb-30" >
                    <div className="roe-card-header">
                        <div className="row header-container">
                            <div className="float-left">
                                <p className="card-main-header">Non Panel Claims Breakdown</p>
                                <p className="card-sub-header">Overview of all time</p>
                            </div>
                        </div>
                    </div>
                    {(incomingData != null && incomingData.length) > 0 &&
                        <CompanyBreakdownClaimsTables tData={tableData2} />
                    }
                    {
                        (incomingData == null || incomingData.length == 0) &&
                        <div style={{ marginLeft: "23px", marginBottom: "15px" }}>
                            <p>This chart contains no data</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        authData: {
            accessToken: state.auth.accessToken,
        },
        companyData: {
            companyID: state.company.viewingCompanyID,
            claimsBreakdown: state.company.companyClaimsBreakdown
        }
    };
};



export default connect(
    mapStateToProps,
    { getCompanyClaimsBreakdown }
)(CompanyBreakdown);