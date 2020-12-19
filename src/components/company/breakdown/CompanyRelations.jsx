import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import CompActions from "redux/company/actions";
import { Button } from 'reactstrap';
import CompanyBreakdownRelationsTable from "./CompanyBreakdownRelationsTable";
import { moneyFormat, numberFormat } from "helper/numberFormat";

const { getCompanyRelationsBreakdown } = CompActions;

const CompanyBreakdown = props => {

    //call apis
    const [incomingData, setIncData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [tableData2, setTableData2] = useState([]);
    const [statType, setStatType] = useState("Panel");

    useEffect(() => {
        //update the data
        props.getCompanyRelationsBreakdown(props.authData, props.companyData.companyID);
    }, []);

    useEffect(() => {
        setIncData(props.companyData.relationsBreakdown);
    }, [props.companyData.relationsBreakdown]);

    useEffect(() => {
        //alert("haha");
        let tData = [];
        let tData2 = [];
        if (incomingData == null || incomingData.length == 0) return;
        for (var i = 0; i < incomingData[0].length; i++) {
            tData.push({
                no: i + 1,
                Relation: incomingData[0][i].Relation,
                SClaims: moneyFormat(incomingData[0][i].SClaims),
                AClaims: moneyFormat(incomingData[0][i].AClaims),
                SCount: numberFormat(incomingData[0][i].SCount),
                EMC: numberFormat(incomingData[0][i].EMC),
                UCount: numberFormat(incomingData[0][i].UniqueCount),
            });
        }
        for (var i = 0; i < incomingData[1].length; i++) {
            tData2.push({
                no: i + 1,
                Relation: incomingData[1][i].Relation,
                SClaims: moneyFormat(incomingData[1][i].SClaims),
                AClaims: moneyFormat(incomingData[1][i].AClaims),
                SCount: numberFormat(incomingData[1][i].SCount),
                EMC: numberFormat(incomingData[1][i].EMC),
                UCount: numberFormat(incomingData[1][i].UniqueCount),
            });
        }
        setTableData(tData);
        setTableData2(tData2);
    }, [incomingData]);

    let SwitchStatistics = (type) => {
        setStatType(type);
    }


    return (
        <div className="row">

            <div className="col-lg-12">
                <div className="roe-card-style mt-15 mb-30" >
                    <div className="roe-card-header">
                        <div className="row header-container" style={{ marginLeft: "0px" }}>
                            <div className="float-left">
                                <p className="card-main-header">Relations Breakdown</p>
                                <p className="card-sub-header">Overview of all time</p>
                            </div>
                            <div>
                                <Button
                                    onClick={() => SwitchStatistics("Panel")}
                                    disabled={statType == "Panel"}
                                    className={statType == "Panel" ? "c-dark ml-10" : "btn-light ml-10"}
                                    size="sm">
                                    Panel
                                </Button>
                                <Button
                                    onClick={() => SwitchStatistics("Non Panel")}
                                    disabled={statType == "Non Panel"}
                                    className={statType == "Non Panel" ? "c-dark ml-10" : "btn-light ml-10"}
                                    size="sm">
                                    Non-Panel
                                </Button>
                            </div>
                        </div>
                    </div>

                    {(incomingData != null && incomingData.length) > 0 &&
                        <CompanyBreakdownRelationsTable tData={statType == "Panel" ? tableData2 : tableData} />
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
            relationsBreakdown: state.company.companyRelationsBreakdown
        }
    };
};



export default connect(
    mapStateToProps,
    { getCompanyRelationsBreakdown }
)(CompanyBreakdown);
