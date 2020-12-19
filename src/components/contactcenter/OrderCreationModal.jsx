/* eslint import/no-webpack-loader-syntax: off */
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CCActions from "redux/contactcenter/actions";
import classnames from "classnames";
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import DatePicker from "react-datepicker";
import Select from "react-select";
import { convertDateTimeToServer } from 'util/constant_methods';
import DatepickerWrapper from "components/forms/alldatepickers/datepicker.style";
import "react-datepicker/dist/react-datepicker.css";

import {
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Badge
} from "reactstrap";
const { createUnderwritingOrder, getPatientDetails } = CCActions;



const OrderCreationModal = props => {
    const [modal, setmodal] = useState(false);
    const [confirmationModal, setCM] = useState(false);
    const [errorModal, setEM] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [viewingOrder, setViewingOrder] = useState({});

    const [orderNo, setON] = useState("");
    const [patientName, setPN] = useState("");
    const [patientNRIC, setPNRIC] = useState("");
    const [contactNo, setCN] = useState("");
    const [dateReceived, setDR] = useState("");
    const [service, setService] = useState("");
    const [insurer, setInsurer] = useState({ value: "FWD", label: "FWD" });
    const [certificateNo, setCert] = useState("");
    const [agentCode, setAC] = useState("");
    const [agentName, setAN] = useState("");

    const closeModal = modal => {
        //setmodal(modal);
        props.modalCallback(false);
    }

    //validation
    const startCreation = () => {
        if (orderNo == null || orderNo == "") {
            setEM(true);
            setErrorMessage("Please fill in Order Number");
            return;
        }
        if (patientName == null || patientName == "") {
            setEM(true);
            setErrorMessage("Please fill in Patient Name");
            return;
        }
        if (patientNRIC == null || patientNRIC == "") {
            setEM(true);
            setErrorMessage("Please fill in Patient NRIC");
            return;
        }
        if (contactNo == null || contactNo == "") {
            setEM(true);
            setErrorMessage("Please fill in ContactNumber");
            return;
        }
        if (dateReceived == null || dateReceived == "") {
            setEM(true);
            setErrorMessage("Please fill in Date Received");
            return;
        }
        if (service == null || service == "") {
            setEM(true);
            setErrorMessage("Please fill in Services");
            return;
        }
        if (insurer == null || insurer == "") {
            setEM(true);
            setErrorMessage("Please fill in Insurer");
            return;
        }
        if (certificateNo == null || certificateNo == "") {
            setEM(true);
            setErrorMessage("Please fill in Certificate Number");
            return;
        }
        /*if(agentCode == ""){
            setEM(true);
            setErrorMessage("Please fill in Agent Code");
            return;
        }
        if(agentName == ""){
            setEM(true);
            setErrorMessage("Please fill in Agent Name");
            return;
        }*/
        setCM(true);
    }

    const checkPatient = () => {
        if (patientNRIC.length < 4) {
            setEM(true);
            setErrorMessage("Please enter a valid NRIC");
        }
        props.getPatientDetails(props.authData, patientNRIC, patientDetailsCallback);
    }

    const patientDetailsCallback = (success, pObject) => {
        if (success) {
            setPN(pObject.Name);
        } else {
            setPN("");
            setEM(true);
            setErrorMessage("Cannot find member");
        }
    }

    const confirmCreation = () => {
        //truly confirmed / CALL API
        setCM(false);
        let uwObject = {
            orderNo: orderNo,
            patientName: patientName,
            patientIC: patientNRIC,
            contactNo: contactNo,
            dateReceived: dateReceived,
            service: service,
            insurer: insurer.value,
            certificateNo: certificateNo,
            agentCode: agentCode,
            agentName: agentName,
            cb: APICallback
        }
        uwObject.dateReceived = convertDateTimeToServer(uwObject.dateReceived);
        props.createUnderwritingOrder(props.authData, uwObject);

    }

    const APICallback = (success, message) => {
        if (success) {
            props.successCallback(message);
            closeModal();
        } else {
            setEM(true);
            setErrorMessage(message);
            return;
        }
    }

    const toggleError = () => {
        setEM(false);
    }

    const handleChangeInsurer = (e) => {
        setInsurer(e);
    }

    const handleChangeDate = date => {
        setDR(date);
    }

    let handleChange = (e) => {
        switch (e.target.id) {
            case "orderNo":
                setON(e.target.value);
                break;
            case "patientName":
                setPN(e.target.value);
                break;
            case "patientNRIC":
                setPNRIC(e.target.value);
                break;
            case "contactNo":
                setCN(e.target.value);
                break;
            case "service":
                setService(e.target.value);
                break;
            case "certificateNo":
                setCert(e.target.value);
                break;
            case "agentCode":
                setAC(e.target.value);
                break;
            case "agentName":
                setAN(e.target.value);
                break;
        }
    }

    /*useEffect(() =>{
        setViewingEscalation(props.escalationObject);
        console.log(props.escalationObject);
        setmodal(true);
        setTD(props.escalationObject.TreatingDoctors == null ? "" : props.escalationObject.TreatingDoctors );
        setUC(props.escalationObject.UnderlyingConditions == null ? "" : props.escalationObject.UnderlyingConditions);
    },[props.escalationObject]);
*/
    useEffect(() => {
        setmodal(props.modalShow);
    }, [props.modalShow]);
    return (
        <DatepickerWrapper {...props}>
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
                        confirmCreation();
                    }}
                    onCancel={() =>
                        setCM(false)
                    }
                ></SweetAlert>

                <Modal
                    isOpen={modal}
                    toggle={closeModal}
                    size="lg"
                    onExit={closeModal}
                    onClosed={closeModal}
                >
                    <ModalHeader toggle={() => setmodal(!modal)}>Underwriting Order Creation</ModalHeader>
                    <ModalBody>
                        <h5 class="mb-10">Patient Information</h5>
                        <Form>
                            <FormGroup row>
                                <Label for="patientNRIC" sm={3}>
                                    Patient NRIC*
                                </Label>
                                <Col sm={6}>
                                    <Input type="text" name="patientNRIC" id="patientNRIC" value={patientNRIC} onChange={e => handleChange(e)} />
                                </Col>
                                <Col sm={3}>
                                    <Button onClick={() => checkPatient()} className="success" size="sm ml-10">Check</Button>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="patientName" sm={3}>
                                    Patient Name*
                                </Label>
                                <Col sm={9}>
                                    <Input type="text" name="patientName" id="patientName" value={patientName} onChange={e => handleChange(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="contactNo" sm={3}>
                                    Contact Number
                                </Label>
                                <Col sm={9}>
                                    <Input type="text" name="contactNo" id="contactNo" value={contactNo} onChange={e => handleChange(e)} />
                                </Col>
                            </FormGroup>
                        </Form>
                        <hr />
                        <h5 class="mb-10">Order Information</h5>
                        <Form>
                            <FormGroup row>
                                <Label for="insurer" sm={3}>
                                    Select Insurer*
                                </Label>
                                <Col sm={9}>
                                    <Select type="select" name="select" id="insurer" value={insurer} onChange={e => handleChangeInsurer(e)}
                                        options={[{ value: "FWD", label: "FWD" }, { value: "Manulife", label: "Manulife" }, { value: "Zurich", label: "Zurich" }]}>
                                    </Select>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="orderNo" sm={3}>
                                    Order Number*
                                </Label>
                                <Col sm={9}>
                                    <Input type="text" name="orderNo" id="orderNo" value={orderNo} onChange={e => handleChange(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="patientName" sm={3}>
                                    Certificate Number*
                                </Label>
                                <Col sm={9}>
                                    <Input type="text" name="certificateNo" id="certificateNo" value={certificateNo} onChange={e => handleChange(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="agentCode" sm={3}>
                                    Agent Code
                                </Label>
                                <Col sm={9}>
                                    <Input type="text" name="agentCode" id="agentCode" value={agentCode} onChange={e => handleChange(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="agentName" sm={3}>
                                    Agent Name
                                </Label>
                                <Col sm={9}>
                                    <Input type="text" name="agentName" id="agentName" value={agentName} onChange={e => handleChange(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="service" sm={3}>
                                    Services*
                                </Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="service" id="service" value={service} onChange={e => handleChange(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="dateReceived" sm={3}>
                                    Date Received*
                                </Label>
                                <Col sm={9}>
                                    <DatePicker sm={9}
                                        selected={dateReceived}
                                        onChange={handleChangeDate}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                    />
                                </Col>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button className="c-success" onClick={() => startCreation()}>
                            Confirm Creation
                        </Button>
                        <Button className="c-secondary" onClick={() => closeModal(!modal)}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>

            </div>
        </DatepickerWrapper>

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
    { createUnderwritingOrder, getPatientDetails }
)(OrderCreationModal);

