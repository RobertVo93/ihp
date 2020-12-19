/* eslint import/no-webpack-loader-syntax: off */
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CCActions from "redux/contactcenter/actions";
//import MedicalEscalationsConfirmationModal from "components/medicalescalations/MedicalEscalationsPopupModal";
import { checkPermissions, convertDateTime, convertDateTimeObject } from 'util/constant_methods';
import { connect } from 'react-redux';
import { Badge } from "reactstrap";
import OrderHistoryTable from "components/contactcenter/OrderHistoryTable";
import OrderCallLogCreationModal from "components/contactcenter/OrderCallLogCreationModal";
import OrderEditModal from "components/contactcenter/OrderEditModal";
import OrderCancellationModal from "components/contactcenter/OrderCancellationModal";
import SweetAlert from 'react-bootstrap-sweetalert';
import { roundToNearestMinutes } from "date-fns/esm";

const { getOrderDetails, closeOrder, cancelOrder } = CCActions;

const OrderViewPopupModal = props => {
    const [modal, setmodal] = useState(false);
    const [showCM, setShowCM] = useState(false);
    const [viewingOrder, setViewingOrder] = useState({});
    const [orderHistory, setOrderHistory] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [closeAfter, setCA] = useState(false);
    const [isClosing, setIC] = useState(true);
    const [errorModal, setEM] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSM] = useState("Call Log Added Succesfully!");

    //call log
    const [showCL, setShowCL] = useState(false);

    //edit order
    const [showEO, setShowEO] = useState(false);

    //show success
    const [showSM, setShowSM] = useState(false);

    const toggleError = () => {
        setEM(false);
    }

    const closeModal = modal => {
        //setmodal(modal);
        props.callbackClose();
    }

    const closeAndRefresh = () => {
        props.callbackClose();
    }

    const openAddCallLog = () => {
        setShowCL(true);
    }

    const openEditOrder = () => {
        setShowEO(true);
    }

    const openCancelOrder = () => {
        if (orderDetails.OrderStatus == "Order Closed") {
            setErrorMessage("Closed Orders cannot be cancelled");
            setEM(true);
            return;
        }
        setShowCancelModal(true);
    }

    const openCloseOrder = () => {
        if (orderDetails.MRQualityControl == 0) {
            setErrorMessage("Quality Control not completed");
            setEM(true);
            return;
        }
        if (orderDetails.MRSoftcopyRecDate == null) {
            setErrorMessage("Medical Records Softcopy not Received");
            setEM(true);
            return;
        }
        if (orderDetails.MRHardcopyRecDate == null) {
            setErrorMessage("Medical Records Hardcopy not Received");
            setEM(true);
            return;
        }
        if (orderDetails.MRSoftcopySentDate == null) {
            setErrorMessage("Medical Records Softcopy not Sent");
            setEM(true);
            return;
        }
        if (orderDetails.MRHardcopySentDate == null) {
            setErrorMessage("Medical Records Hardcopy not Sent");
            setEM(true);
            return;
        }
        setIC(true);
        setShowCM(true);
    }

    const cancelCurrentOrder = () => {
        //check current modal
        setShowCM(false);
        props.cancelOrder(props.authData, viewingOrder.OrderID, closeSuccessCB);
    }


    const closeCurrentOrder = () => {
        //check current modal
        setShowCM(false);
        setCA(true);
        props.closeOrder(props.authData, viewingOrder.OrderID, closeSuccessCB);
    }

    const closeSuccessCB = (success, message) => {
        if (success) {
            setSM(message);
            setShowSM(true);

        } else {
            setErrorMessage(message);
            setEM(true);
        }
    }

    const closeCallLogModal = () => {

        setShowCL(false);
    }

    const closeEditOrderModal = () => {

        setShowEO(false);
    }

    const openConfirmationModal = (type) => {
        //setModalType(type);
        setShowCM(true);
    }

    const successCallbackClose = (message) => {
        setCA(true);
        setSM(message);
        setShowSM(true);
    }

    const successCallback = (message) => {
        setCA(false);
        setSM(message);
        setShowSM(true);
    }

    const refreshOrderDetails = () => {
        props.getOrderDetails(props.authData, viewingOrder.OrderID);
    }

    useEffect(() => {
        setViewingOrder(props.orderObject);
        //get escalation history
        props.getOrderDetails(props.authData, props.orderObject.OrderID);
    }, [props.orderObject]);

    useEffect(() => {
        if (props.ordersData.details == null || props.ordersData.details.length == 0 || props.ordersData.details[0] == null) return;
        let orderDetailsTemp = JSON.parse(JSON.stringify(props.ordersData.details[0][0]));
        orderDetailsTemp.OrderReceivedDateTime = convertDateTime(orderDetailsTemp.OrderReceivedDateTime);
        orderDetailsTemp.AppointmentDateParse = convertDateTimeObject(orderDetailsTemp.AppointmentDate);
        orderDetailsTemp.AppointmentDate = convertDateTime(orderDetailsTemp.AppointmentDate);
        orderDetailsTemp.MRSoftcopyRecDateParse = convertDateTimeObject(orderDetailsTemp.MRSoftcopyRecDate);
        orderDetailsTemp.MRSoftcopyRecDate = convertDateTime(orderDetailsTemp.MRSoftcopyRecDate);
        orderDetailsTemp.MRHardcopyRecDateParse = convertDateTimeObject(orderDetailsTemp.MRHardcopyRecDate);
        orderDetailsTemp.MRHardcopyRecDate = convertDateTime(orderDetailsTemp.MRHardcopyRecDate);
        orderDetailsTemp.MRSoftcopySentDateParse = convertDateTimeObject(orderDetailsTemp.MRSoftcopySentDate);
        orderDetailsTemp.MRSoftcopySentDate = convertDateTime(orderDetailsTemp.MRSoftcopySentDate);
        orderDetailsTemp.MRHardcopySentDateParse = convertDateTimeObject(orderDetailsTemp.MRHardcopySentDate);
        orderDetailsTemp.MRHardcopySentDate = convertDateTime(orderDetailsTemp.MRHardcopySentDate);
        orderDetailsTemp.OrderDateClosed = convertDateTime(orderDetailsTemp.OrderDateClosed);
        orderDetailsTemp.OrderDateModified = convertDateTime(orderDetailsTemp.OrderDateModified);
        orderDetailsTemp.OrderDateCreated = convertDateTime(orderDetailsTemp.OrderDateCreated);
        orderDetailsTemp.AppointmentFulfilledDate = convertDateTime(orderDetailsTemp.AppointmentFulfilledDate);
        orderDetailsTemp.AppointmentFollowedUpDate = convertDateTime(orderDetailsTemp.AppointmentFollowedUpDate);
        let orderHistoryTemp = JSON.parse(JSON.stringify(props.ordersData.details[1]));
        for (var i = 0; i < orderHistoryTemp.length; i++) {
            orderHistoryTemp[i].no = (i + 1).toString();
            orderHistoryTemp[i].ModifiedDate = convertDateTime(orderHistoryTemp[i].ModifiedDate);
        }
        setOrderDetails(orderDetailsTemp);
        setOrderHistory(orderHistoryTemp);
        setmodal(true);
    }, [props.ordersData.details]);

    const getBadgeColor = (type) => {
        switch (type) {
            case "Awaiting Appointment":
                return "warning";
            case "Order Closed":
                return "warning";
            case "Order Cancelled":
                return "warning";
            case "Appointment Booked":
                return "info";
            case "Appointment Fulfilled":
                return "info";
            case "Order Closed":
                return "success";
            default:
                return "warning";
        }
    }

    const checkRepeat = (index) => {
        if (index == 0) return true;
        if (orderHistory[index].ModifiedDate == orderHistory[index - 1].ModifiedDate && orderHistory[index].Name == orderHistory[index - 1].Name) {
            return false;
        }
        return true;
    }

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
                success
                show={showSM}
                title={successMessage}
                onConfirm={() => {
                    refreshOrderDetails();
                    if (closeAfter) {
                        closeModal();
                    }
                    setShowSM(false);
                }
                }
                confirmBtnCssClass="sweet-alert-confirm-button"
                cancelBtnCssClass="sweet-alert-cancel-button"
            >
                {isClosing ? "Closing" : "Cancellation"} successful!
                </SweetAlert>

            <SweetAlert
                warning
                showCancel
                show={showCM}
                confirmBtnText="Yes, Confirm!"
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="default"
                title="Are you sure?"
                onConfirm={() => {
                    if (isClosing) {
                        closeCurrentOrder();
                    }
                }}
                onCancel={() =>
                    setShowCM(false)
                }
            ></SweetAlert>

            {showCL &&
                <OrderCallLogCreationModal
                    callbackClose={closeCallLogModal}
                    orderObject={orderDetails}
                    callbackSuccess={successCallback}
                    centered
                />
            }
            {showCancelModal &&
                <OrderCancellationModal
                    callbackClose={closeAndRefresh}
                    orderObject={orderDetails}
                    callbackSuccess={successCallbackClose}
                    centered
                />}

            {showEO &&
                <OrderEditModal
                    callbackClose={closeEditOrderModal}
                    orderObject={orderDetails}
                    callbackSuccess={successCallback}
                    centered
                />
            }

            {orderDetails.OrderID != null &&
                <Modal
                    isOpen={modal}
                    toggle={closeModal}
                    size="lg"
                    onExit={closeModal}
                    onClosed={closeModal}
                    style={{ maxWidth: '1600px', width: '90%' }}
                >
                    <ModalHeader toggle={() => setmodal(!modal)}>Order Details for: {orderDetails.OrderNo} <Badge className={"c-" + getBadgeColor(orderDetails.OrderStatus)}>{orderDetails.OrderStatus}</Badge></ModalHeader>
                    <ModalBody>
                        <h5>Order Member Details</h5>
                        <p><b>Name of Member:</b> {orderDetails.MemberName}</p>
                        <p><b>NRIC of Member:</b> {orderDetails.NRIC}</p>
                        <p><b>Certificate Number:</b> {orderDetails.CertificateNumber}</p>
                        <p><b>Contact Number:</b> {orderDetails.ContactNumber}</p>
                        <hr />
                        <h5>Order Details</h5>
                        <p><b>Order Received Date/Time:</b> {orderDetails.OrderReceivedDateTime}</p>
                        <p><b>Order Status:</b> {orderDetails.OrderStatus}</p>
                        <p><b>Insurer:</b> {orderDetails.Insurer}</p>
                        <p><b>Service:</b> {orderDetails.Service}</p>
                        <p><b>Agent Name:</b> {orderDetails.AgentName == null ? "N/A" : orderDetails.AgentName}</p>
                        <p><b>Agent Code:</b> {orderDetails.AgentCode == null ? "N/A" : orderDetails.AgentCode}</p>
                        <p><b>Overall Remarks:</b> {orderDetails.OverallRemarks == null ? "N/A" : orderDetails.OverallRemarks}</p>
                        <p><b>Modified By:</b> {orderDetails.ModifiedBy == null ? "N/A" : orderDetails.ModifiedBy}</p>
                        <p><b>Modified Date:</b> {orderDetails.OrderDateModified}</p>
                        <p><b>Created By:</b> {orderDetails.CreatedBy == null ? "N/A" : orderDetails.CreatedBy}</p>
                        <p><b>Created Date:</b> {orderDetails.OrderDateCreated}</p>
                        <p><b>Closed Date:</b> {orderDetails.OrderDateClosed}</p>
                        {orderDetails.AppointmentDate != null && <div>
                            <hr />
                            <h5>Appointment Details</h5>
                            <p><b>Appointment Date:</b> {orderDetails.AppointmentDate}</p>
                            <p><b>Appointment Location:</b> {orderDetails.AppointmentLocation == null ? "N/A" : orderDetails.AppointmentLocation}</p>
                            <p><b>Appointment Contact (Phone):</b> {orderDetails.AppointmentContactPhone == null ? "N/A" : orderDetails.AppointmentContactPhone}</p>
                            <p><b>Appointment Contact (Email):</b> {orderDetails.AppointmentContactEmail == null ? "N/A" : orderDetails.AppointmentContactEmail}</p>
                        </div>
                        }
                        {orderDetails.AppointmentFulfilledDate != null && <div>
                            <hr />
                            <h5>Appointment Fulfilled Details</h5>
                            <p><b>Appointment Fulfilled Date:</b> {orderDetails.AppointmentFulfilledDate}</p>
                            <p><b>Appointment Followed Up Date:</b> {orderDetails.AppointmentFollowedUpDate}</p>
                            <p><b>Medical Report (Softcopy) Received Date:</b> {orderDetails.MRSoftcopyRecDate}</p>
                            <p><b>Medical Report (Hardcopy) Received Date:</b> {orderDetails.MRHardcopyRecDate}</p>
                            <p><b>Medical Report (Softcopy) Sent Date:</b> {orderDetails.MRSoftcopySentDate}</p>
                            <p><b>Medical Report (Hardcopy) Sent Date:</b> {orderDetails.MRHardcopySentDate}</p>
                            <p><b>Medical Report Quality Control:</b> {orderDetails.MRQualityControl == 1 ? "Yes" : "No"}</p>
                        </div>
                        }
                        <hr />
                        <h5><b>Order History</b></h5>
                        {orderHistory && <OrderHistoryTable
                            oHistory={orderHistory}
                        />}

                    </ModalBody>
                    <ModalFooter>
                        {(checkPermissions(props.authData.permissions, "add_call_log") && (orderDetails.OrderStatus == "Awaiting Appointment" || orderDetails.OrderStatus == "Appointment Booked")) &&
                            <Button className="c-success" onClick={() => openAddCallLog()}>
                                Add Call Log
                        </Button>}

                        {(checkPermissions(props.authData.permissions, "cancel_orders") && (orderDetails.OrderStatus != "Order Closed" && orderDetails.OrderStatus != "Order Cancelled")) &&
                            <Button className="c-warning" onClick={() => openCancelOrder()}>
                                Cancel Order
                        </Button>}

                        {(checkPermissions(props.authData.permissions, "edit_orders") && orderDetails.OrderStatus == "Appointment Fulfilled") &&
                            <Button className="c-success" onClick={() => openEditOrder()}>
                                Edit Order
                        </Button>}
                        {(checkPermissions(props.authData.permissions, "close_orders") && orderDetails.OrderStatus == "Appointment Fulfilled") &&
                            <Button className="c-success" onClick={() => openCloseOrder()}>
                                Close Order
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
        ordersData: {
            details: state.contactcenter.orderDetails
        }
    };
};

export default connect(
    mapStateToProps,
    { getOrderDetails, closeOrder, cancelOrder }
)(OrderViewPopupModal);



