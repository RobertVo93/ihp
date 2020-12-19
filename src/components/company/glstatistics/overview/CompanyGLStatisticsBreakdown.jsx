import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CompActions from "redux/company/actions";
import customTooltip from "components/common/chartTooltip";
import { Doughnut } from "react-chartjs-2";
import chroma from "chroma-js";
import StatisticsBreakdownTable from "../../tables/CompanyGLStatisticsBreakdownTable";
import ChartLoading from "views/ChartLoading";

const { getCompanyGLBreakdown } = CompActions;

const CompanyGLStatisticsBreakdown = props => {
    const [tData, setTData] = useState([])
    const [chartLoading, setChartLoading] = useState(false);
    const [incomingData, setIncData] = useState([]);

    useEffect(() => {
        //update the data
        // props.getDashboard(props.authData, props.companyData.companyID);
        setChartLoading(false);
        setIncData([])
    }, []);

    let pieChartData = {
        labels: ["label 1", "label 2", "label 3"],
        datasets: [
            {
                data: [1, 2, 3],
                backgroundColor: ["#5073B8", "#FF0000", "#FFE600"],
                hoverBackgroundColor: [
                    chroma("#5073B8").alpha(0.8).css(),
                    chroma("#FF0000").alpha(0.8).css(),
                    chroma("#FFE600").alpha(0.8).css()
                ]
            }
        ]
    };

    return (
        <div className="row">
            <div className="col-lg-6">
                <div className="roe-card-style mt-15 mb-30 chart-loading-container">
                    <ChartLoading
                        isLoading={chartLoading}
                        style={{ borderRadius: "6px" }}
                    />
                    <div className="roe-card-header">
                        <div className="row header-container">
                            <div className="float-left">
                                <p className="card-main-header">GL types breakdown</p>
                                <p className="card-sub-header">Overview of all time</p>
                            </div>
                        </div>

                    </div>
                    {incomingData.length > 0 && (
                        <Doughnut
                            data={pieChartData}
                            options={{
                                tooltips: {
                                    enabled: false,
                                    custom: customTooltip
                                },
                                legend: { position: "bottom" },
                                onHover: (event, chartElement) => {
                                    event.target.style.cursor = chartElement[0]
                                        ? "pointer"
                                        : "default";
                                }
                            }}
                        />
                    )}
                    {(incomingData == null || incomingData.length == 0) && !chartLoading && (
                        <div style={{ marginLeft: "23px", marginBottom: "15px" }}>
                            <p>This chart contains no data</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="col-lg-6">
                <StatisticsBreakdownTable tData={tData} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        authData: {
            accessToken: state.auth.accessToken
        },
    };
};

export default connect(mapStateToProps, { getCompanyGLBreakdown })(
    CompanyGLStatisticsBreakdown
);
