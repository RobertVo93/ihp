import React from "react";
import styled from "styled-components";

const MarqueeTextWrapper = styled.div`
`;

/**
 * Use for single line text (only 1 row)
 * @param {*} param0 
 */
const MarqueeText = ({
    behavior = "alternate",
    text = "",
    className
}) => {
    const marqueeId = `marquee-${className ? className.split(' ').join('') : ''}-${text ? text.split(' ').join('') : ''}`;
    //Handle text running if overflow the container (too long text)
    /**
     * Check the element is an overflow text
     * @param {*} element 
     */
    const isElementOverflowing = (element) => {
        var overflowX = element.offsetWidth < element.scrollWidth;
        return overflowX;
    }

    /**
     * Wrapp marquee to the children of element
     * @param {*} element text element
     */
    const wrapContentsInMarquee = (element) => {
        var marquee = document.createElement('marquee'),
            contents = element.innerText;

        marquee.innerText = contents;
        marquee.behavior = behavior;
        marquee.scrollDelay = ((element.scrollWidth - element.offsetWidth) > 50 || behavior == "scroll") ? "50" : "500";
        marquee.scrollAmount = 1;
        element.innerHTML = '';
        element.appendChild(marquee);
    }

    var element = document.getElementById(`${marqueeId}`);
    if (element && isElementOverflowing(element)) {
        wrapContentsInMarquee(element);
    }

    return (
        <MarqueeTextWrapper className={className} title={text} id={`${marqueeId}`}>
            {text ? text.replace(/<\/?[^>]+(>|$)/g, "").replace(/\r\n/g,"") : text}
        </MarqueeTextWrapper>
    );
};

export default MarqueeText;
