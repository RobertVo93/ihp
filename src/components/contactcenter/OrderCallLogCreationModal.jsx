/* eslint import/no-webpack-loader-syntax: off */
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CCActions from "redux/contactcenter/actions";
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import Select from "react-select";
import DatePicker from "react-datepicker";
import { convertDateTimeToServer } from 'util/constant_methods';
import "react-datepicker/dist/react-datepicker.css";

import {
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Badge
} from "reactstrap";
const { createCallLog } = CCActions;



const OrderCallLogCreationModal = props => {
    const [modal, setmodal] = useState(false);
    const [confirmationModal, setCM] = useState(false);
    const [errorModal, setEM] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [viewingOrder, setViewingOrder] = useState({});
    const [callDateTime, setCDT] = useState("");
    const [remarks, setRemarks] = useState("");
    const [callType, setCT] = useState({ value: "Appointment Setup", label: "Appointment Setup" });

    //appointment details
    const [appointmentBooked, setAB] = useState(false);
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [dateTime, setDT] = useState("");

    //appointment fulfilled details
    const [appointmentFulfilled, setAF] = useState(false);
    const [appointmentFulfilledDT, setAFDT] = useState("");



    const closeModal = modal => {
        //setmodal(modal);
        props.callbackClose();
    }

    const confirmAdd = () => {
        if (callDateTime == null || callDateTime == "") {
            setEM(true);
            setErrorMessage("Please select Call Date Time");
            return;
        }
        if (callType == null || callType == "") {
            setEM(true);
            setErrorMessage("Please select Call Type");
            return;
        }
        if (appointmentBooked) {
            if (location == null || location == "") {
                setEM(true);
                setErrorMessage("Please enter a Location");
                return;
            }
            if (phone == null || phone == "") {
                setEM(true);
                setErrorMessage("Please enter a Phone Number");
                return;
            }
            if (email == null || email == "") {
                setEM(true);
                setErrorMessage("Please enter a Email");
                return;
            }
            if (dateTime == null || dateTime == "") {
                setEM(true);
                setErrorMessage("Please select a DateTime");
                return;
            }
        }
        setCM(true);
    }

    const confirmAddition = () => {
        //truly confirmed / CALL API
        setCM(false);
        let clObject = {
            orderID: viewingOrder.OrderID,
            callDateTime: convertDateTimeToServer(callDateTime),
            remarks: remarks,
            callType: callType.value,
            cb: APICallback
        }
        if (appointmentBooked) {
            clObject.appointment = {
                location: location,
                phone: phone,
                email: email,
                dateTime: convertDateTimeToServer(dateTime)
            }
        }
        if (appointmentFulfilled) {
            clObject.appointmentFulfilled = convertDateTimeToServer(appointmentFulfilledDT);
        }
        props.createCallLog(props.authData, clObject);
    }



    const APICallback = (success, message) => {
        if (success) {
            closeModal();
            props.callbackSuccess(message);

        } else {
            setEM(true);
            setErrorMessage("There is an issue with the Server.");
            return;
        }
    }

    const toggleError = () => {
        setEM(false);
    }

    let handleChange = (e) => {
        switch (e.target.id) {
            case "callDateTime":
                setCDT(e.target.value);
                break;
            case "remarks":
                setRemarks(e.target.value);
                break;
            case "location":
                setLocation(e.target.value);
                break;
            case "phone":
                setPhone(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "appointmentBooked":
                setAB(!appointmentBooked);
                break;
            case "appointmentFulfilled":
                setAF(!appointmentFulfilled);
                break;
        }
    }

    const handleChangeCallType = (e) => {
        setCT(e);
    }

    const handleChangeCallDate = date => {
        setCDT(date);
    }

    const handleChangeApptDate = date => {
        setDT(date);
    }

    const handleChangeFulDate = date => {
        setAFDT(date);
    }

    useEffect(() => {
        if (props.orderObject == null) return;
        setAB(false);
        setAF(false);
        setViewingOrder(props.orderObject);
        let defaultSelect = { value: "Appointment Setup", label: "Appointment Setup" };
        if (props.orderObject.OrderStatus == "Appointment Booked") {
            defaultSelect = { value: "Appointment Followup", label: "Appointment Followup" };
        } else if (props.orderObject.OrderStatus == "Appointment Fulfilled") {
            defaultSelect = { value: "Medical Report Follow Up", label: "Medical Report Follow Up" };
        }
        setCT(defaultSelect);
        setAFDT(props.orderObject.AppointmentDateParse);
        setmodal(true);
    }, [props.orderObject]);

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
                    confirmAddition();
                }}
                onCancel={() =>
                    setCM(false)
                }
            ></SweetAlert>
            {viewingOrder.OrderID != null &&
                <Modal
                    isOpen={modal}
                    toggle={closeModal}
                    size="lg"
                    onExit={closeModal}
                    onClosed={closeModal}
                >
                    <ModalHeader toggle={() => setmodal(!modal)}>Add Call Log for: {viewingOrder.OrderNo} <Badge className="c-warning">{viewingOrder.OrderStatus}</Badge></ModalHeader>
                    <ModalBody>
                        <h5 class="mb-10">Call Log Information</h5>
                        <Form>
                            <FormGroup row>
                                <Label for="callType" sm={3}>
                                    Select Call Type*
                                </Label>
                                <Col sm={9}>
                                    <Select type="select" name="select" id="callType" value={callType} onChange={e => handleChangeCallType(e)}
                                        options={[{ value: "Appointment Setup", label: "Appointment Setup" }, { value: "Appointment Followup", label: "Appointment Followup" }, { value: "Medical Report Follow Up", label: "Medical Report Follow Up" }]}>
                                    </Select>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="callDateTime" sm={3}>
                                    Call Date Time*
                                </Label>
                                <Col sm={9}>
                                    <DatePicker sm={9}
                                        selected={callDateTime}
                                        onChange={handleChangeCallDate}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={5}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="remarks" sm={3}>
                                    Remarks
                                </Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="remarks" id="remarks" value={remarks} onChange={e => handleChange(e)} />
                                </Col>
                            </FormGroup>
                            {viewingOrder.OrderStatus == "Awaiting Appointment" &&
                                <div>
                                    <div className="pretty p-switch">
                                        <input type="checkbox" name="appointmentBooked" id="appointmentBooked" value={appointmentBooked} onChange={e => handleChange(e)} />
                                        <div className="state">
                                            <label>Appointment Booked?</label>
                                        </div>
                                    </div>
                                    {appointmentBooked &&
                                        <div>
                                            <hr />
                                            <h5 class="mb-10">Appointment Booking Details</h5>
                                            <FormGroup row>
                                                <Label for="location" sm={3}>
                                                    Location
                                                </Label>
                                                <Col sm={9}>
                                                    <Input type="text" name="location" id="location" value={location} onChange={e => handleChange(e)} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="phone" sm={3}>
                                                    Phone
                                                </Label>
                                                <Col sm={9}>
                                                    <Input type="text" name="phone" id="phone" value={phone} onChange={e => handleChange(e)} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="email" sm={3}>
                                                    Email
                                                </Label>
                                                <Col sm={9}>
                                                    <Input type="text" name="email" id="email" value={email} onChange={e => handleChange(e)} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="dateTime" sm={3}>
                                                    Appointment Date Time*
                                                </Label>
                                                <Col sm={9}>
                                                    <DatePicker sm={9}
                                                        selected={dateTime}
                                                        onChange={handleChangeApptDate}
                                                        showTimeSelect
                                                        timeFormat="HH:mm"
                                                        timeIntervals={15}
                                                        dateFormat="MMMM d, yyyy h:mm aa"
                                                        timeCaption="time"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </div>
                                    }
                                </div>
                            }
                            {viewingOrder.OrderStatus == "Appointment Booked" &&
                                <div>
                                    <div className="pretty p-switch">
                                        <input type="checkbox" name="appointmentFulfilled" id="appointmentFulfilled" value={appointmentFulfilled} onChange={e => handleChange(e)} />
                                        <div className="state">
                                            <label>Appointment Fulfilled?</label>
                                        </div>
                                    </div>
                                    {appointmentFulfilled &&
                                        <div>
                                            <hr />
                                            <h5 class="mb-10">Appointment Fulfilled Details</h5>
                                            <FormGroup row>
                                                <Label for="appointmentFulfilledDT" sm={3}>
                                                    Fulfilled Date Time*
                                                </Label>
                                                <Col sm={9}>
                                                    <DatePicker sm={9}
                                                        selected={appointmentFulfilledDT}
                                                        onChange={handleChangeFulDate}
                                                        showTimeSelect
                                                        timeFormat="HH:mm"
                                                        timeIntervals={15}
                                                        dateFormat="MMMM d, yyyy h:mm aa"
                                                        timeCaption="time"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </div>
                                    }
                                </div>
                            }


                        </Form>

                    </ModalBody>
                    <ModalFooter>

                        <Button className="c-success" onClick={() => confirmAdd()}>
                            Confirm Call Log
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
    { createCallLog }
)(OrderCallLogCreationModal);

