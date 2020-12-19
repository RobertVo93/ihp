/* eslint import/no-webpack-loader-syntax: off */
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CMActions from "redux/claimmanagers/actions";
import CMClaimsDetailsHistoryTable from "components/claimmanagers/earlywarning/CMClaimsDetailsHistoryTable";
import classnames from "classnames";
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
import Select from "react-select";

const MedicalEscalationsFileUploadModal = props => {
    const [modal, setmodal] = useState(false);
    const [viewingEscalation, setViewingEscalation] = useState({});
    const [selectedType, setSelectedType] = useState({ value: "Final Bill", label: "Final Bill" });
    const [selectedFile, setSelectedFile] = useState({});
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const closeModal = modal => {
        //setmodal(modal);
        props.callbackClose();
    }

    const handleChangeType = (e) => {
        setSelectedType(e);
    }

    const onFileSelected = event => {
        setSelectedFile(event.target.files[0]);
    }

    const confirmFile = () => {
        if (selectedFile.name == null) {
            setShowError(true);
            setErrorMessage("Please select a valid file");
        } else {
            selectedFile.fType = selectedType.value;
            props.callbackSuccess(selectedFile);
            props.callbackClose();
        }
    }

    const toggleError = () => {
        setShowError(false);
    }

    useEffect(() => {
        setViewingEscalation(props.escalationObject);
        setmodal(true);
    }, [props.escalationObject]);

    return (
        <div>
            <SweetAlert
                title="Error"
                onConfirm={toggleError}
                show={showError}
            >
                <div>
                    {errorMessage}
                </div>
            </SweetAlert>
            {viewingEscalation.RocNo != null &&
                <Modal
                    isOpen={modal}
                    toggle={closeModal}
                    size="lg"
                    onExit={closeModal}
                    onClosed={closeModal}
                >
                    <ModalHeader toggle={() => setmodal(!modal)}>Upload File for: {viewingEscalation.RocNo} <Badge className="c-warning">{viewingEscalation.Status}</Badge></ModalHeader>
                    <ModalBody>
                        <h5 class="mb-10">Select File Details</h5>
                        <Form>
                            <FormGroup row>
                                <Label style={{ paddingLeft: "40px" }} for="fileTypeSelect" sm={3}>
                                    Select File Type
                                </Label>
                                <Col sm={9}>
                                    <Select type="select" name="select" id="fileTypeSelect" value={selectedType} onChange={e => handleChangeType(e)}
                                        options={[{ value: "Imaging Test", label: "Imaging Test" }, { value: "Final Bill", label: "Final Bill" }, { value: "Others", label: "Others" }]}>
                                    </Select>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label style={{ paddingLeft: "40px" }} for="selectedFile" sm={3}>
                                    Select a File
                                </Label>
                                <Col sm={9}>
                                    <Input type="file" name="file" id="selectedFile" onChange={e => onFileSelected(e)} />
                                    <FormText color="muted">
                                        Accepts .png, .jpg, .jpeg, .pdf, .word, .xlsx formats.
                                    </FormText>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="c-success" onClick={() => confirmFile()}>
                            Confirm Upload File
                        </Button>
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
    {}
)(MedicalEscalationsFileUploadModal);
