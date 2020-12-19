import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import userActions from 'redux/account/actions';
import AccountForm from "./AccountForm";
import { FormConfig } from "components/forms/dynamicform";

const { updateUserInfo, addUser } = userActions

const AccountManagementNewModal = (props) => {
  let formConfig = new FormConfig();
  const [modal, setmodal] = useState(true);
  const [user, setUser] = useState({});
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (props.selectedUser) {
      const userDetail = props.data.userInfo.find(user => user.UserID === props.selectedUser.UserID);
      setUser(userDetail);
    }
  }, []);

  const closeModal = (modal) => {
    props.callbackClose();
  };

  /**
   * Handle submit account form
   * @param {*} form 
   */
  const onFormSubmitHandler = async (form) => {
    try {
      if (form.Type === formConfig.options.accountType[1].key) {
        //if type is company => convert single selection to array
        form.CompanyMap = form.CompanyMapSingle ? [form.CompanyMapSingle] : null;
      }
      if (!form.UserID) {
        //UserID is Null mean this is new account => create account
        await props.addUser(props.authData, form);
      }
      else if (!props.viewMode) {
        //viewMode is false mean this is edit mode => update account
        await props.updateUserInfo(props.authData, form);
      }
      window.location.reload();
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
            !user.UserID ?
              (`Create new Account`)
              :
              (`${props.viewMode ? 'View' : 'Edit'} Username: ${user.Username}`)
          }

        </ModalHeader>
        <ModalBody>
          <AccountForm account={user} onSubmit={onFormSubmitHandler} viewMode={props.viewMode} />
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

AccountManagementNewModal.prototype = {
  selectedUser: propTypes.object,
  callbackClose: propTypes.func,
  viewMode: propTypes.bool
}

const mapStateToProps = (state) => {
  return {
    authData: {
      accessToken: state.auth.accessToken,
    },
    data: {
      userInfo: state.account.userInfo
    }
  };
}

export default connect(
  mapStateToProps,
  { updateUserInfo, addUser }
)(AccountManagementNewModal);