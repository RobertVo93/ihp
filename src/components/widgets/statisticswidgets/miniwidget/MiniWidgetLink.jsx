import React from 'react';
import classNames from 'classnames';
import MiniWidgetWrapper from './miniwidget.style';

const MiniWidgetLink = (
    { iconName, iconColor, background = '#ffffff', headline = '', subheader = '', linkDisplay = '', linkRef = '', rightIcon = false, className, dark = false }
) => {
    return (
        <MiniWidgetWrapper
            iconColor={iconColor}
            background={background}
            dark={dark}
        >
            {
                rightIcon ?
                    <div className={classNames('mini-widget-card', className)}>
                        <div className="row ma-0">
                            <div className="col-8 ptb-12">
                                <div>
                                    {headline}
                                </div>
                                <div className="subheader">
                                    {subheader}
                                </div>
                                <hr />
                                <div>
                                    <a href={linkRef}>{linkDisplay}</a>
                                </div>
                            </div>
                            <div className="col-4 ptb-12 text-right">
                                <i className={iconName}></i>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={classNames('mini-widget-card', className)}>
                        <div className="row ma-0">
                            <div className="col-3 ptb-12">
                                <i className={iconName}></i>
                            </div>
                            <div className="col-9 ptb-12 text-right">
                                <div>
                                    {headline}
                                </div>
                                <div className="subheader">
                                    {subheader}
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </MiniWidgetWrapper>
    )
}

export default MiniWidgetLink;