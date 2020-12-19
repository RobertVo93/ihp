import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from 'react-redux';
import AlertEscalationForm from "./AlertEscalationForm";

class AlertEscalationModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modal: true
        }
    }

    /**
     * Handle close modal
     * @param {*} needReload   flag to let reload the background page
     */
    closeModal = (needReload = false) => {
        this.props.callbackClose(needReload);
    }

    render() {
        return (
            <Modal
                isOpen={this.state.modal}
                toggle={this.closeModal}
                size="lg"
                onExit={this.closeModal}
                onClosed={this.closeModal}
            >
                <ModalHeader toggle={() => this.setState({ modal: !this.state.modal })}>
                    {this.props.alertID === 0 ? 'Create New' : 'Edit'}
                </ModalHeader>
                <ModalBody>
                    <AlertEscalationForm alertID={this.props.alertID} onClosed={this.closeModal} />
                </ModalBody>
                <ModalFooter>
                    <Button className="c-secondary" onClick={() => this.closeModal(!this.state.modal)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps, {})(AlertEscalationModal);
