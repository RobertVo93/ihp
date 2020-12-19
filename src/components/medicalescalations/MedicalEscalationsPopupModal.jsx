/* eslint import/no-webpack-loader-syntax: off */
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MedActions from "redux/medicalescalations/actions";
import MedicalEscalationsFileUploadModal from "components/medicalescalations/MedicalEscalationsFileUploadModal";
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import {
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Badge
} from "reactstrap";
const { confirmEscalationAction, confirmReview } = MedActions;

const MedicalEscalationsConfirmationModal = props => {
    const [modal, setmodal] = useState(false);
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [confirmationModal, setCM] = useState(false);
    const [errorModal, setEM] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [viewingEscalation, setViewingEscalation] = useState({});
    const [fileArray, setFileArray] = useState([]);

    //Time
    const [modalType, setMT] = useState("Confimation");
    const [reviewType, setRT] = useState("Approve");

    const [treatingDoctors, setTD] = useState("");
    const [underlyingConditions, setUC] = useState("");
    const [otherComments, setOC] = useState("");

    const closeModal = modal => {
        //setmodal(modal);
        props.callbackClose();
    }

    const confirmEsc = () => {
        if (treatingDoctors == "") {
            setEM(true);
            setErrorMessage("Please fill in Treating Doctors");
            return;
        }
        if (underlyingConditions == "") {
            setEM(true);
            setErrorMessage("Please fill in Underlying Conditions");
            return;
        }
        setCM(true);
    }

    const confirmRev = (type) => {
        if (otherComments == "") {
            setEM(true);
            setErrorMessage("Please fill in Other Comments");
            return;
        }
        setRT(type);
        setCM(true);
    }

    const confirmEscalation = () => {
        //truly confirmed / CALL API
        setCM(false);
        let fileTypes = [];
        for (var i = 0; i < fileArray.length; i++) {
            fileTypes.push(fileArray[i].fType);
        }
        let escObject = {
            files: fileArray,
            treatingDoctors: treatingDoctors,
            rocNo: viewingEscalation.RocNo,
            underlyingConditions: underlyingConditions,
            otherComments: otherComments,
            escID: viewingEscalation.EID,
            fileTypes: fileTypes,
            patientName: viewingEscalation.Name,
            escalating: (viewingEscalation.Status == "Pending Escalation" ? 1 : 0),
            cb: APICallback
        }
        props.confirmEscalationAction(props.authData, escObject);
    }

    const confirmReview = () => {
        //truly confirmed / CALL API
        setCM(false);
        let fileTypes = [];
        for (var i = 0; i < fileArray.length; i++) {
            fileTypes.push(fileArray[i].fType);
        }
        let reviewObject = {
            files: fileArray,
            rocNo: viewingEscalation.RocNo,
            otherComments: otherComments,
            escID: viewingEscalation.EID,
            fileTypes: fileTypes,
            reviewType: reviewType,
            patientName: viewingEscalation.Name,
            cb: APICallback
        }
        props.confirmReview(props.authData, reviewObject);
    }

    const APICallback = (success, message) => {
        if (success) {
            props.callbackSuccess(message);
            closeModal();
        } else {
            setEM(true);
            setErrorMessage("There is an issue with the Server.");
            return;
        }
    }

    const toggleError = () => {
        setEM(false);
    }

    const startFileUpload = () => {
        setShowFileUpload(true);
    }

    const closeFileUploadModal = () => {
        setShowFileUpload(false);
    }

    const addFileToArray = (file) => {
        let tempFileArray = fileArray;
        file.index = fileArray.length;
        tempFileArray.push(file);
        setFileArray(tempFileArray);
    }
    const removeFile = (index) => {
        let tempFileArray = JSON.parse(JSON.stringify(fileArray));
        tempFileArray.splice(index, 1);
        setFileArray(tempFileArray);
    }

    let handleChange = (e) => {
        switch (e.target.id) {
            case "treatingDoctors":
                setTD(e.target.value);
                break;
            case "underlyingConditions":
                setUC(e.target.value);
                break;
            case "otherComments":
                setOC(e.target.value);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
    }, [fileArray]);

    useEffect(() => {
        setMT(props.type);
    }, [props.type]);

    useEffect(() => {
        setViewingEscalation(props.escalationObject);
        setmodal(true);
        setTD(props.escalationObject.TreatingDoctors == null ? "" : props.escalationObject.TreatingDoctors);
        setUC(props.escalationObject.UnderlyingConditions == null ? "" : props.escalationObject.UnderlyingConditions);
    }, [props.escalationObject]);

    return (
        <div>
            <SweetAlert
                title="Error"
                onConfirm={toggleError}
                show={errorModal}
            >
                <div>
                    {errorMessage}
                </div>
            </SweetAlert>
            <SweetAlert
                warning
                showCancel
                show={confirmationModal}
                confirmBtnText="Yes, Confirm!"
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="default"
                title="Are you sure?"
                onConfirm={() => {
                    if (viewingEscalation.Status == "Pending Escalation" || viewingEscalation.Status == "Pending GL Team") {
                        confirmEscalation();
                    } else {
                        confirmReview();
                    }
                }}
                onCancel={() =>
                    setCM(false)
                }
            ></SweetAlert>
            {showFileUpload &&
                <MedicalEscalationsFileUploadModal
                    callbackClose={closeFileUploadModal}
                    escalationObject={viewingEscalation}
                    callbackSuccess={addFileToArray}
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
                >
                    <ModalHeader toggle={() => setmodal(!modal)}>Confirm Escalation for: {viewingEscalation.RocNo} <Badge className="c-warning">{viewingEscalation.Status}</Badge></ModalHeader>
                    <ModalBody>
                        <h5 class="mb-10">Escalation Information</h5>
                        <Form>
                            {modalType == "Confirmation" &&
                                <FormGroup row>
                                    <Label for="treatingDoctors" sm={3}>
                                        Treating Doctors*
                                    </Label>
                                    <Col sm={9}>
                                        <Input type="textarea" name="treatingDoctors" id="treatingDoctors" value={treatingDoctors} onChange={e => handleChange(e)} />
                                    </Col>
                                </FormGroup>
                            }
                            {modalType == "Confirmation" &&
                                <FormGroup row>
                                    <Label for="underlyingConditions" sm={3}>
                                        Underlying Conditions*
                                </Label>
                                    <Col sm={9}>
                                        <Input type="textarea" name="underlyingConditions" id="underlyingConditions" value={underlyingConditions} onChange={e => handleChange(e)} />
                                    </Col>
                                </FormGroup>
                            }
                            <FormGroup row>
                                <Label for="otherComments" sm={3}>
                                    Other Comments
                                </Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="otherComments" id="otherComments" value={otherComments} onChange={e => handleChange(e)} />
                                    <FormText color="muted">
                                        Texts here will be added under a new comment entry.
                                    </FormText>
                                </Col>
                            </FormGroup>

                        </Form>
                        <hr />
                        <h5 class="mb-10">Files to be Uploaded</h5>
                        {fileArray.length == 0 && <p>No selected files</p>}
                        {fileArray.map((value, index) => {
                            return (
                                <div className="row ml-10 mb-15">
                                    <p key={index}>{value.name + " (" + value.fType + ")"}</p>
                                    <Button size="sm" className="c-danger ml-10" onClick={() => removeFile(value.index)}>Remove</Button>
                                </div>
                            )
                        })}
                        <Button className="c-success mt-10" onClick={() => startFileUpload()}>
                            Select File
                        </Button>

                    </ModalBody>
                    <ModalFooter>
                        {viewingEscalation.Status == "Pending Escalation" &&
                            <Button className="c-success" onClick={() => confirmEsc()}>
                                Confirm Escalation
                        </Button>
                        }
                        {viewingEscalation.Status == "Pending GL Team" &&
                            <Button className="c-success" onClick={() => confirmEsc()}>
                                Reply
                        </Button>
                        }
                        {viewingEscalation.Status == "Pending Medical Review" &&
                            <div>
                                <Button className="c-success" style={{ marginRight: "10px" }} onClick={() => confirmRev("Approve")}>
                                    Approve
                        </Button>
                                <Button className="c-danger" style={{ marginRight: "10px" }} onClick={() => confirmRev("Reject")}>
                                    Reject
                        </Button>
                                <Button className="c-danger" style={{ marginRight: "10px" }} onClick={() => confirmRev("Pending Information")}>
                                    Request for Information
                        </Button>
                            </div>
                        }
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
        },
    };
};

export default connect(
    mapStateToProps,
    { confirmEscalationAction, confirmReview }
)(MedicalEscalationsConfirmationModal);

