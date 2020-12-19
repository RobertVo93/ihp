import styled from "styled-components";
const MiniWidgetWrapperV1 = styled.div`
    height: 100%;
    .mini-widget-card {
        height: 100%;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        transition: all .2s;
        padding: 16px;
        font-size: 16px;
        font-weight: 600;
        background: url('${props => props.background}');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: right;
        color: ${props => (props.dark ? "#ffffff" : "#000000")};
        i {
            font-size: 50px;
            color:  ${props => props.iconColor};
        }

        .subheader {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: bold;
            font-size: 1rem;
            line-height: 2rem;
            color: #FFFFFF;
        }
        .headline-container {
            display: flex;
            align-items: flex-end;
            .headline-text {
                width: 100%;
                height: 48px;
                text-align: right!important;
                font-family: "Noto Sans";
                font-style: normal;
                font-weight: bold;
                font-size: 1.25rem;
                line-height: 3rem;
                letter-spacing: -0.25px;
                color: #F2F2F2;
                cursor: default;
            }
        }
    }
`;

export default MiniWidgetWrapperV1;
