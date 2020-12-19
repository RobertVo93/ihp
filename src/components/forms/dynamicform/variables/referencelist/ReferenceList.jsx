import React, { useEffect, useState } from 'react';
import propTypes from "prop-types";
import { TextField, Checkbox } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import './ReferenceList.scss';
import { ReferenceService } from './Reference.service';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export const ReferenceList = (props) => {
    const referenceService = new ReferenceService();
    const [referenceKey, setReferenceKey] = useState('');
    const [selected, setSelected] = useState(null);
    const [data, setData] = useState([]);
    const [optionKeys, setOptionKeys] = useState([]);
    const [optionValues, setOptionValues] = useState([]);
    const [optionLoadCompleted, setOptionLoadCompleted] = useState(false);

    /**
     * ComponentDidMount
     */
    useEffect(() => {
        async function fetchMyAPI() {
            let displayedData = [];

            //Get datasource of reference list
            let response = await referenceService.getByUrl(props.serverUrl);
            if (response && response.success) {
                //generate datasource from response data
                response.data.forEach(element => {
                    //Clone the response element
                    let newObj = JSON.parse(JSON.stringify(element));
                    //remove the fields that do not display in option
                    if (props.listFields) {
                        for (let p in newObj) {
                            if (props.listFields.indexOf(p) === -1 && p !== props.idField && p !== props.displayField) {
                                //remove object's properties excepts idField and displayField
                                delete newObj[p];
                            }
                        }
                        displayedData.push(newObj);
                    }
                });
            }
            //Update state
            setOptionLoadCompleted(true);
            setReferenceKey(props.referenceKey);
            setData(displayedData);
        }
        fetchMyAPI();
    }, []);

    /**
     * ComponentDidUpdate: state.data
     * Regenerate option keys and option values
     */
    useEffect(() => {
        let keys = [], values = [];
        if (data.length > 0) {
            data.forEach((val) => {
                keys.push(val[props.idField]);
                values[val[props.idField]] = val;
            });
        }
        //Set option keys and values list
        setOptionKeys(keys);
        setOptionValues(values);
        //Update the selected option from list datasource
        if (props.selected && optionLoadCompleted) {
            setSelected(props.selected);
        }
    }, [data]);

    /**
     * ComponentDidUpdate: props.selected
     * Update the selected option from list datasource
     */
    useEffect(() => {
        if (props.selected && optionLoadCompleted) {
            setSelected(props.selected);
        }
    }, [props.selected]);

    /**
     * ComponentDidUpdate: selected
     * Send selected option to parent component
     */
    useEffect(() => {
        props.onSelectionChange({
            referenceKey: referenceKey,
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
    };

    /**
     * Handle action change selection
     * @param event change event
     * @param value value selected
     * @param reason reason for change
     */
    const onChangeDropdown = (event, value, reason) => {
        setSelected(value);
    };

    /**
     * Get Option label (display value)
     * @param {*} option Option value
     * @param {*} key Key of field need to display in an option
     */
    const getOptionValue = (option, key) => {
        let result = '';
        if (optionValues && optionValues[option]) {
            result = optionValues[option][key];
        }
        return result;
    };

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
            getOptionLabel={(option) => getOptionValue(option, props.displayField)}
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
                    {
                        Object.keys(optionValues[option]).map((opt, ind) => (
                            <span className="font-theme" style={{ paddingRight: '10px' }} key={ind}>
                                {getOptionValue(option, opt)}
                            </span>
                        ))
                    }
                </React.Fragment>
            )}
            style={{ width: '100%' }}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Please select items" placeholder="Search for items ..." />
            )}
        />
    );
}

ReferenceList.prototype = {
    serverUrl: propTypes.string,
    displayField: propTypes.string,
    listFields: propTypes.array,
    filterCondition: propTypes.string,
    referenceKey: propTypes.string,
    selected: propTypes.array,
    onSelectionChange: propTypes.func,
    multiple: propTypes.bool,
    idField: propTypes.string,
    readOnly: propTypes.bool
}