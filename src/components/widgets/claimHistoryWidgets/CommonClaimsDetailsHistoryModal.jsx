/* eslint import/no-webpack-loader-syntax: off */
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from 'react-redux';
import CMActions from "redux/claimmanagers/actions";
import CommonClaimsDetailsHistoryTable from "./CommonClaimsDetailsHistoryTable";
const { getAllClaimsDetailsAndHistory } = CMActions;

const CommonClaimsDetailsHistoryModal = props => {
    const [tableData, setTableData] = useState([]);
    const [modal, setmodal] = useState(true);
    const [incomingData, setIncData] = useState([]);
    const [claimantName, setCName] = useState("");
    const [companyName, setCoyName] = useState("");
    const [visitDate, setVDate] = useState("");
    const [receiveDate, setRDate] = useState("");

    const closeModal = modal => {
        //setmodal(modal);
        props.callbackClose();
    }

    /**
     * componentDidMount
     */
    useEffect(() => {
        setmodal(true);
        props.getAllClaimsDetailsAndHistory(props.authData, props.claimID);
    }, []);

    /**
     * ComponentDidUpdate: claimDetailsAndHistory changed
     */
    useEffect(() => {
        setIncData(props.cmData.claimDetailsAndHistory);
    }, [props.cmData.claimDetailsAndHistory]);

    /**
     * Update table data
     */
    useEffect(() => {
        if (incomingData.length != 2) return;

        //Set claim's master data
        setCName(incomingData[1][0].EmpName);
        setCoyName(incomingData[1][0].CoyName);
        setVDate(incomingData[1][0].ROCDate);
        setRDate(incomingData[1][0].ReceiveDt);

        //convert incomingData (claim's history) to tableData
        let newTableData = [];
        for (var i = 0; i < incomingData[0].length; i++) {
            let newDate = new Date(incomingData[0][i].LastModDt).toISOString().
                replace(/T/, ' ').
                replace(/\..+/, '');
            newTableData.push({
                no: i + 1,
                ClaimStatus: incomingData[0][i].ClaimStatus,
                LastModifiedDate: newDate,
                LastModifiedUser: incomingData[0][i].LastModUser,
                Remarks: incomingData[0][i].Remark
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
                <ModalHeader toggle={() => setmodal(!modal)}>Claim Details and History for Claim ID: {props.claimID}</ModalHeader>
                <ModalBody>
                    <h5>Claim TAT Details</h5>
                    <p>Claim ID: {props.claimID}</p>
                    <p>Claim TAT: {props.TAT}</p>
                    <p>Claim Zone: {props.Zone}</p>
                    <hr />
                    <h5>Claim Details</h5>
                    <p>Claimant Name: {claimantName}</p>
                    <p>Company Name: {companyName}</p>
                    <p>Visit Date: {visitDate}</p>
                    <p>Receive Date: {receiveDate}</p>
                    <hr />
                    <h5 className="mb-15">Claim Status History</h5>
                    {tableData.length > 0 &&
                        <CommonClaimsDetailsHistoryTable
                            tableData={tableData} />
                    }
                </ModalBody>
                <ModalFooter>
                    <Button className="c-secondary" onClick={() => closeModal(!modal)}>
                        Cancel
                        </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authData: {
            accessToken: state.auth.accessToken,
        },
        cmData: {
            claimDetailsAndHistory: state.claimmanagers.claimAllDetailsAndHistory
        }
    };
};

export default connect(
    mapStateToProps,
    { getAllClaimsDetailsAndHistory }
)(CommonClaimsDetailsHistoryModal);
