import React from "react";
import classNames from "classnames";
import MiniWidgetWrapperV1 from "./miniwidgetV1.style";
import MarqueeText from "components/forms/MarqueeText";

const MiniWidgetV1 = ({
  iconSource,
  background = "#ffffff",
  headline = "",
  subheader = "",
  className,
  insightTooltips
}) => {
  return (
    <MiniWidgetWrapperV1 background={background}>
      <div className={classNames("mini-widget-card", className)}>
        <div className="row ma-0">
          <div className={classNames("subheader", insightTooltips ? "col-8" : "")}>{subheader}</div>
          <div className={classNames("subheader", insightTooltips ? "col-4 text-right" : "")}>{insightTooltips}</div>
        </div>
        <div className="row ma-0 pt-20">
          <div className="col-3">
            <img src={iconSource} height="40" alt="icon" />
          </div>
          <div className="col-9 headline-container">
            <MarqueeText text={headline} className={"headline-text"} />
          </div>
        </div>
      </div>
    </MiniWidgetWrapperV1>
  );
};

export default MiniWidgetV1;
