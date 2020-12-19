import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ClinicActions from "redux/clinic/actions";
import { connect } from "react-redux";
import DoctorAllClaimsDetailsTable from "./DoctorAllClaimsDetailsTable";
const { getAllClaimsOfDoctorInClinic } = ClinicActions;

const DoctorAllClaimsDetailsModal = props => {
	const [tableData, setTableData] = useState([]);
	const [modal, setmodal] = useState(true);
	const [incomingData, setIncData] = useState([]);

	/**
	 * Close modal
	 */
	const closeModal = () => {
		props.callbackClose();
	};

	/**
	 * componentDidMount
	 */
	useEffect(() => {
		//get all claims of the selected doctor in a clinic
		props.getAllClaimsOfDoctorInClinic(
			props.authData,
			props.clinicID,
			props.doctorValue
		);
	}, []);

	/**
	 * componentDidUpdate of claims
	 */
	useEffect(() => {
		setIncData(props.claims);
	}, [props.claims]);

	/**
	 * componentDidUpdate of incommingData
	 */
	useEffect(() => {
		if (incomingData == null || incomingData.length <= 0) return;
		let newTableData = [];
		//Update value for displaying table
		for (var i = 0; i < incomingData.length; i++) {
			newTableData.push({
				no: i + 1,
				ROCNo: incomingData[i].ROCNo,
				claimantName: incomingData[i].EmpName,
				SClaims: incomingData[i].SClaims,
				VisitDate: incomingData[i].VisitDate
			});
		}
		setTableData(newTableData);
	}, [incomingData]);

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
					Doctor Details and All Claims: {props.doctorValue}
				</ModalHeader>
				<ModalBody>
					<h5>Doctor Details</h5>
					<p>Doctor: {props.doctorValue}</p>
					<p>Sum of claims: {props.SClaims}</p>
					<p>Top diagnosis: {props.Diagnosis}</p>
					<hr />
					<h5 className="mb-15">All Claims</h5>
					{tableData.length > 0 && (
						<DoctorAllClaimsDetailsTable tableData={tableData} />
					)}
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
		claims: state.clinic.allClaimsOfDoctor
	};
};

export default connect(mapStateToProps, { getAllClaimsOfDoctorInClinic })(
	DoctorAllClaimsDetailsModal
);
