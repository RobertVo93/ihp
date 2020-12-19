import React, { useEffect, useState } from 'react';
import propTypes from "prop-types";
import styled from 'styled-components';
import { FormConfig } from './form.config';
import { CustomDropDown, RadioButton, ReferenceList, FileUploader } from './variables';
const ContainerDiv = styled.div`
`;
const DangerText = {
    color: 'red',
    fontStyle: 'italic'
};
const _ = require('lodash');
export const DynamicForm = (props) => {
    const formConfig = new FormConfig();
    const [listFields, setListFields] = useState({});
    const [errors, setErrors] = useState({});
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);

    /**
     * ComponentDidMount
     */
    useEffect(() => {
        //Init listFields with key-value from list Questions
        let listFields = {};
        props.ListFields.forEach((val) => {
            listFields[val.key] = val.value;
        });
        setListFields(listFields);
    }, []);

    /**
     * ComponentDidUpdate: props.ListFields
     * Init listFields with key-value from list Questions
     */
    useEffect(() => {
        let incommingListFields = {};
        props.ListFields.forEach((val) => {
            incommingListFields[val.key] = val.value;
        });
        setListFields(incommingListFields);
    }, [props.ListFields]);

    /**
     * ComponentDidUpdate: listFields
     * Validate form when listFields is changed
     */
    useEffect(() => {
        //Validate the form
        let { errors, valid } = validateForm(false);
        setDisableSubmitButton(!valid);
        setErrors(errors);
        //Update redux formData
        props.OnUpdateCallback(listFields);
    }, [listFields]);

    /**
     * Handle radio button changed
     * @param value Radio button state
     */
    const onRadioSelectionChange = (value) => {
        let tempListFields = _.cloneDeep(listFields);
        tempListFields[value.referenceKey] = value.value ? JSON.parse(value.value) : value.value;
        setListFields(tempListFields);
    };

    /**
     * Handle reference list selected record
     * @param e reference state
     */
    const onSelectionReferenceListChange = (e) => {
        let tempListFields = _.cloneDeep(listFields);
        tempListFields[e.referenceKey] = e.selected;
        setListFields(tempListFields);
    };

    /**
     * Handle dropdown list change
     * @param e Dropdown state
     */
    const onSelectionChangeCallback = (e) => {
        let tempListFields = _.cloneDeep(listFields);
        tempListFields[e.dropdownKey] = e.selected;
        setListFields(tempListFields);
    };

    /**
     * Handle File uploader change selected file
     */
    const onSelectFile = (e) => {
        let tempListFields = _.cloneDeep(listFields);
        tempListFields[e.fieldKey] = e.selected;
        setListFields(tempListFields);
    }

    /**
     * Handle input change
     * @param event event
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        let tempListFields = _.cloneDeep(listFields);
        tempListFields[name] = value;
        setListFields(tempListFields);
    };

    /**
     * Validate the form
     */
    const validateForm = (isSubmit) => {
        let valid = true;
        let errors = {};
        props.ListFields.forEach(element => {
            if (element.hidden === true || (listFields[element.key] == element.value && !isSubmit)) {
                //Do not validate if
                //1: field is hidden
                //2: value is not changed (current value == original value) and function is not fired by submit action
                return;
            }
            errors[element.key] = [];
            switch (element.controlType) {
                //validate fields with type textbox and textarea
                case formConfig.questionControlType.textbox:
                case formConfig.questionControlType.textarea:
                    for (var key1 in element.validators) {
                        switch (key1) {
                            //mandatory field
                            case formConfig.formValidators.require:
                                if (!(listFields[element.key] && listFields[element.key] !== "")) {
                                    errors[element.key].push(
                                        element.validators[key1].errorMessage
                                    );
                                }
                                break;
                            //min-length
                            case formConfig.formValidators.minLength:
                                if (!(listFields[element.key] && listFields[element.key].length >= element.validators[key].value)) {
                                    errors[element.key].push(
                                        element.validators[key1].errorMessage
                                    );
                                }
                                break;
                            //max-length
                            case formConfig.formValidators.maxLength:
                                if (!(listFields[element.key] && listFields[element.key].length <= element.validators[key].value)) {
                                    errors[element.key].push(
                                        element.validators[key1].errorMessage
                                    );
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                //validate fields with type reference
                case formConfig.questionControlType.reference:
                    for (var key2 in element.validators) {
                        switch (key2) {
                            //mandatory field
                            case formConfig.formValidators.require:
                                if (!listFields[element.key]) {
                                    errors[element.key].push(
                                        element.validators[key2].errorMessage
                                    );
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                //validate fields with type dropdown
                case formConfig.questionControlType.dropdown:
                    for (var key3 in element.validators) {
                        switch (key3) {
                            //mandatory field
                            case formConfig.formValidators.require:
                                //not have value or value is 0 = [--none--]
                                if (!listFields[element.key] || listFields[element.key] === 0) {
                                    errors[element.key].push(
                                        element.validators[key3].errorMessage
                                    );
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                //validate fields with type radio button
                case formConfig.questionControlType.radiobutton:
                    for (var key5 in element.validators) {
                        switch (key5) {
                            //mandatory field
                            case formConfig.formValidators.require:
                                if (!listFields[element.key]) {
                                    errors[element.key].push(
                                        element.validators[key5].errorMessage
                                    );
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                default:
                    break;
            }
        });
        //look at errors
        for (var key in errors) {
            if (errors[key].length > 0) {
                valid = false;
                break;
            }
        }
        return { errors, valid };
    };

    /**
     * Render error message base on question key
     * @param questionKey question key
     */
    const renderErrorMessage = (questionKey) => {
        //get state.error message base on question key
        let tempErrors = errors[questionKey];
        //if there is no error => return
        if (!tempErrors) return;
        //else display error message
        return (
            <div style={DangerText}>
                {
                    tempErrors.map((err, i) => (
                        <div key={i}>
                            <span>{err}</span>
                        </div>
                    ))
                }
            </div>
        );
    };

    /**
     * Render questions
     * @param question question definition
     */
    const renderQuestion = (question) => {
        //depend on type of question => render appropriate element
        switch (question.controlType) {
            //question type = textbox
            case formConfig.questionControlType.textbox:
                return (
                    <fieldset hidden={question.hidden} key={question.key} className="form-group">
                        <label htmlFor={question.key}>
                            <span hidden={!question.validators['required']} style={DangerText}>* </span><span data-text={question.label}>{question.label}</span>
                        </label>
                        <input className="form-control"
                            onChange={handleChange}
                            readOnly={question.readonly}
                            type={question.type}
                            name={question.key}
                            value={listFields[question.key] || ''}
                            id={question.key} />
                        {renderErrorMessage(question.key)}
                    </fieldset>
                );
            //question type = textarea
            case formConfig.questionControlType.textarea:
                return (
                    <fieldset hidden={question.hidden} key={question.key} className="form-group">
                        <label htmlFor={question.key}>
                            <span hidden={!question.validators['required']} style={DangerText}>* </span><span data-text={question.label}>{question.label}</span>
                        </label>
                        <textarea className="form-control"
                            onChange={handleChange}
                            readOnly={question.readonly}
                            rows={question.rows}
                            name={question.key}
                            value={listFields[question.key]}
                            id={question.key} ></textarea>
                        {renderErrorMessage(question.key)}
                    </fieldset>
                );
            //question type = reference
            case formConfig.questionControlType.reference:
                return (
                    <fieldset hidden={question.hidden} key={question.key} className="form-group">
                        <label htmlFor={question.key}>
                            <span hidden={!question.validators['required']} style={DangerText}>* </span><span data-text={question.label}>{question.label}</span>
                        </label>
                        <ReferenceList serverUrl={question.serverUrl}
                            displayField={question.displayField}
                            listFields={question.listFields}
                            filterCondition={question.filterCondition}
                            referenceKey={question.key}
                            selected={question.value}
                            onSelectionChange={onSelectionReferenceListChange}
                            multiple={question.multiple}
                            idField={question.idField}
                            readOnly={question.readonly}
                        ></ReferenceList>
                        {renderErrorMessage(question.key)}
                    </fieldset>
                )
            //question type = dropdown list
            case formConfig.questionControlType.dropdown:
                return (
                    <fieldset hidden={question.hidden} key={question.key} className="form-group">
                        <label htmlFor={question.key}>
                            <span hidden={!question.validators['required']} style={DangerText}>* </span><span data-text={question.label}>{question.label}</span>
                        </label>
                        <CustomDropDown
                            selected={question.value}
                            dropdownKey={question.key}
                            onSelectionChange={onSelectionChangeCallback}
                            options={question.options}
                            multiple={question.multiple}
                            readOnly={question.readonly}
                        ></CustomDropDown>
                        {renderErrorMessage(question.key)}
                    </fieldset>
                );
            //question type = Radio button
            case formConfig.questionControlType.radiobutton:
                return (
                    <fieldset hidden={question.hidden} key={question.key} className="form-group">
                        <label htmlFor={question.key}>
                            <span hidden={!question.validators['required']} style={DangerText}>* </span><span data-text={question.label}>{question.label}</span>
                        </label>
                        <RadioButton onSelectionChange={onRadioSelectionChange}
                            referenceKey={question.key}
                            options={question.options} />
                        {renderErrorMessage(question.key)}
                    </fieldset>
                );
            //question type = file
            case formConfig.questionControlType.file:
                return (
                    <fieldset hidden={question.hidden} key={question.key} className="form-group">
                        <label htmlFor={question.key}>
                            <span hidden={!question.validators['required']} style={DangerText}>* </span><span data-text={question.label}>{question.label}</span>
                        </label>
                        <FileUploader fieldKey={question.key}
                            onSelectFile={onSelectFile}
                            readOnly={question.readonly}
                            selectedFile={question.value} />
                        {renderErrorMessage(question.key)}
                    </fieldset>
                );
            default:
                break;
        }
    };

    /**
     * Handle OnSubmit action
     * @param {*} e 
     */
    const onSubmit = (e) => {
        e.preventDefault();
        //Validate the form
        let { errors, valid } = validateForm(true);
        setDisableSubmitButton(!valid);
        setErrors(errors);
        if (valid) {
            props.OnSubmitCallback(listFields);
        }
    };

    return (
        <ContainerDiv>
            <form onSubmit={onSubmit}>
                {props.ListFields.map((field, i) => (
                    renderQuestion(field)
                ))}
                <input
                    type="submit"
                    value="Submit"
                    hidden={props.viewMode}
                    disabled={disableSubmitButton}
                    className="btn btn-primary btn-block c-primary cursor-pointer" />
            </form>
        </ContainerDiv>
    );
}

DynamicForm.prototype = {
    ListFields: propTypes.array,
    OnUpdateCallback: propTypes.func,
    OnSubmitCallback: propTypes.func,
    viewMode: propTypes.bool
}