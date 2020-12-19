import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import chroma from "chroma-js";
import { connect } from "react-redux";
import NewBar from "components/newchartswrapper/NewBar";
import ClinicActions from "redux/clinic/actions";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";
import CustomRangeDatepickerWidget from "components/widgets/customdatepickerwidget/CustomRangeDatepickerWidget";

const { getTopCompanyVisit } = ClinicActions;

const ClinicOverviewTopCompany = (props) => {
    //Define states
    const [incomingData, setIncData] = useState([]);
    const [data, setData] = useState({ labels: "", datasets: [] });
    const [hrefLinks, setHrefLinks] = useState([]);
    const [chartLoading, setChartLoading] = useState(false);
    //initial start-end date of range time
    const today = new Date();
    today.setDate(0);	//previous month
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(new Date());
    let history = useHistory();

    /**
     * ComponentDidMount
     */
    useEffect(() => {
        //show chart loading
        setChartLoading(true);
        async function fetchData() {
            await props.getTopCompanyVisit(props.authData, props.clinicData.clinicID);
            //Hide chart loading after data load completed
            setChartLoading(false);
        }
        fetchData();
        //update the data
    }, []);

    /**
     * ComponentDidUpdate
     * Observe object: props.cmData.visitsByMonths
     */
    useEffect(() => {
        setIncData(props.clinicData.topCompanyVisit);
    }, [props.clinicData.topCompanyVisit]);

    /**
     * ComponentDidUpdate
     * Observe object: IncomingData
     */
    useEffect(() => {
        if (incomingData == null || incomingData == 0) return;
        let labels = [];
        let data = [];
        let hrefLinks = [];
        //Convert data to chart's data
        for (var i = 0; i < incomingData.length; i++) {
            labels.push(
                incomingData[i].CompanyName.length > 20
                    ? incomingData[i].CompanyName.substring(0, 20) + "..."
                    : incomingData[i].CompanyName
            );
            data.push(incomingData[i].SClaims);
            hrefLinks.push(
                "/company/cmoverview/" + incomingData[i].CompanyID + "/overview"
            );
        }
        //config chart's data
        const dataTemp = {
            labels: labels,
            datasets: [
                {
                    label: "Utilization Sum",
                    backgroundColor: "#BB6BD9",
                    hoverBackgroundColor: chroma("#BB6BD9")
                        .alpha(0.8)
                        .css(),
                    data: data
                }
            ]
        };
        //Update states
        setHrefLinks(hrefLinks);
        setData(dataTemp);
    }, [incomingData]);

    /**
     * Handle Select range time of datepicker
     * @param {*} start 
     * @param {*} end 
     */
    const onSelectRangeDatepickerHandler = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    }

    return (
        <div>
            <div className="roe-card-style mt-15 mb-30 chart-loading-container">
                <ChartLoading
                    isLoading={chartLoading}
                    style={{ borderRadius: "6px" }}
                />
                <div className="roe-card-header">
                    <div className="row header-container">
                        <div className="float-left">
                            <p className="card-main-header">Top Companies Visit</p>
                            <p className="card-sub-header">Overview of all time</p>
                        </div>
                        <div className="float-right">
                            <CustomRangeDatepickerWidget inline={false}
                                initStart={startDate}
                                initEnd={endDate}
                                onSelectRange={onSelectRangeDatepickerHandler} />
                        </div>
                    </div>
                </div>
                <NewBar
                    data={data}
                    height={400}
                    options={{
                        tooltips: {
                            enabled: false,
                            custom: customTooltip
                        },
                        maintainAspectRatio: false,
                        onHover: (event, chartElement) => {
                            event.target.style.cursor = chartElement[0]
                                ? "pointer"
                                : "default";
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                        userCallback: function (value, index, values) {
                                            value = value.toString();
                                            value = value.split(/(?=(?:...)*$)/);
                                            value = value.join(",");
                                            return value;
                                        }
                                    }
                                }
                            ]
                        }
                    }}
                    onElementsClick={elems => {
                        if (hrefLinks[elems[0]?._index]) {
                            history.push(hrefLinks[elems[0]._index]);
                        }
                    }}
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        authData: {
            accessToken: state.auth.accessToken
        },
        clinicData: {
            clinicID: state.clinic.viewingClinicID,
            topCompanyVisit: state.clinic.clinicTopCompanyVisit
        }
    };
};

export default connect(mapStateToProps, { getTopCompanyVisit })(
    ClinicOverviewTopCompany
);
