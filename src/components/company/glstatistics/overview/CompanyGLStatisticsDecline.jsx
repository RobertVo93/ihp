import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CompActions from "redux/company/actions";
import customTooltip from "components/common/chartTooltip";
import { Doughnut } from "react-chartjs-2";
import chroma from "chroma-js";
import ChartLoading from "views/ChartLoading";

const { getCompanyDeclineGL } = CompActions;

const CompanyGLStatisticsDecline = props => {
    const [data, setData] = useState({ labels: '', datasets: [] });
    const [chartLoading, setChartLoading] = useState(false);

    useEffect(() => {
        setChartLoading(true);
        async function fetchData() {
            //Get Company GL statistic Decline GLs
            await props.getCompanyDeclineGL(props.authData, props.companyData.companyID);
            //Hide chart loading after data load completed
            setChartLoading(false);
        }
        fetchData();
    }, []);

    /**
     * ComponentDidUpdate: watch on props.declineGLStatistic
     * Convert incomming data to chart data.
     */
    useEffect(() => {
        let labels = [], data = [];
        if (props.companyData.declineGLStatistic && props.companyData.declineGLStatistic.length === 3) {
            labels.push("Decline Guarantee Letters");
            labels.push("Issued Guarantee Letters");
            data.push(props.companyData.declineGLStatistic[0].SumGLs);
            data.push(props.companyData.declineGLStatistic[1].SumGLs);
        }
        let pieChartData = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: ["#5073B8", "#FF0000"],
                    hoverBackgroundColor: [
                        chroma("#5073B8").alpha(0.8).css(),
                        chroma("#FF0000").alpha(0.8).css()
                    ]
                }
            ]
        };
        setData(pieChartData);
    }, [props.companyData.declineGLStatistic]);

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="roe-card-style mt-15 mb-30 chart-loading-container">
                    <ChartLoading
                        isLoading={chartLoading}
                        style={{ borderRadius: "6px" }}
                    />
                    <div className="roe-card-header">
                        <div className="row header-container">
                            <div className="float-left">
                                <p className="card-main-header">GL Decline</p>
                                <p className="card-sub-header">Overview of all time</p>
                            </div>
                        </div>
                    </div>
                    {(props.companyData.declineGLStatistic != null || props.companyData.declineGLStatistic.length > 0) && (
                        <Doughnut
                            data={data}
                            options={{
                                tooltips: {
                                    enabled: false,
                                    custom: customTooltip
                                },
                                legend: { position: "bottom" }
                            }}
                        />
                    )}
                    {(props.companyData.declineGLStatistic == null || props.companyData.declineGLStatistic.length == 0) && !chartLoading && (
                        <div style={{ marginLeft: "23px", marginBottom: "15px" }}>
                            <p>This chart contains no data</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        authData: {
            accessToken: state.auth.accessToken
        },
        companyData: {
            companyID: state.company.viewingCompanyID,
            declineGLStatistic: state.company.companyGLStatisticsDeclineGL
        }
    };
};

export default connect(mapStateToProps, { getCompanyDeclineGL })(
    CompanyGLStatisticsDecline
);
