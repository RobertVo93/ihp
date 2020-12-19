import React, { createRef, useEffect, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import classNames from "classnames";
import { Button } from "reactstrap";
import CustomRangeDatepickerWrapper from "./customRangeDatepickerWidget.style";
import { backButtonIcon, nextButtonIcon, calendarIcon } from "helper/constant";

const CustomRangeDatepickerWidget = ({
  initStart,
  initEnd,
  inline = true,
  onSelectRange = () => { }
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datepickerMode, setDatepickerMode] = useState("bydate");
  const [selectedTimeRange, setSelectedTimeRange] = useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  useEffect(() => {
    calculateSelectedRange(startDate, endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    setStartDate(initStart);
  }, [initStart]);

  useEffect(() => {
    setEndDate(initEnd);
  }, [initEnd]);

  /**
     * Print the start and end date of selected range
     * @param {*} start start date
     * @param {*} end end date
     */
  const calculateSelectedRange = (start, end) => {
    //return empty if one of endpoint does not have value.
    if (!start || !end) {
      setSelectedTimeRange("");
      return;
    }
    let startStr = "",
      endStr = "";
    let startDate = start.getDate();
    let startMonth = start.getMonth();
    let startYear = start.getFullYear();
    let endDate = end.getDate();
    let endMonth = end.getMonth();
    let endYear = end.getFullYear();

    if (datepickerMode === "bymonth") {
      //If the same year => display like Jan - Dec 2020
      startStr = `${months[startMonth].substr(0, 3)} ${startYear !== endYear ? startYear : ""
        }`;
      endStr = `${months[endMonth].substr(0, 3)} ${endYear}`;
    } else {
      //If the same month => display like 1 - 30 Oct
      startStr = `${startDate} ${startMonth !== endMonth ? months[startMonth].substr(0, 3) : ""
        }`;
      endStr = `${endDate} ${months[endMonth].substr(0, 3)}`;
    }
    setSelectedTimeRange(`${startStr} - ${endStr}`);
    // return `${startStr} - ${endStr}`;
  };

  /**
   * Handle action select on datepicker
   * @param {*} date
   */
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  /**
   * Handle action Clear selected range
   */
  const clearSelectedRange = () => {
    setStartDate(null);
    setEndDate(null);
  };

  /**
   * Handle action change mode [date, month]
   * @param {*} e
   */
  const onDatepickerModeChanged = e => {
    setDatepickerMode(e.target.value);
  };

  /**
   * Custom Container of datepicker
   * @param {*} param0
   */
  const DatepickerContainer = ({ className, children }) => {
    /**
   * Handle action click apply button
   */
    const onApplyButton = () => {
      calendar.current.setOpen(false);
    }

    return (
      <CalendarContainer className={classNames(className, "calendarContainer")}>
        <div className="body-datepicker">{children}</div>
        <div className="footer-datepicker">
          <Button className="apply-btn" onClick={onApplyButton} size="sm">
            Apply
          </Button>
        </div>
      </CalendarContainer>
    );
  };

  /**
   * Custom header of datepicker
   * @param {*} props
   * @param {*} startDate
   * @param {*} endDate
   */
  const DatepickerCustomHeader = (props, startDate, endDate) => {
    /**
     * Calculate the value of current view in datepicker like October, 2020 or 2021
     */
    const calculateParentLayer = () => {
      if (datepickerMode === "bymonth") {
        return props.date.getFullYear();
      } else {
        return `${months[props.date.getMonth()]}, ${props.date.getFullYear()}`;
      }
    };

    /**
     * Handle click back button in header datepicker
     */
    const backActionHandler = () => {
      if (datepickerMode === "bymonth") {
        props.decreaseYear();
      } else {
        props.decreaseMonth();
      }
    };

    /**
     * Handle click next button in header datepicker
     */
    const nextActionHandler = () => {
      if (datepickerMode === "bymonth") {
        props.increaseYear();
      } else {
        props.increaseMonth();
      }
    };

    return (
      <div className="datepicker-header-custom">
        <div className="row">
          <div className="col-8 selected-value-container">
            {calculateParentLayer()}
          </div>
          <div className="col-4 row">
            <div>
              <Button
                className="back-btn"
                onClick={backActionHandler}
                disabled={props.prevMonthButtonDisabled}
              >
                <img src={backButtonIcon} />
              </Button>
            </div>
            <div>
              <Button
                className="next-btn"
                onClick={nextActionHandler}
                disabled={props.nextMonthButtonDisabled}
              >
                <img src={nextButtonIcon} />
              </Button>
            </div>
          </div>
        </div>
        <div className="row mtb-15">
          <div className="col-8">
            {startDate && endDate && (
              <p className="selected-range-value">
                {selectedTimeRange}
                <a className="clear-btn" onClick={clearSelectedRange} href="#">
                  x
                </a>
              </p>
            )}
          </div>
          <div className="col-4 datepicker-mode row">
            <select
              name="datepickermode"
              onChange={onDatepickerModeChanged}
              id="datepickermode"
              value={datepickerMode}
            >
              <option className="cursor-pointer" value="bydate">
                By Date
              </option>
              <option className="cursor-pointer" value="bymonth">
                By Month
              </option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Custom input of datepicker
   * @param {*} param0 
   */
  const DatepickerCustomInput = React.forwardRef((props, ref) => {
    return (
      <div className="datepicker-input-container" onClick={e => calendar.current.setOpen(true)}>
        <input type="text" readOnly={true}
          className="datepicker-input"
          value={selectedTimeRange}
        />
        <img src={calendarIcon} className="calendar-icon" />
      </div>

    )
  });
  const calendar = createRef();
  return (
    <CustomRangeDatepickerWrapper>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        showMonthYearPicker={datepickerMode === "bymonth"}
        selectsRange
        inline={inline}
        shouldCloseOnSelect={false}
        calendarContainer={props => DatepickerContainer(props)}
        renderCustomHeader={props => {
          return DatepickerCustomHeader(props, startDate, endDate);
        }}
        dayClassName={date => "datepicker-custom-day"}
        customInput={<DatepickerCustomInput />}
        onCalendarClose={e => onSelectRange(startDate, endDate)}
        popperPlacement="top-end"
        ref={calendar}
      />
    </CustomRangeDatepickerWrapper>
  );
};

export default CustomRangeDatepickerWidget;
