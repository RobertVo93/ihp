/* eslint import/no-webpack-loader-syntax: off */
import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";
import CMActions from "redux/claimmanagers/actions";
import ClinicActions from "redux/clinic/actions";
import CMClaimsDetailsHistoryTable from "components/claimmanagers/earlywarning/CMClaimsDetailsHistoryTable";
import classnames from "classnames";
import { connect } from "react-redux";
import ClinicOverviewDrugsTable from "components/clinic/overview/ClinicOverviewDrugsTable";
import ClinicOverviewProceduresTable from "components/clinic/overview/ClinicOverviewProceduresTable";
const { getClaimDetailsAndHistory } = CMActions;
const { getDrugsAndProcedures } = ClinicActions;

const CMClaimsDetailsHistoryModal = props => {
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
  };

  useEffect(() => {
    //update the data
    setmodal(true);
    props.getClaimDetailsAndHistory(props.authData, props.claimID);
    props.getDrugsAndProcedures(props.authData, props.claimID);
  }, [props.claimID]);

  useEffect(() => {
    setIncData(props.cmData.claimDetailsAndHistory);
  }, [props.cmData.claimDetailsAndHistory]);

  useEffect(() => {
    let newTableData = [];

    if (incomingData == null || incomingData.length <= 0) return;
    setCName(incomingData[1][0].EmpName);
    setCoyName(incomingData[1][0].CoyName);
    setVDate(incomingData[1][0].ROCDate);
    setRDate(incomingData[1][0].ReceiveDt);

    //do logic here and put them into the different buckets based on a 7 days TAT

    for (var i = 0; i < incomingData[0].length; i++) {
      let newDate = new Date(incomingData[0][i].LastModDt)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
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
        <ModalHeader toggle={() => setmodal(!modal)}>
          Claim Details and History for Claim ID: {props.claimID}
        </ModalHeader>
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
          {tableData.length > 0 && (
            <CMClaimsDetailsHistoryTable tableData={tableData} />
          )}

          <Card style={{ marginBottom: 20 }}>
            <CardBody>
              <CardTitle style={{ textAlign: "center" }}>
                Drugs Information
              </CardTitle>
              <ClinicOverviewDrugsTable
                drugs={props.drugsAndProcedures.data.filter(
                  val =>
                    val.ROCNo === props.claimID &&
                    (val.IOTType === "S" || val.IOTType === "E") &&
                    val.VType === "Non Panel"
                )}
              />
            </CardBody>
          </Card>
          <Card style={{ marginBottom: 20 }}>
            <CardBody>
              <CardTitle style={{ textAlign: "center" }}>
                Procedures Information
              </CardTitle>
              <ClinicOverviewProceduresTable
                procedures={props.drugsAndProcedures.data.filter(
                  val =>
                    val.ROCNo === props.claimID &&
                    val.IOTType === "O" &&
                    val.VType === "Non Panel"
                )}
              />
            </CardBody>
          </Card>
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
    cmData: {
      claimDetailsAndHistory: state.claimmanagers.claimDetailsAndHistory
    },
    drugsAndProcedures: {
      data: state.clinic.clinicDrugsAndProcedures
    }
  };
};

export default connect(mapStateToProps, {
  getClaimDetailsAndHistory,
  getDrugsAndProcedures
})(CMClaimsDetailsHistoryModal);
