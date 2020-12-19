import React from "react";
import chroma from "chroma-js";
import { Doughnut } from "react-chartjs-2";

const DoughnutChartComponent = ({ sidebarTheme }) => {
    const data = {
        labels: ["USA", "INDIA", "AUSTRALIA"],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ["#F16548", "#219653", "#6E1C74"],
                hoverBackgroundColor: [
                    chroma("#F16548").alpha(0.8).css(),
                    chroma("#219653").alpha(0.8).css(),
                    chroma("#6E1C74").alpha(0.8).css()
                ]
            }
        ]
    };

    return (
        <div>
            <Doughnut data={data} height={100} />
        </div>
    );
};

export default DoughnutChartComponent;
