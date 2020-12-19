/* eslint import/no-webpack-loader-syntax: off */
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CCActions from "redux/contactcenter/actions";
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import "react-datepicker/dist/react-datepicker.css";

import {
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Badge
} from "reactstrap";
const { cancelOrder } = CCActions;



const OrderCancellationModal = props => {
    const [modal, setmodal] = useState(false);
    const [confirmationModal, setCM] = useState(false);
    const [errorModal, setEM] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [viewingOrder, setViewingOrder] = useState({});

    //cancellation details
    const [remarks, setRemarks] = useState("");


    const closeModal = modal => {
        //setmodal(modal);
        props.callbackClose();
    }

    const confirmCancel = () => {
        if (remarks == null || remarks == "") {
            setEM(true);
            setErrorMessage("Please specify a reason for cancellation");
            return;
        }
        setCM(true);
    }

    const confirmCancelFinal = () => {
        //truly confirmed / CALL API
        setCM(false);
        let oObject = {
            orderID: viewingOrder.OrderID,
            remarks: remarks,
            cb: APICallback
        }
        props.cancelOrder(props.authData, oObject);
    }



    const APICallback = (success, message) => {
        if (success) {
            props.callbackSuccess(message);
            setmodal(false);
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
        }
    }

    const toggleError = () => {
        setEM(false);
    }

    useEffect(() => {
        if (props.orderObject == null) return;
        setViewingOrder(props.orderObject);
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
                    confirmCancelFinal();
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
                    <ModalHeader toggle={() => setmodal(!modal)}>Cancellation of Order for: {viewingOrder.OrderNo} <Badge className="c-warning">{viewingOrder.OrderStatus}</Badge></ModalHeader>
                    <ModalBody>
                        <h5 class="mb-10">Order Cancellation Remarks (Required)</h5>
                        <Form>
                            <FormGroup row>
                                <Label for="remarks" sm={3}>
                                    Remarks*
                                </Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="remarks" id="remarks" value={remarks} onChange={e => handleChange(e)} />
                                </Col>
                            </FormGroup>


                        </Form>

                    </ModalBody>
                    <ModalFooter>

                        <Button className="c-success" onClick={() => confirmCancel()}>
                            Confirm Cancel
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
    { cancelOrder }
)(OrderCancellationModal);

