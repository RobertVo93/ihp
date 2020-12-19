import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from 'react-redux';
import { Doughnut } from "react-chartjs-2";
import CompActions from "redux/company/actions";
import { useHistory } from "react-router-dom";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";

const { getCompanyInpatientProfileClassfications, getCompanyOutpatientProfileClassifications } = CompActions;

const CompanyProfileClassifications = props => {

    //call apis
    const [incomingData, setIncData] = useState([]);
    const [data, setData] = useState({ labels: '', datasets: [] });
    const [chartLoading, setChartLoading] = useState(false);

    let history = useHistory();
    useEffect(() => {
        //show chart loading
        setChartLoading(true);
        async function fetchData() {
            if (props.statMode == "Inpatient") {
                await props.getCompanyInpatientProfileClassfications(props.authData, props.companyData.companyID);
            } else if (props.statMode == "Outpatient GP") {
                await props.getCompanyOutpatientProfileClassifications(props.authData, props.companyData.companyID, "GP");
            } else if (props.statMode == "Outpatient SP") {
                await props.getCompanyOutpatientProfileClassifications(props.authData, props.companyData.companyID, "SP");
            }
            //Hide chart loading after data load completed
            setChartLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        setIncData(props.companyData.classifications);
    }, [props.companyData.classifications]);


    useEffect(() => {
        let labels = [];
        let data = [];
        let hrefLinks = [];
        if (incomingData == null || incomingData.length == 0) return;
        for (var i = 0; i < incomingData.length; i++) {
            if (i <= 8) {
                labels.push(incomingData[i].Classification == null ? "None" : incomingData[i].Classification);
                data.push(incomingData[i].SClaims);
            } else {
                break;
            }
        }
        const dataTemp = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: ["#F16548", "#219653", "#6E1C74"],
                    hoverBackgroundColor: [
                        chroma("#F16548").alpha(0.8).css(),
                        chroma("#219653").alpha(0.8).css(),
                        chroma("#6E1C74").alpha(0.8).css()
                    ]
                }
            ]
        };
        setData(dataTemp);
    }, [incomingData]);



    return (
        <div className="roe-card-style mt-15 mb-30 chart-loading-container">
            <ChartLoading isLoading={chartLoading} style={{ borderRadius: '6px' }} />
            <div className="roe-card-header">
                <div className="row header-container">
                    <div className="float-left">
                        <p className="card-main-header">Classifications Breakdown</p>
                        <p className="card-sub-header">Overview of all time</p>
                    </div>
                </div>
            </div>
            {(incomingData != null && incomingData.length) > 0 &&
                <Doughnut data={data} height={280} options={{
                    tooltips: {
                        enabled: false,
                        custom: customTooltip
                    },
                    legend: { display: true, position: "bottom" },
                }}
                />
            }
            {(incomingData == null ||
                incomingData.length == 0) && !chartLoading &&
                <div style={{ marginLeft: "23px", marginBottom: "15px" }}>
                    <p>This chart contains no data</p>
                </div>
            }
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
            classifications: state.company.companyProfileClassifications,
        }
    };
};



export default connect(
    mapStateToProps,
    { getCompanyInpatientProfileClassfications, getCompanyOutpatientProfileClassifications }
)(CompanyProfileClassifications);