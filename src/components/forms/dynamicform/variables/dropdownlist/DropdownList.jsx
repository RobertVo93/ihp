import React, { useEffect, useState } from 'react';
import propTypes from "prop-types";
import { TextField, Checkbox } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import './DropdownList.scss';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CustomDropDown = (props) => {
    const [dropdownKey, setDropdownKey] = useState('');
    const [selected, setSelected] = useState(null);
    const [optionKeys, setOptionKeys] = useState([]);
    const [optionValues, setOptionValues] = useState([]);

    /**
     * ComponentDidMount
     */
    useEffect(() => {
        //set Dropdown list key and selected value
        if (props.selected) {
            setSelected(props.selected);
        }
        setDropdownKey(props.dropdownKey);
    }, []);

    /**
     * ComponentDidUpdate: watch props.selected
     */
    useEffect(() => {
        //set selected value
        if (props.selected) {
            setSelected(props.selected);
        }
    }, [props.selected]);

    /**
     * ComponentDidUpdate: watch on props.options
     */
    useEffect(() => {
        let keys = [], values = [];
        if (props.options && props.options.length > 0) {
            props.options.forEach((val) => {
                keys.push(val.key);
                values[val.key] = val.value;
            });
        }
        //Set option keys and values list
        setOptionKeys(keys);
        setOptionValues(values);
    }, [props.options]);

    /**
     * ComponentDidUpdate: watch on selected
     */
    useEffect(() => {
        props.onSelectionChange({
            dropdownKey: dropdownKey,
            selected: selected
        });
    }, [selected]);

    /**
     * Handle action close dropdown list
     * @param event change event
     * @param reason reason for close
     */
    const onCloseDropdown = (event, reason) => {
        //TODO: will handle onClose dropdown if there is any error later
    }

    /**
     * Handle action change selection
     * @param event change event
     * @param value value selected
     * @param reason reason for change
     */
    const onChangeDropdown = (event, value, reason) => {
        setSelected(value);
    }

    return (
        <Autocomplete
            multiple={props.multiple}
            id="autocomplete-box"
            className="font-theme"
            value={(props.multiple && !selected) ? [] : selected}
            onClose={onCloseDropdown}
            onChange={onChangeDropdown}
            options={optionKeys}
            disableCloseOnSelect={props.multiple}
            autoSelect={false}
            disabled={props.readOnly}
            autoHighlight
            getOptionLabel={(option) => optionValues[option] || ''}
            renderOption={(option, { selected }) => (
                <React.Fragment>
                    {
                        props.multiple ?
                            (
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                            )
                            :
                            ('')
                    }
                    <span>{optionValues[option]}</span>
                </React.Fragment>
            )}
            style={{ width: '100%' }}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Please select items" placeholder="Search for items ..." />
            )}
        />
    );
}

CustomDropDown.prototype = {
    dropdownKey: propTypes.string,
    selected: propTypes.array,
    onSelectionChange: propTypes.func,
    options: propTypes.array,
    multiple: propTypes.bool,
    readOnly: propTypes.bool
}