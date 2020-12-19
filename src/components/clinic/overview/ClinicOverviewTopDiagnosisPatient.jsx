import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { MiniWidgetLinkV1 } from "components/widgets/statisticswidgets";
import ClinicActions from "redux/clinic/actions";
import { moneyFormat, numberFormat } from "helper/numberFormat";
import { topPatientBg } from "helper/constant";
import { topDiagnosisBg } from "helper/constant";
const { getTopDiagnosis, getTopPatient } = ClinicActions;

const ClinicOverviewTopDiagnosisPatient = props => {
	//call apis
	const [topDiagObj, setTopDiagObj] = useState([]);
	const [topPatientObj, setTopPatientObj] = useState([]);
	const [topDiagnosisName, setTopDiagnosisName] = useState("None");
	const [topDiagnosisValue, setTopDiagnosisValue] = useState(0);
	const [topDiagnosisID, setTopDiagnosisID] = useState("None");
	const [topPatientName, setTopPatientName] = useState("None");
	const [topPatientValue, setTopPatientValue] = useState(0);
	const [topPatientID, setTopPatientID] = useState("None");

	useEffect(() => {
		//update the data
		props.getTopDiagnosis(props.authData, props.clinicData.clinicID);
		props.getTopPatient(props.authData, props.clinicData.clinicID);
	}, []);

	useEffect(() => {
		setTopDiagObj(props.clinicData.topDiagnosis);
	}, [props.clinicData.topDiagnosis]);

	useEffect(() => {
		setTopPatientObj(props.clinicData.topPatient);
	}, [props.clinicData.topPatient]);

	useEffect(() => {
		//update the data
		if (topDiagObj.length > 0) {
			setTopDiagnosisName(topDiagObj[0].Diagnosis);
			setTopDiagnosisValue(
				"$" +
				moneyFormat(topDiagObj[0].SClaims) +
				" (" +
				numberFormat(topDiagObj[0].SCount) +
				" Visits)"
			);
			setTopDiagnosisID(topDiagObj[0].ICDCD);
		}
	}, [topDiagObj]);

	useEffect(() => {
		//update the data
		if (topPatientObj.length > 0) {
			setTopPatientName(topPatientObj[0].PatientName);
			setTopPatientValue(
				"$" +
				moneyFormat(topPatientObj[0].SClaims) +
				" (" +
				numberFormat(topPatientObj[0].SCount) +
				" Visits)"
			);
			setTopPatientID(topPatientObj[0].NRIC);
		}
	}, [topPatientObj]);

	return (
		<div>
			<div className="row" style={{ marginTop: "-15px" }}>
				<div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 ptb-15">
					<MiniWidgetLinkV1
						background={topPatientBg}
						className="demo"
						headline={moneyFormat(topPatientValue)}
						linkDisplay={topPatientName}
						linkRef={"/patient/route/" + topPatientID + "/overview"}
						subheader={"Top Patient"}
					/>
				</div>

				<div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 ptb-15">
					<MiniWidgetLinkV1
						background={topDiagnosisBg}
						className="demo"
						headline={moneyFormat(topDiagnosisValue)}
						linkDisplay={topDiagnosisName}
						linkRef={"/diagnosis/route/" + topDiagnosisID + "/overview"}
						subheader={"Top Diagnosis"}
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
		clinicData: {
			clinicID: state.clinic.viewingClinicID,
			topDiagnosis: state.clinic.clinicTopDiagnosis,
			topPatient: state.clinic.clinicTopPatient
		}
	};
};

export default connect(mapStateToProps, { getTopDiagnosis, getTopPatient })(
	ClinicOverviewTopDiagnosisPatient
);
