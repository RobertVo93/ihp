import React, { useState, useEffect } from 'react';
import chroma from "chroma-js";
import { connect } from 'react-redux';
import { Doughnut } from "react-chartjs-2";
import CMActions from "redux/claimmanagers/actions";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";

const { getTopClassifications } = CMActions;

const CMTopClassifications = props => {
    //Define states
    const [incomingData, setIncData] = useState([]);
    const [data, setData] = useState({ labels: '', datasets: [] });
    const [chartLoading, setChartLoading] = useState(false);

    /**
     * ComponentDidMount
     */
    useEffect(() => {
        //show chart loading
        setChartLoading(true);
        async function fetchData() {
            await props.getTopClassifications(props.authData);
            //Hide chart loading after data load completed
            setChartLoading(false);
        }
        fetchData();
    }, []);

    /**
     * ComponentDidUpdate
     * Observe object: props.cmData.topClassifications
     */
    useEffect(() => {
        setIncData(props.cmData.topClassifications);
    }, [props.cmData.topClassifications]);

    /**
     * ComponentDidUpdate
     * Observe object: IncomingData
     */
    useEffect(() => {
        if (incomingData == null || incomingData.length == 0) return;
        let labels = [];
        let data = [];
        //Convert data to chart's data with classification is acute
        for (var i = 0; i < incomingData.length; i++) {
            if (incomingData[i].Classification == "Acute") {
                if (incomingData[i].Classification == null) continue;
                labels.push(incomingData[i].Classification);
                data.push(incomingData[i].SCount);
                break;
            }
        }
        //Convert data to chart's data with classification is chronic
        for (var i = 0; i < incomingData.length; i++) {
            if (incomingData[i].Classification == "Chronic") {
                if (incomingData[i].Classification == null) continue;
                labels.push(incomingData[i].Classification);
                data.push(incomingData[i].SCount);
                break;
            }
        }
        //config chart's data
        const dataTemp = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: ["#F16548", "#219653"],
                    hoverBackgroundColor: [
                        chroma("#F16548").alpha(0.8).css(),
                        chroma("#219653").alpha(0.8).css()
                    ]
                }
            ]
        };
        //Update states
        setData(dataTemp);
    }, [incomingData]);

    return (
        <div>
            <div className="roe-card-style mt-15 mb-5 chart-loading-container">
                <ChartLoading isLoading={chartLoading} style={{ borderRadius: '6px' }} />
                <div className="roe-card-header">
					<div className="row header-container">
						<div className="float-left">
							<p className="card-main-header">Top Classifications (By Visit Count)</p>
							<p className="card-sub-header">Overview of all time</p>
						</div>
					</div>
				</div>
                <Doughnut data={data} height={150} options={{
                    tooltips: {
                        enabled: false,
                        custom: customTooltip
                    },
                    legend: { display: true, position: "bottom" } 
                }} />
                <div className="mb-100"></div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        authData: {
            accessToken: state.auth.accessToken,
        },
        cmData: {
            topClassifications: state.claimmanagers.topClassifications
        }
    };
};

export default connect(
    mapStateToProps,
    { getTopClassifications }
)(CMTopClassifications);