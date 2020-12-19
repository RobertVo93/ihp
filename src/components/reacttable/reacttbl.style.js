import styled from "styled-components";

const ReactTableWrapper = styled.div`
  .tbl-loader {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    .lds-ring {
      div {
        width: 8px !important;
        height: 45px !important;
        margin: 0px !important;
        border-color: #563c91 transparent transparent transparent !important;
      }
    }
  }

  .module-header {
    display: flex;
    align-items: center;
    @media (max-width: 575.98px) {
      display: block;
      .react-form-input {
        margin-top: 15px;
        margin-bottom: 5px;
      }
      button {
        margin: 0 !important;
      }
    }
  }
  table {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  tr:nth-child(even) {
    background: rgba(255, 255, 255);
  }
  tr:nth-child(odd) {
    background: rgba(255, 255, 255);
  }

  .table-container {
    margin: auto 24px;
    padding-bottom: 20px;
  }
  .custom-react-table-theme-class {
    border: none !important;
    th {
      min-width: 20px;
      border: none !important;
      background: #f2f2f2;
      font-family: "Noto Sans";
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      line-height: 18px;
      color: #828282;
    }
    tbody {
      tr {
        border-bottom: 0.5px solid #e0e0e0;
        td {
          padding: 10px;
          font-family: "Noto Sans";
          font-style: normal;
          font-weight: normal;
          font-size: 0.875rem;
          line-height: 1.375rem;
          color: #757575;
          border: none !important;
          .tabl-search {
            font-style: italic;
            font-weight: 300;
            font-size: 0.75rem;
            line-height: 1.125rem;
            color: #9696a0;
          }
          .wide-cell {
            width: 150px;
          }
        }
      }
    }
  }

  .Table__itemCount {
    font-size: 14px;
  }

  .Table__pagination {
    display: flex;
    justify-content: center;
    padding: 20px 24px;
    .Table__pageButton_navigation {
      background: #ffffff;
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
      border-radius: 5px;
      border: none;
      width: 30px;
      height: 30px;
      &:disabled {
        background: #e5e5e5;
        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        cursor: not-allowed;
        color: gray;
      }
      img {
        padding-bottom: 3px;
      }
    }
  }

  .Table__pageButton {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0 0 0 10px;
    border-radius: 4px;
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: bold;
    font-size: 0.75rem;
    line-height: 1.125rem;
    color: #000000;
  }

  .Table__pageButton:disabled {
    cursor: not-allowed;
    color: gray;
  }

  .Table__pageButton--active {
    background: #ffffff;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
    color: #6e1c74;
  }

  .tabl-search {
    padding: 4px;
    margin: 10px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    &:focus {
      outline: 0;
    }
  }

  .back-icon {
    position: absolute;
    right: 30px;
    bottom: 27px;
    color: #563c91;
  }

  .-sort-desc {
    box-shadow: none !important;
    &:after {
      content: "▼";
      margin-left: 14px;
      color: #828282;
    }
  }

  .-sort-asc {
    box-shadow: none !important;
    &:after {
      content: "▲";
      margin-left: 14px;
      color: #828282;
    }
  }
  .react-action-class.wide-cell {
    width: 150px;
  }
  .react-action-class {
    button {
      height: auto !important;
      width: auto !important;
    }
  }
  .break-word {
    word-break: break-word;
  }
`;

export default ReactTableWrapper;
