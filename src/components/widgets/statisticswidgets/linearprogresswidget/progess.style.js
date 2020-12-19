import styled from "styled-components";
const LinearProgressWrapper = styled.div`
  .linear-widget-card {
    background-color: ${props => props.background};
    color: ${props => (props.dark ? "#ffffff" : "#000000")};
    transition: all 0.2s;
    border: 1px solid rgba(0, 0, 0, 0.125);
    .linear-widget-header {
      padding: 10px 16px 6px;
      font-family: "Noto Sans";
      font-style: normal;
      font-weight: bold;
      font-size: 1rem;
      line-height: 1.5rem;
      color: #2c405a;
    }
    .linear-widget-card-info {
      font-size: 0.75rem;
      line-height: 1.125rem;
      color: #abb5c4;
    }
    .react-sweet-progress-symbol {
      color: ${props => props.color};
      font-family: "muli-semi-bold";
    }
    .react-sweet-progress{
        position: relative;
    }
    .react-sweet-progress-symbol {
        position: absolute;
        top: -22px;
        right: 20px;
    }
  }
`;

export default LinearProgressWrapper;
