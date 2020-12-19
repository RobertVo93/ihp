import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import history from "util/history";
import utilizeActions from "redux/utilities/actions";
import AuthActions from "redux/auth/actions";

const { updateSessionTimeoutMessage } = utilizeActions;
const { logout } = AuthActions;

const SessionTimeoutAlert = props => {
  const [show, setShow] = useState(false);

  /**
   * ComponentDidUpdate: watch on props.data
   */
  useEffect(() => {
    setShow(props.data.show);
  }, [props.data]);

  /**
   * Action click OK
   */
  const onCloseConfirm = () => {
    //Hide alert
    setShow(false);
    //Hide redux storage
    props.updateSessionTimeoutMessage(false);
    props.logout();
    //Clear data and redirect to login page
    localStorage.clear();
    history.push("/login");
    window.location.reload();
  };

  return (
    <div>
      {show && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: "100000"
          }}
        >
          <SweetAlert title="Warning" onConfirm={onCloseConfirm} show={show}>
            <div>
              Oops! You have been inactive for 30 minutes, we have logged you
              out due to security reasons. Please login again.
            </div>
          </SweetAlert>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: {
      show: state.utilities.showSessionTimeoutMessage
    }
  };
};

export default connect(mapStateToProps, { updateSessionTimeoutMessage, logout })(
  SessionTimeoutAlert
);
