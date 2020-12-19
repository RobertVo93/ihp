import React, { useState, useEffect } from "react";
import HorizontalTimeline from "./HorizontalTimeline/Components/HorizontalTimeline";
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'

const timelineSetting = {
    minEventPadding: 0,
    maxEventPadding: 1000,
    linePadding: 100,
    labelWidth: 100,
    fillingMotionStiffness: 150,
    fillingMotionDamping: 25,
    slidingMotionStiffness: 150,
    slidingMotionDamping: 25,
    stylesBackground: '#f8f8f8',
    stylesForeground: '#7b9d6f',
    stylesOutline: '#7b9d6f',
    stylesLabel: '#333'
};
export const TimelineWidget = (props) => {
    const [curIdx, setCurIdx] = useState(0);
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);

    useEffect(() => {
        setCurIdx(props.data.length - 1);
    }, [props.data]);

    return (
        <div>
            {
                props.data.length > 0 &&
                <div
                    style={{
                        width: "95%",
                        height: "100px",
                        margin: "0 auto"
                    }}
                >
                    <HorizontalTimeline
                        values={props.data.map(x => { return { 'value': x.timelineValue, 'dotType': x.dotType }; })}
                        styles={{
                            background: timelineSetting.stylesBackground,
                            foreground: timelineSetting.stylesForeground,
                            outline: timelineSetting.stylesOutline,
                            label: timelineSetting.stylesLabel,
                        }}
                        index={curIdx}
                        indexClick={index => {
                            setCurIdx(index);
                            props.indexClick(index);
                        }}
                        indexHover={(event, index, flag) => {
                            setShow(flag);
                            setTarget(event.target);
                            setCurIdx(index);
                        }}
                        fillingMotion={{ stiffness: timelineSetting.fillingMotionStiffness, damping: timelineSetting.fillingMotionDamping }}
                        labelWidth={timelineSetting.labelWidth}
                        linePadding={timelineSetting.linePadding}
                        maxEventPadding={timelineSetting.maxEventPadding}
                        minEventPadding={timelineSetting.minEventPadding}
                        slidingMotion={{ stiffness: timelineSetting.slidingMotionStiffness, damping: timelineSetting.slidingMotionDamping }}
                    />
                </div>
            }
            <Overlay
                show={show}
                target={target}
                placement="top"
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    {
                        props.data[curIdx] &&
                        <Popover.Content>
                            {props.data[curIdx].popupValue}
                        </Popover.Content>
                    }
                </Popover>
            </Overlay>
        </div>
    );
}