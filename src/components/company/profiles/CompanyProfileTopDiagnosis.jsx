import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import CompActions from "redux/company/actions";
import CompanyProfileTopDiagnosisTable from "./CompanyProfileTopDiagnosisTable";
import { useHistory } from "react-router-dom";

const { getCompanyInpatientProfileTopDiagnosis, getCompanyOutpatientProfileTopDiagnosis } = CompActions;

const CompanyProfileTopDiagnosis = props => {

    //call apis
    const [incomingData, setIncData] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        //update the data
        if (props.statMode == "Inpatient") {
            props.getCompanyInpatientProfileTopDiagnosis(props.authData, props.companyData.companyID);
        } else if (props.statMode == "Outpatient GP") {
            props.getCompanyOutpatientProfileTopDiagnosis(props.authData, props.companyData.companyID, "GP");
        } else if (props.statMode == "Outpatient SP") {
            props.getCompanyOutpatientProfileTopDiagnosis(props.authData, props.companyData.companyID, "SP");
        }
    }, []);

    useEffect(() => {
        setIncData(props.companyData.topDiagnosis);
    }, [props.companyData.topDiagnosis]);

    useEffect(() => {
        //alert("haha");
        let labels = [];
        let data = [];
        let hrefLinks = [];
        let tData = [];
        if (incomingData == null || incomingData.length == 0) return;
        for (var i = 0; i < incomingData.length; i++) {
            tData.push({
                no: i + 1,
                Diagnosis: incomingData[i].Diagnosis,
                Headcount: incomingData[i].HC,
                ICDCD: incomingData[i].ICDCD,
                SMC: incomingData[i].SMC,
                SCount: incomingData[i].SCount,
                AClaims: incomingData[i].AClaims,
                SClaims: incomingData[i].SClaims,
                Classification: incomingData[i].Classification,
                Employee: incomingData[i].Employee,
                Spouse: incomingData[i].Spouse,
                Child: incomingData[i].Child
            });
        }

        setTableData(tData);
    }, [incomingData]);


    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="roe-card-style mt-15 mb-30" >
                    <div className="roe-card-header">
                        <div className="row header-container">
                            <div className="float-left">
                                <p className="card-main-header">Top Diagnosis (Table)</p>
                                <p className="card-sub-header">Overview of all time</p>
                            </div>
                        </div>
                    </div>
                    {(incomingData != null && incomingData.length) > 0 &&
                        <CompanyProfileTopDiagnosisTable tData={tableData} />
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
        companyData: {
            companyID: state.company.viewingCompanyID,
            topDiagnosis: state.company.companyProfileTopDiagnosis
        }
    };
};



export default connect(
    mapStateToProps,
    { getCompanyInpatientProfileTopDiagnosis, getCompanyOutpatientProfileTopDiagnosis }
)(CompanyProfileTopDiagnosis);