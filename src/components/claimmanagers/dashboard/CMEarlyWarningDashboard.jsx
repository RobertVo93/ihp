import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { calculateAging, calculateZone } from "util/constant_methods";
import { connect } from "react-redux";
import { LinearProgressWidget } from "components/widgets/statisticswidgets";
import CMActions from "redux/claimmanagers/actions";

const { getClaimsDates } = CMActions;

const CMEarlyWarningDashboard = props => {
  //Define states
  const [totalClaims, setTotalClaims] = useState(0);
  const [greenClaims, setGreenClaims] = useState(0);
  const [orangeClaims, setOrangeClaims] = useState(0);
  const [redClaims, setRedClaims] = useState(0);

  /**
   * ComponentDidMount
   */
  useEffect(() => {
    props.getClaimsDates(props.authData);
  }, []);

  /**
   * ComponentDidUpdate
   * Observe object: props.cmData.claimsDates
   */
  useEffect(() => {
    if (
      props.cmData.claimsDates == null ||
      props.cmData.claimsDates.length == 0
    )
      return;
    //Define the controls
    let totalClaims = props.cmData.claimsDates.length;
    let greenCount = 0;
    let orangeCount = 0;
    let redCount = 0;
    //Get the TAT and base on it to determine the status of a claim (green, orange or red)
    for (var i = 0; i < props.cmData.claimsDates.length; i++) {
      let currentTAT = calculateAging(
        props.cmData.claimsDates[i].LastModifiedDate
      );
      let zone = calculateZone(currentTAT);
      if (zone === "Green") {
        greenCount++;
      } else if (zone === "Orange") {
        orangeCount++;
      } else {
        redCount++;
      }
    }
    //Set the value for state
    setTotalClaims(totalClaims);
    setGreenClaims(greenCount);
    setOrangeClaims(orangeCount);
    setRedClaims(redCount);
  }, [props.cmData.claimsDates]);

  return (
    <div>
      <div className="roe-card-style mt-15 mb-30">
        <div className="roe-card-header">
          <div className="row header-container">
            <div className="float-left">
              <p className="card-main-header">Early Warning Device</p>
              <p className="card-sub-header">Overview of all time</p>
            </div>
            <div className="float-right">
              {window.location.pathname != "/early-warning" && (
                <Button
                  href="/early-warning"
                  className="more-information-btn"
                  size="sm"
                >
                  More information
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="row mlr-0" style={{ marginTop: "-15px" }}>
          <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 ptb-15">
            <LinearProgressWidget
              headline="Claims in the Green Zone"
              progress={Math.round((greenClaims / totalClaims) * 100)}
              progressColor="#5AC926"
              info={greenClaims + " out of " + totalClaims + " (0-2 days)"}
            />
          </div>
          <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 ptb-15">
            <LinearProgressWidget
              headline="Claims in the Orange Zone"
              progress={Math.round((orangeClaims / totalClaims) * 100)}
              progressColor="#ECB22E"
              info={orangeClaims + " out of " + totalClaims + " (3-4 days)"}
            />
          </div>
          <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 ptb-15">
            <LinearProgressWidget
              headline="Claims in the Red Zone"
              progress={Math.round((redClaims / totalClaims) * 100)}
              progressColor="#E01E5A"
              info={redClaims + " out of " + totalClaims + " (5-7 days)"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authData: {
      accessToken: state.auth.accessToken
    },
    cmData: {
      claimsDates: state.claimmanagers.claimsDates[0]
    }
  };
};

export default connect(mapStateToProps, { getClaimsDates })(
  CMEarlyWarningDashboard
);
