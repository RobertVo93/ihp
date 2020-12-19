import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import userActions from 'redux/account/actions';
import RoleForm from "./RoleForm";

const { updateRole, createRole } = userActions

const RoleManagementModal = (props) => {
  const [modal, setmodal] = useState(true);
  const [role, setRole] = useState({});
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (props.selectedRole) { 
        setRole(props.selectedRole)
    }
  }, [])

  const closeModal = (modal) => {
    props.callbackClose();
  };

  /**
   * Handle submit role form
   * @param {*} form 
   */
  const onFormSubmitHandler = async (form) => {
    try {
      if (!props.viewMode) {
        if (props.selectedRole) {
          updateRole(props.authData, form).then(() => window.location.reload());
        } else {
          createRole(props.authData, form).then(() => window.location.reload());
        }
      }
    } catch (error) {
      setShowError(true);
    }
  }

  /**
   * Hide error popup
   */
  const toggleError = () => {
    setShowError(false);
  };

  return (
    <div>
      <SweetAlert
        title="Error"
        onConfirm={toggleError}
        show={showError}
      >
        <div>
          Something wrong !!!
        </div>
      </SweetAlert>
      <Modal
        isOpen={modal}
        toggle={closeModal}
        size="lg"
        onExit={closeModal}
        onClosed={closeModal}
      >
        <ModalHeader toggle={() => setmodal(!modal)}>
          {
            !role.RoleID ?
              (`Create new Role`)
              :
              (`${props.viewMode ? 'View' : 'Edit'} Role: ${role.RoleID}`)
          }
        </ModalHeader>
        <ModalBody>
          <RoleForm role={role} onSubmit={onFormSubmitHandler} viewMode={props.viewMode} />
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

RoleManagementModal.prototype = {
  selectedRole: propTypes.object,
  callbackClose: propTypes.func,
  viewMode: propTypes.bool
}

const mapStateToProps = (state) => {
  return {
    authData: {
      accessToken: state.auth.accessToken,
    },
  };
}

export default connect(
  mapStateToProps
)(RoleManagementModal);