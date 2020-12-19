import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	MiniWidget,
	MiniWidgetLink
} from "components/widgets/statisticswidgets";
import AMActions from "redux/accountmanagers/actions";
import { numberFormat } from "helper/numberFormat";
const { getDashboard } = AMActions;

const AMTopDashboard = props => {
	//call apis
	const [totalLives, setTotalLives] = useState(0);
	const [totalActiveLives, setTotalActiveLives] = useState(0);
	const [topCompanyLives, setTopCompanyLives] = useState({});
	const [topUtilization, setTopUtilization] = useState({});

	useEffect(() => {
		//update the data
		props.getDashboard(props.authData);
	}, []);

	useEffect(() => {
		//update the data
		if (
			props.amData.topDashboard == null ||
			props.amData.topDashboard.length == 0
		)
			return;

		setTotalLives(props.amData.topDashboard[0][0].ECount);
		setTotalActiveLives(props.amData.topDashboard[1][0].ECount);
		setTopCompanyLives(props.amData.topDashboard[2][0]);
		setTopUtilization(props.amData.topDashboard[3][0]);
	}, [props.amData.topDashboard]);

	return (
		<div>
			<div className="row mlr-0" style={{ marginTop: "-15px" }}>
				<div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 ptb-15">
					<MiniWidget
						iconName="fas fa-envelope"
						iconColor="#6200ea"
						background="white"
						className="demo"
						headline={numberFormat(totalLives)}
						subheader="Total Lives"
						rightIcon
					/>
				</div>

				<div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 ptb-15">
					<MiniWidget
						iconName="fas fa-ticket-alt"
						iconColor="#00c853"
						background="white"
						className="demo"
						headline={numberFormat(totalActiveLives)}
						subheader="Total Active Lives"
						rightIcon
					/>
				</div>

				<div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 ptb-15">
					<MiniWidgetLink
						iconName="fas fa-shopping-cart"
						iconColor="#ffa000"
						background="white"
						className="demo"
						headline={topCompanyLives.ECount}
						linkDisplay={topCompanyLives.CompanyName}
						linkRef={"/company-details/overview/" + topCompanyLives.CompanyID}
						subheader={"Top Company Lives"}
						rightIcon
					/>
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
		amData: {
			topDashboard: state.accountmanagers.topDashboardData
		}
	};
};

export default connect(mapStateToProps, { getDashboard })(AMTopDashboard);
