import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";

// const InjectMassage = props => <FormattedMessage {...props} />;

//react-intl inactive
const InjectMassage = props => {
    return (
        <span>{props.id}</span>
        // <FormattedMessage {...props} children={
        //     (message) => <Fragment>{message}</Fragment>
        // }/>
    )
}

export default injectIntl(InjectMassage, {
    withRef: false
});
