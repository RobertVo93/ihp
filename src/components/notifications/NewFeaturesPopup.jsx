import React, { useEffect, useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import classNames from "classnames";
import './newFeaturesPopup.scss';
import { newFeaturesBg, cancelNewFeatureButtonIcon, backButtonIcon, nextButtonIcon } from 'helper/constant';
import userActions from "redux/account/actions";

const { updateUserNotifyVersion } = userActions;

const NewFeaturesPopup = (props) => {
    const [modal, setModal] = useState(false);
    const [newFeatures, setNewFeatures] = useState([]);
    const [selectedFeatureIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        setModal(props.featureData.showNewFeaturePopup);
    }, [props.featureData.showNewFeaturePopup]);

    useEffect(() => {
        if (props.featureData.newFeatures) {
            setNewFeatures(props.featureData.newFeatures);
        } else {
            setNewFeatures([])
        }
    }, [props.featureData.newFeatures]);

    /**
     * Toggle popup
     */
    const toggle = () => {
        setModal(!modal);
        if (!modal === false) {
            props.updateUserNotifyVersion(props.authData);
        }
    }

    /**
     * Show specify new feature on click
     * @param {*} featureIndex index of new feature
     */
    const toggleNewFeature = (featureIndex) => {
        setSelectedIndex(featureIndex);
    }

    /**
     * On back button click handler: show previous new feature
     */
    const backButtonHandler = () => {
        if (selectedFeatureIndex > 0) {
            //check if the current feature is not the first one => move previous
            setSelectedIndex(selectedFeatureIndex - 1);
        }
    }

    /**
     * On next button click handler: show next new feature
     */
    const nextButtonHandler = () => {
        if (selectedFeatureIndex < newFeatures.length - 1) {
            //check if the current feature is not the last one => move next
            setSelectedIndex(selectedFeatureIndex + 1);
        }
    }

    return (
        <div>
            <Modal isOpen={modal}
                centered={true}
                toggle={toggle}
                size='lg'
                modalClassName={`new-features-modal-popup`}
                contentClassName={`new-features-content-popup`}
            >
                <ModalBody>
                    <div className="body-wrapper">
                        <div className="left-panel">
                            <img src={newFeaturesBg} />
                        </div>
                        <div className="right-panel">
                            <div className="close-popup-wrapper">
                                <img src={cancelNewFeatureButtonIcon} onClick={toggle} />
                            </div>
                            <div className="what-new-text">What’s New in IHP Nucleus {props.featureData.version}</div>
                            <div className="new-feature-content-wrapper">
                                <div className="new-feature-content">
                                    {
                                        newFeatures.map((feature, index) => (
                                            <img key={feature.id}
                                                hidden={index !== selectedFeatureIndex}
                                                src={feature.content} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navigator-button-wrapper">
                        <div className="back-navigator">
                            <button disabled={selectedFeatureIndex === 0} onClick={backButtonHandler}>
                                <img src={backButtonIcon} />
                            </button>
                        </div>
                        <div className="next-navigator">
                            <button disabled={newFeatures.length === 0 || selectedFeatureIndex === newFeatures.length - 1} onClick={nextButtonHandler}>
                                <img src={nextButtonIcon} />
                            </button>
                        </div>
                    </div>
                    <div className="features-navigator-wrapper">
                        <div className="features-navigator">
                            {
                                newFeatures.map((feature, index) =>
                                (
                                    <span className={classNames("dot-features", index === selectedFeatureIndex ? "active" : "")}
                                        key={`dot-features-${feature.id}`}
                                        onClick={e => toggleNewFeature(index)}>
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

NewFeaturesPopup.prototype = {}

const mapStateToProps = (state) => {
    return {
        authData: {
            accessToken: state.auth.accessToken
        },
        featureData: {
            showNewFeaturePopup: !!state.account.newFeatures,
            newFeatures: state.account.newFeatures?.newFeatures,
            version: state.account.newFeatures?.VersionNumberText
        }
    }
}

export default connect(mapStateToProps, { updateUserNotifyVersion })(NewFeaturesPopup);