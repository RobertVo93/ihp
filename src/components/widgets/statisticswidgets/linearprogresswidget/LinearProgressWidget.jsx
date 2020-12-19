import React from "react";
import classNames from "classnames";
import { Progress } from "react-sweet-progress";
import LinearProgressWrapper from "./progess.style";
import "react-sweet-progress/lib/style.css";

const LinearProgressWidget = ({
  headline,
  progress,
  progressColor,
  dark = false,
  info,
  className,
  background = "#ffffff"
}) => {
  return (
    <LinearProgressWrapper
      dark={dark}
      background={background}
      color={progressColor}
    >
      <div className={classNames("linear-widget-card roe-shadow-2", className)}>
        <div className="linear-widget-header">
          <div>{headline}</div>
          <div className="linear-widget-card-info">{info}</div>
        </div>
        <div className="plr-16 ptb-16">
          <div className="pb-6">
            <Progress
              percent={progress}
              theme={{
                active: {
                  color: `${progressColor}`
                },
                success: {
                  color: `${progressColor}`,
                  symbol: "100%"
                }
              }}
            />
          </div>
        </div>
      </div>
    </LinearProgressWrapper>
  );
};

export default LinearProgressWidget;
