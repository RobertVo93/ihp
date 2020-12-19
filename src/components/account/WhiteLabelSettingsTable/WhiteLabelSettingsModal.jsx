import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import userActions from 'redux/account/actions';
import LabelSettingForm from "./LabelSettingForm";
import { blobToObject } from "helper/methods";

const { updateLabelSettings, uploadLogo, createLabelSettings } = userActions

const WhiteLabelSettingsModal = (props) => {
  const [modal, setmodal] = useState(true);
  const [label, setLabel] = useState({});
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const labelDetail = { ...props.selectedLabel }
    if (labelDetail.logo_url) {
      labelDetail.logo_url = blobToObject(labelDetail.logo_url.data, labelDetail.logo_mime)
    }
    setLabel(labelDetail);
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
      if (!props.viewMode) {
        let logo;
        if (form.logo_url && form.logo_url.constructor === File) {
          //This case is update new logo (image file)
          const data = new FormData()
          data.append('file', form.logo_url)
          //upload image
          let result = await uploadLogo(data);
          logo = result.data.logo;
        }
        if (props.selectedLabel) {
          updateLabelSettings(props.authData, { ...form, logo: logo }).then(() => window.location.reload());
        } else {
          createLabelSettings(props.authData, { ...form, logo: logo }).then(() => window.location.reload());
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
            !label.id ?
              (`Create new WhiteLabel Setting`)
              :
              (`${props.viewMode ? 'View' : 'Edit'} WhiteLabelID: ${label.id}`)
          }
        </ModalHeader>
        <ModalBody>
          <LabelSettingForm label={label} onSubmit={onFormSubmitHandler} viewMode={props.viewMode} />
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

WhiteLabelSettingsModal.prototype = {
  selectedLabel: propTypes.object,
  callbackClose: propTypes.func,
  viewMode: propTypes.bool
}

const mapStateToProps = (state) => {
  return {
    authData: {
      accessToken: state.auth.accessToken,
    },
    data: {
      labelSettings: state.account.labelSettings
    }
  };
}

export default connect(
  mapStateToProps
)(WhiteLabelSettingsModal);