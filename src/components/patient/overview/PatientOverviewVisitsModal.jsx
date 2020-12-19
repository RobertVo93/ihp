/* eslint import/no-webpack-loader-syntax: off */
import React, { useState, useEffect } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Card,
	CardTitle,
	CardBody,
	CardText
} from "reactstrap";
import CMActions from "redux/claimmanagers/actions";
import ClinicActions from "redux/clinic/actions";
import { connect } from "react-redux";
import ClinicOverviewDrugsTable from "components/clinic/overview/ClinicOverviewDrugsTable";
import ClinicOverviewProceduresTable from "components/clinic/overview/ClinicOverviewProceduresTable";
const { getClaimDetailsAndHistory } = CMActions;
const { getDrugsAndProcedures } = ClinicActions;

const PatientOverviewVisitsModal = props => {
	const [modal, setmodal] = useState(true);
	const [claimInfor, setClaimInfo] = useState([]);
	const [claimHistory, setClaimHistory] = useState([]);
	const closeModal = modal => {
		props.callbackClose();
	};

	useEffect(() => {
		//update the data
		setmodal(true);
		props.getClaimDetailsAndHistory(props.authData, props.visitId);
		props.getDrugsAndProcedures(props.authData, props.visitId);
	}, [props.visitId]);

	useEffect(() => {
		setClaimInfo(props.cmData.claimDetailsAndHistory[1]);
		setClaimHistory(props.cmData.claimDetailsAndHistory[0]);
	}, [props.cmData.claimDetailsAndHistory]);

	const currentVisit = props.patientData.visits.find(
		val => val.RocNo === props.visitId
	);

	return (
		<div>
			<Modal
				isOpen={modal}
				toggle={closeModal}
				size="lg"
				onExit={closeModal}
				onClosed={closeModal}
			>
				<ModalHeader toggle={() => setmodal(!modal)}>
					Claim: {props.visitId}
				</ModalHeader>
				<ModalBody>
					<Card style={{ marginBottom: 20 }}>
						<CardBody>
							<CardTitle style={{ textAlign: "center" }}>
								Claim Information
              				</CardTitle>
							<CardText>
								<h6>Claimant Name: {claimInfor && claimInfor[0]?.EmpName}</h6>
								<h6>
									Bill Size (Claims Incurred): $
                  					{currentVisit.VType === "Non Panel"
										? currentVisit.AmtPaid
										: currentVisit.Fee}
								</h6>
								<h6>Claim Paid (Payable amount): ${currentVisit.AmtPaid}</h6>
								<h6>
									Visit Date (Admission Date / ROC Date):{" "}
									{claimInfor && claimInfor[0]?.ROCDate}
								</h6>
								<h6>
									Status of Claim:{" "}
									{claimHistory &&
										claimHistory[claimHistory.length - 1] &&
										claimHistory[claimHistory.length - 1].ClaimStatus}
								</h6>
							</CardText>
						</CardBody>
					</Card>

					<Card style={{ marginBottom: 20 }}>
						<CardBody>
							<CardTitle style={{ textAlign: "center" }}>
								Drugs Information
              				</CardTitle>
							<ClinicOverviewDrugsTable
								drugs={props.drugsAndProcedures.data.filter(
									val =>
										val.ROCNo === props.visitId &&
										(val.IOTType === "S" || val.IOTType === "E") &&
										val.VType === currentVisit.VType
								)}
							/>
						</CardBody>
					</Card>

					<Card>
						<CardBody>
							<CardTitle style={{ textAlign: "center" }}>
								Procedures Information
              				</CardTitle>
							<ClinicOverviewProceduresTable
								procedures={props.drugsAndProcedures.data.filter(
									val =>
										val.ROCNo === props.visitId &&
										val.IOTType === "O" &&
										val.VType === currentVisit.VType
								)}
							/>
						</CardBody>
					</Card>
				</ModalBody>
				<ModalFooter>
					<Button className="c-secondary" onClick={() => closeModal(!modal)}>
						Cancel
          			</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		authData: {
			accessToken: state.auth.accessToken
		},
		cmData: {
			claimDetailsAndHistory: state.claimmanagers.claimDetailsAndHistory
		},
		patientData: {
			patientID: state.patient.viewingPatientID,
			visits: state.patient.patientVisits
		},
		drugsAndProcedures: {
			data: state.clinic.clinicDrugsAndProcedures
		}
	};
};

export default connect(mapStateToProps, {
	getClaimDetailsAndHistory,
	getDrugsAndProcedures
})(PatientOverviewVisitsModal);
