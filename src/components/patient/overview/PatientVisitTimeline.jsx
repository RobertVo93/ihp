import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PatActions from "redux/patient/actions";
import { TimelineWidget } from "components/widgets/timelineWidget/TimelineWidget";
import { calculateAging, calculateZone } from "util/constant_methods";
import CommonClaimsDetailsHistoryModal from "components/widgets/claimHistoryWidgets/CommonClaimsDetailsHistoryModal";
const { getPatientTimeline } = PatActions;

const PatientVisitTimeLine = props => {
  const [incomingData, setIncData] = useState([]);
  const [data, setData] = useState([]);
  const [claimID, setClaimID] = useState("-1");
  const [currentTAT, setCurrentTAT] = useState(0);
  const [currentZone, setCurrentZone] = useState("Green");

  /**
   * componentDidMount
   */
  useEffect(() => {
    props.getPatientTimeline(props.authData, props.patientData.patientID);
  }, []);

  /**
   * componentDidUpdate: patientVisitTimeline
   */
  useEffect(() => {
    setIncData(props.patientData.patientVisitTimeline);
  }, [props.patientData.patientVisitTimeline]);

  /**
   * componentDidUpdate: incomingData
   */
  useEffect(() => {
    if (incomingData.length == 0) return;
    let data = [];
    //update data from incomming data.
    for (var i = 0; i < incomingData.length; i++) {
      let dotType = "circle";
      if (incomingData[i].visitType.toLowerCase() == "chronic") {
        dotType = "square";
      } else if (incomingData[i].visitType.toLowerCase() == "inpatient visit") {
        dotType = "triangle";
      }
      //set value for timeline widget
      data.push({
        claimID: incomingData[i].ROCNo,
        dotType: dotType,
        timelineValue: incomingData[i].visitDate,
        lastModifiedDate: incomingData[i].lastModifiedDate,
        popupValue: (
          <div>
            <div>
              <strong>Visit Date:</strong> {incomingData[i].visitDate}
            </div>
            <div>
              <strong>Type:</strong> {incomingData[i].VType}
            </div>
            <div>
              <strong>MC Days:</strong> {incomingData[i].mCdays}
            </div>
            {props.authData.permissions.includes("view_personal_diagnosis") && (
              <div>
                <strong>Diagnosis:</strong> {incomingData[i].diagnosisDesc}
              </div>
            )}
            <div>
              <strong>Bill Incurred:</strong> {incomingData[i].billIncurred}
            </div>
          </div>
        )
      });
    }

    setData(data);
  }, [incomingData]);

  /**
   * handle OnClick on a timeline dot
   * @param {*} index element index
   */
  const dotTimelineClick = index => {
    //calculate the TAT(Turn Around Time) and Zone from the last
    let currentTAT = calculateAging(new Date(data[index].lastModifiedDate));
    let zone = calculateZone(currentTAT);

    setClaimID(data[index].claimID);
    setCurrentZone(zone);
    setCurrentTAT(currentTAT);
  };

  /**
   * close popup callback
   */
  const closeCallback = () => {
    setClaimID("-1");
  };

  return (
    <div>
      {claimID != "-1" && (
        <CommonClaimsDetailsHistoryModal
          claimID={claimID}
          callbackClose={closeCallback}
          TAT={currentTAT}
          Zone={currentZone}
        />
      )}
      <div className="roe-card-style mt-15 mb-30">
        <div className="roe-card-header">
          <div className="row header-container">
            <div className="float-left">
              <p className="card-main-header">Visit Timeline</p>
              <p className="card-sub-header">Overview of all time</p>
            </div>
          </div>
        </div>
        <TimelineWidget data={data} indexClick={dotTimelineClick} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authData: {
      accessToken: state.auth.accessToken,
      permissions: state.auth.permissions
    },
    patientData: {
      patientID: state.patient.viewingPatientID,
      patientVisitTimeline: state.patient.patientVisitTimeline
    }
  };
};

export default connect(mapStateToProps, { getPatientTimeline })(
  PatientVisitTimeLine
);
