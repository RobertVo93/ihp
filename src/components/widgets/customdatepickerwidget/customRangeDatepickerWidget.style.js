import styled from "styled-components";
const CustomRangeDatepickerWrapper = styled.div`
  .datepicker-input-container {
    position: relative;
    .datepicker-input {
      background: #FFFFFF;
      border-radius: 4px;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      color: #2F80ED;
      height: 42px;
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
      border: none;
      padding-left: 15px;
      padding-right: 15px;
      cursor: pointer;
      &:focus {
        outline: 0 !important;
      }
    }
    .calendar-icon {
      position: absolute;
      right: 12px;
      top: 12px;
      cursor: pointer;
    }
  }
  .calendarContainer {
    background: #ffffff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    border: none;
    padding: 15px;
    .datepicker-header-custom {
      margin-bottom: 40px;
      .selected-value-container {
        text-align: left;
        font-family: "Noto Sans";
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        line-height: 25px;
        color: #333333;
      }
      .selected-range-value {
        mix-blend-mode: normal;
        opacity: 0.6;
        border: 1px solid #81c926;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 3px 10px;
        left: 15px;
        position: absolute;
        color: #81c926;
        font-size: 12px;
        .clear-btn {
          text-decoration: none;
          color: #81c926;
          font-size: 13px;
          margin-left: 10px;
        }
      }
      #datepickermode {
        background: #ffffff;
        mix-blend-mode: normal;
        opacity: 0.6;
        border: 0.5px solid #cfcfcf;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        right: 0;
        padding: 3px;
        color: #000000;
        cursor: pointer;
      }
      .back-btn,
      .next-btn {
        background: #f2f2f2;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        width: 25px;
        height: 25px;
        border: none;
        position: absolute;
        padding: 0px;
        img {
          padding-bottom: 3px;
        }
      }
      .next-btn {
        right: 0;
      }
      .back-btn {
        right: 40px;
      }
    }
    .body-datepicker {
      position: relative;
      .react-datepicker__header {
        background: #ffffff;
        border: none;
        .react-datepicker__day-name {
          font-family: "Noto Sans";
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 22px;
          color: #828282;
        }
      }
      .react-datepicker__month-wrapper {
        .react-datepicker__month-text {
          border-radius: 100px;
          width: 5rem;
          height: 1.7rem;
          font-size: 0.8rem;
          line-height: 1.6rem;
          color: #abb5c4;
          &:hover {
            background: #81c926 !important;
            color: #ffffff;
          }
        }
        .react-datepicker__month--selected,
        .react-datepicker__month--range-start,
        .react-datepicker__month--range-end {
          background: #81c926;
          color: #ffffff;
        }
        .react-datepicker__month--in-range:not(.react-datepicker__month--selected):not(.react-datepicker__month--range-start):not(.react-datepicker__month--range-end) {
          background: #f2fae9;
          color: #000000;
        }
      }
      .datepicker-custom-day {
        width: 1.8rem;
        height: 1.8rem;
        font-family: "Noto Sans";
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 28px;
        color: #3f536e;
        border-radius: 100px;
        &:hover {
          border-radius: 100px;
          background: #81c926 !important;
          color: #ffffff;
        }
      }
      .datepicker-custom-day.react-datepicker__day--keyboard-selected{
        background-color: transparent;
      }
      .datepicker-custom-day.react-datepicker__day--selected,
      .datepicker-custom-day.react-datepicker__day--range-start,
      .datepicker-custom-day.react-datepicker__day--range-end {
        background: #81c926 !important;
        border-radius: 100px;
        color: #ffffff;
      }
      .datepicker-custom-day.react-datepicker__day--today:not(.react-datepicker__day--range-start):not(.react-datepicker__day--range-end):not(.react-datepicker__day--selected) {
        background: #6e1c74 !important;
        border-radius: 100px;
        color: #ffffff;
      }
      .datepicker-custom-day.react-datepicker__day--in-range,
      .datepicker-custom-day.react-datepicker__day--in-selecting-range {
        background: #f2fae9;
        mix-blend-mode: normal;
        border-radius: 100px;
      }
    }
    .footer-datepicker {
      display: flex;
      width: 100%;
      .apply-btn {
        width: 100px;
        background: #6e1c74;
        border-radius: 8px;
        font-size: 12px;
        line-height: 22px;
        color: #ffffff;
        margin: auto;
      }
    }
  }
`;

export default CustomRangeDatepickerWrapper;
