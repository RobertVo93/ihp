import React, { useState } from "react";
import PropTypes from "prop-types";
import { PopoverHeader, PopoverBody, UncontrolledPopover } from "reactstrap";
import './InsightsTooltips.scss';
import { insightTooltipLogo } from "helper/constant";

const InsightsTooltips = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    /**
     * Toggle popover
     */
    const toggle = () => {
        setPopoverOpen(!popoverOpen);
    }

    /**
     * OnHover popover action: show popover
     */
    const onHover = () => {
        setPopoverOpen(true);
    }

    /**
     * OnHoverLeave popover action: hide popover
     */
    const onHoverLeave = () => {
        setPopoverOpen(false);
    }

    return (
        <div className="insights-tooltips"
            onMouseEnter={onHover}
            onMouseLeave={onHoverLeave}
        >
            <a href=""
                id={props.tooltipKey}
                className="insight-link-text"
                type="button"
            >
                {props.linkText || `Insights`}
            </a>
            <UncontrolledPopover
                placement="bottom"
                isOpen={popoverOpen}
                target={props.tooltipKey}
                toggle={toggle}
                className="my-custom-popover"
            >
                <PopoverHeader>
                    <div className="header-text">
                        <img src={insightTooltipLogo} />
                    </div>
                    <div className="header-text">
                        {props.headertext}
                    </div>
                </PopoverHeader>
                <PopoverBody>
                    {props.body}
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )
};

InsightsTooltips.prototype = {
    headertext: PropTypes.element,
    body: PropTypes.element,
    linkText: PropTypes.string.isRequired,
    tooltipKey: PropTypes.string.isRequired//need unique in a page to set the target for the popup
}

export default InsightsTooltips;