import React from 'react';
import { Bar } from "react-chartjs-2";

function withChartSizeControl(Component) {
	return props => (
		<div
			className="chart"
			style={{
				position: "relative"
				, height: props.height + "px"
				, width: props.width + "px"
			}}
		>
			<Component {...props} />
		</div>
	);
}

export default withChartSizeControl(Bar);