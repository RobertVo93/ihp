/* eslint import/no-webpack-loader-syntax: off */
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MedActions from "redux/medicalescalations/actions";
import MedicalEscalationsConfirmationModal from "components/medicalescalations/MedicalEscalationsPopupModal";
import { checkPermissions, convertDateTime } from 'util/constant_methods';
import { connect } from 'react-redux';
import { Badge } from "reactstrap";
import MedicalEscalationHistoryTable from "components/medicalescalations/MedicalEscalationHistoryTable";
import ChattingBoardWrapper from "./chattngboard.style";
import SweetAlert from 'react-bootstrap-sweetalert';

const { getEscalationHistory, getEscalationFile } = MedActions;

const MedicalEscalationsModal = props => {
    const [modal, setmodal] = useState(false);
    const [showCM, setShowCM] = useState(false);
    const [viewingEscalation, setViewingEscalation] = useState({});
    const [escalationHistory, setEscalationHistory] = useState([]);
    const [modalType, setModalType] = useState("Confirmation");
    const [successMessage, setSM] = useState("Escalation Succesful!");
    let escalationHistory2 = [];
    //show success
    const [showSM, setShowSM] = useState(false);

    const closeModal = modal => {
        //setmodal(modal);
        props.callbackClose();
    }

    const closeConfirmationModal = () => {

        setShowCM(false);
    }

    const openConfirmationModal = (type) => {
        setModalType(type);
        setShowCM(true);
    }

    const successCallback = (message) => {
        setSM(message);
        setShowSM(true);
    }

    const refreshPage = () => {
        closeModal(true);
        props.callbackSuccess();
    }

    useEffect(() => {
        setViewingEscalation(props.escalationObject);
        //get escalation history
        props.getEscalationHistory(props.authData, props.escalationObject.RocNo);

    }, [props.escalationObject]);

    useEffect(() => {
        if (props.escalationData == null || props.escalationData.history.length == 0) return;
        let escalationDataTemp = JSON.parse(JSON.stringify(props.escalationData.history));
        for (var i = 0; i < escalationDataTemp.length; i++) {
            escalationDataTemp[i].no = (i + 1).toString();
            escalationDataTemp[i].ModifiedDate = convertDateTime(escalationDataTemp[i].ModifiedDate);
        }
        setEscalationHistory(escalationDataTemp);
        setmodal(true);
    }, [props.escalationData.history]);

    const getBadgeColor = (type) => {
        switch (type) {
            case "Trace":
                return "info";
            case "Upload File":
                return "success";
            case "Comment":
                return "primary";
            case "Creation":
                return "info";
            case "Approved":
                return "success";
            case "Pending GL Team":
                return "warning";
            case "Pending Medical Review":
                return "warning";
            case "Pending Escalation":
                return "warning";
            case "Rejected":
                return "success";
            default:
                return "warning";
        }
    }

    const checkRepeat = (index) => {
        if (index == 0) return true;
        if (escalationHistory[index].ModifiedDate == escalationHistory[index - 1].ModifiedDate && escalationHistory[index].Name == escalationHistory[index - 1].Name) {
            return false;
        }
        return true;
    }

    const downloadFile = (id, fn, ct) => {
        props.getEscalationFile(props.authData, id, fn, ct);
    }

    return (
        <div>
            <SweetAlert
                success
                show={showSM}
                title={successMessage}
                onConfirm={() => {
                    refreshPage();
                    setShowSM(false);
                }
                }
                confirmBtnCssClass="sweet-alert-confirm-button"
                cancelBtnCssClass="sweet-alert-cancel-button"
            >
                Confirmation successful!
                </SweetAlert>
            {showCM &&
                <MedicalEscalationsConfirmationModal
                    callbackClose={closeConfirmationModal}
                    escalationObject={viewingEscalation}
                    callbackSuccess={successCallback}
                    type={modalType}
                    centered
                />
            }
            {viewingEscalation.RocNo != null &&
                <Modal
                    isOpen={modal}
                    toggle={closeModal}
                    size="lg"
                    onExit={closeModal}
                    onClosed={closeModal}
                    style={{ maxWidth: '1600px', width: '90%' }}
                >
                    <ModalHeader toggle={() => setmodal(!modal)}>Escalation Details for: {viewingEscalation.RocNo} <Badge className={"c-" + getBadgeColor(viewingEscalation.Status)}>{viewingEscalation.Status}</Badge></ModalHeader>
                    <ModalBody>
                        <h5>Claimant and Policy Details</h5>
                        <p><b>Name of Insured:</b> {viewingEscalation.Name}</p>
                        <p><b>NRIC of Insured:</b> {viewingEscalation.NRIC}</p>
                        <p><b>Policy Number:</b> {viewingEscalation.PolicyNo}</p>
                        <p><b>Policy Effective Date:</b> {viewingEscalation.EffectiveDate}</p>
                        <p><b>Policy Reinstatement Date:</b> {viewingEscalation.ReinstDate == null ? "N/A" : viewingEscalation.ReinstDate}</p>
                        <p><b>Policy Exclusion / Waiver / Endorsement:</b> {viewingEscalation.PolicyExclusion == "" ? "N/A" : viewingEscalation.PolicyExclusion}</p>
                        <hr />
                        <h5>Claim Details</h5>
                        <p><b>Hospital Name:</b> {viewingEscalation.HospitalName}</p>
                        <p><b>Admission Date:</b> {viewingEscalation.AdmissionDate}</p>
                        <p><b>Discharge Date:</b> {viewingEscalation.DischargeDate}</p>
                        <p><b>Treating Doctors:</b> {viewingEscalation.TreatingDoctors == null ? "N/A" : viewingEscalation.TreatingDoctors}</p>
                        <p><b>Underlying Conditions:</b> {viewingEscalation.UnderlyingConditions == null ? "N/A" : viewingEscalation.UnderlyingConditions}</p>
                        <p><b>Reason for Escalation:</b> {viewingEscalation.ReasonForEscalation}</p>
                        <hr />
                        <h6><b>Diagnosis Information</b></h6>
                        {JSON.parse(viewingEscalation.Diagnosis).map((value, index) => {
                            return <p key={index}>{value.ICDDesc}</p>
                        })}
                        <hr />
                        <h6><b>Procedures Information</b></h6>
                        {JSON.parse(viewingEscalation.Procedures).length == 0 && <p>None</p>}
                        {JSON.parse(viewingEscalation.Procedures).map((value, index) => {
                            return <p key={index}>{value.TrDesc + "(" + value.hspVisitType + ")"}</p>
                        })}
                        <hr />
                        <h6><b>Non Payable Items Information</b></h6>
                        {JSON.parse(viewingEscalation.NonPayableItems).length == 0 && <p>None</p>}
                        {JSON.parse(viewingEscalation.NonPayableItems).map((value, index) => {
                            return <p key={index}>{value.TrDesc + "(" + value.hspVisitType + ")"}</p>
                        })}
                        <hr />
                        <h6><b>Medical Team Recommendations</b></h6>
                        <p>{viewingEscalation.Recommendation == null ? "N/A" : viewingEscalation.Recommendation}</p>
                        <hr />
                        <h6><b>Escalation History and Chats</b></h6>
                        {escalationHistory && <MedicalEscalationHistoryTable
                            downloadFileMethod={downloadFile}
                            escHistory={escalationHistory}
                        />}
                    </ModalBody>
                    <ModalFooter>
                        {(checkPermissions(props.authData.permissions, "confirm_escalation") && viewingEscalation.Status == "Pending Escalation") &&
                            <Button className="c-success" onClick={() => openConfirmationModal("Confirmation")}>
                                Confirm Escalation
                        </Button>}
                        {(checkPermissions(props.authData.permissions, "confirm_escalation") && viewingEscalation.Status == "Pending GL Team") &&
                            <Button className="c-success" onClick={() => openConfirmationModal("Confirmation")}>
                                Reply
                        </Button>}
                        {(checkPermissions(props.authData.permissions, "review_escalation") && viewingEscalation.Status == "Pending Medical Review") &&
                            <Button className="c-success" onClick={() => openConfirmationModal("Review")}>
                                Review Escalation
                        </Button>}
                        <Button className="c-secondary" onClick={() => closeModal(!modal)}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authData: {
            accessToken: state.auth.accessToken,
            permissions: state.auth.permissions
        },
        escalationData: {
            history: state.escalations.escalationHistory
        }
    };
};

export default connect(
    mapStateToProps,
    { getEscalationHistory, getEscalationFile }
)(MedicalEscalationsModal);

