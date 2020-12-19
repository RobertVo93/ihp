import React, { useState, useEffect, Fragment } from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const ContainerDiv = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.3);
`;

const ChartLoading = props => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(props.isLoading);
    }, [props.isLoading]);

    return (
        <Fragment>
            {loading &&
                <ContainerDiv style={props.style}>
                    <div style={{ marginLeft: "45%", width: "100%", height: "30%" }}>
                        <ReactLoading
                            type={"spin"} color={"white"} height={'20%'} width={'20%'}
                        />
                    </div>
                </ContainerDiv>
            }
        </Fragment>
    );
};

export default ChartLoading;