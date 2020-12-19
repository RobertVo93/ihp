import styled from "styled-components";

export const PatientStatsWidgetWrapper = styled.div`
  .square-indicator {
    width: 15px;
    height: 15px;
  }
  .middle-block {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    margin: auto;
    transform: translateY(-50%);
  }
  .legend-wrapper {
    .info-label {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      color: #364463;
    }
    .info-value {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #000000;
    }
    .group-legend {
      background: #5073B8;
    }
    .group-non-panel {
      background: #FF0000;
    }
    .group-panel {
      background: #FFE600;
    }
  }
  .aligner-wrapper {
    display: flex;
    align-items: center;
    padding-left: 0px;
    padding-right: 0px;
    .aligner-container {
      width: 100%;
      .chart-container {
        width: 150px;
        height: 150px;
        margin: 0px auto;
      }
    }
    .visit-count-container {
      position: absolute;
      width: 100%;
    }
  }
`;
