import React from 'react';
import classNames from 'classnames';
import MiniWidgetWrapperV1 from './miniwidgetV1.style';

const MiniWidgetLinkV1 = ({
    background = '#ffffff',
    headline = '',
    subheader = '',
    linkDisplay = '',
    linkRef = '',
    className
}) => {
    return (
        <MiniWidgetWrapperV1
            background={background}
        >
            <div className={classNames('mini-widget-card', className)}>
                <div className="card-container">
                    <div className="row ma-0">
                        <div className="subheader">{subheader}</div>
                    </div>
                    <div className="row ma-0 pt-20">
                        <div className="headline-container">
                            <div className="headline-text">{headline}</div>
                        </div>
                    </div>
                    <div className="row ma-0 pt-20">
                        <a href={linkRef}>{linkDisplay}</a>
                    </div>
                </div>
            </div>
        </MiniWidgetWrapperV1>
    )
}

export default MiniWidgetLinkV1;