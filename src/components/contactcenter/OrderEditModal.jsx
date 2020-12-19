/* eslint import/no-webpack-loader-syntax: off */
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CCActions from "redux/contactcenter/actions";
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
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
const { editOrder } = CCActions;



const OrderEditModal = props => {
    const [modal, setmodal] = useState(false);
    const [confirmationModal, setCM] = useState(false);
    const [errorModal, setEM] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [viewingOrder, setViewingOrder] = useState({});

    //edit details
    const [MRSCReceivedDT, setMRSCReceivedDT] = useState("");
    const [MRHCReceivedDT, setMRHCReceivedDT] = useState("");
    const [MRSCSentDT, setMRSCSentDT] = useState("");
    const [MRHCSentDT, setMRHCSentDT] = useState("");
    const [remarks, setRemarks] = useState("");
    const [MRQC, setQC] = useState(false);


    const closeModal = modal => {
        //setmodal(modal);
        props.callbackClose();
    }

    const confirmEdit = () => {
        setCM(true);
    }

    const confirmEditFinal = () => {
        //truly confirmed / CALL API
        setCM(false);
        let eObject = {
            orderID: viewingOrder.OrderID,
            qualityControl: (MRQC ? 1 : 0),
            MRSCReceived: convertDateTimeToServer(MRSCReceivedDT),
            MRHCReceived: convertDateTimeToServer(MRHCReceivedDT),
            MRSCSent: convertDateTimeToServer(MRSCSentDT),
            MRHCSent: convertDateTimeToServer(MRHCSentDT),
            overallRemarks: remarks,
            cb: APICallback
        }
        props.editOrder(props.authData, eObject);
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



    let handleChange = (e) => {
        switch (e.target.id) {
            case "remarks":
                setRemarks(e.target.value);
                break;
            case "MRQC":
                setQC(!MRQC);
                break;
            default:
                break;
        }
    }

    const toggleError = () => {
        setEM(false);
    }

    const handleChangeMRSCRecDate = date => {
        setMRSCReceivedDT(date);
    }

    const handleChangeMRHCRecDate = date => {
        setMRHCReceivedDT(date);
    }

    const handleChangeMRSCSentDate = date => {
        setMRSCSentDT(date);
    }
    const handleChangeMRHCSentDate = date => {
        setMRHCSentDT(date);
    }

    useEffect(() => {
        if (props.orderObject == null) return;
        setQC(props.orderObject.MRQualityControl == 1 ? true : false);
        setViewingOrder(props.orderObject);
        setMRSCReceivedDT(props.orderObject.MRSoftcopyRecDateParse);
        setMRHCReceivedDT(props.orderObject.MRHardcopyRecDateParse);
        setMRSCSentDT(props.orderObject.MRSoftcopySentDateParse);
        setMRHCSentDT(props.orderObject.MRHardcopySentDateParse);
        setRemarks(props.orderObject.OverallRemarks);
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
                    confirmEditFinal();
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
                    <ModalHeader toggle={() => setmodal(!modal)}>Edit Order for: {viewingOrder.OrderNo} <Badge className="c-warning">{viewingOrder.OrderStatus}</Badge></ModalHeader>
                    <ModalBody>
                        <h5 class="mb-10">Edit Medical Report Information</h5>
                        <Form>
                            <FormGroup row>
                                <Label for="MRSCReceivedDT" sm={6}>
                                    Medical Report Softcopy Received*
                                </Label>
                                <Col sm={6}>
                                    <DatePicker sm={9}
                                        selected={MRSCReceivedDT}
                                        onChange={handleChangeMRSCRecDate}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={5}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="MRHCReceivedDT" sm={6}>
                                    Medical Report Hardcopy Received*
                                </Label>
                                <Col sm={6}>
                                    <DatePicker sm={9}
                                        selected={MRHCReceivedDT}
                                        onChange={handleChangeMRHCRecDate}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={5}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="MRSCSentDT" sm={6}>
                                    Medical Report Softcopy Sent*
                                </Label>
                                <Col sm={6}>
                                    <DatePicker sm={9}
                                        selected={MRSCSentDT}
                                        onChange={handleChangeMRSCSentDate}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={5}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="MRHCSentDT" sm={6}>
                                    Medical Report Hardcopy Sent*
                                </Label>
                                <Col sm={6}>
                                    <DatePicker sm={9}
                                        selected={MRHCSentDT}
                                        onChange={handleChangeMRHCSentDate}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={5}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                    />
                                </Col>
                            </FormGroup>
                            <div className="pretty p-switch mb-10">
                                <input type="checkbox" name="MRQC" id="MRQC" value={MRQC} defaultChecked={MRQC} onChange={e => handleChange(e)} />
                                <div className="state">
                                    <label>Quality Control Done?</label>
                                </div>
                            </div>
                            <FormGroup row>
                                <Label for="remarks" sm={3}>
                                    Remarks
                                </Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="remarks" id="remarks" value={remarks} onChange={e => handleChange(e)} />
                                </Col>
                            </FormGroup>


                        </Form>

                    </ModalBody>
                    <ModalFooter>

                        <Button className="c-success" onClick={() => confirmEdit()}>
                            Confirm Edit
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
    { editOrder }
)(OrderEditModal);

