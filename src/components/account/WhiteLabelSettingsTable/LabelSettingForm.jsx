import { FormConfig, TextboxQuestion, FileUploaderQuestion } from 'components/forms/dynamicform';
import propTypes from "prop-types";
import { DynamicForm } from 'components/forms/dynamicform/DynamicForm';
import React, { useEffect, useState } from 'react';
const _ = require('lodash');

const LabelSettingForm = (props) => {
    let formConfig = new FormConfig();
    const [afterComponentDidMount, setComponentDidMount] = useState(false);//check if the componentDidMount is run
    const [labelRecord, setLabelRecord] = useState({});
    const [questions, setQuestions] = useState([]);
    
    /**
     * ComponentDidMount
     */
    useEffect(() => {
        setComponentDidMount(true);
    }, []);

    /**
     * ComponentDidUpdate: props.account
     * Reset Selected Account
     */
    useEffect(() => {
        if (props.label) {
            //set incomming selected account to state
            setTimeout(() => {
                //Need timeout to wait for other thread are completed
                //clone companyMap single value (in case to use when user's type is company)
                let label = props.label;
                setLabelRecord(label);
            }, 100);
        }
    }, [props.label]);

    /**
     * ComponentDidUpdate: labelRecord
     * To regenerate questions
     */
    useEffect(() => {
        setQuestions(getQuestion(labelRecord));
    }, [labelRecord]);

    /**
     * Handle submit Account
     * @param form Dynamic form state
     */
    const handleSubmit = async (form) => {
        //convert from dynamic form to Account object
        let labelObject = convertFormToObject(form);
        if (props.onSubmit) {
            props.onSubmit(labelObject);
        }
    };

    /**
     * Handle Form's value changed
     * @param {*} form Dynamic form state
     */
    const handleOnUpdate = async (form) => {
        //convert from dynamic form to account object
        let labelObject = convertFormToObject(form);
        if (afterComponentDidMount && !_.isEqual(labelRecord, labelObject)) {
            setLabelRecord(labelObject);
        }
    };

    /**
     * Convert object from dynamic form to Account
     * @param form Dynamic form state
     */
    const convertFormToObject = (form) => {
        let labelObject = {};
        labelObject.id = labelRecord.id;
        labelObject.logoText = form.logoText;
        labelObject.logo_url = form.logo_url;
        labelObject.logo_name = form.logo_name;
        labelObject.logo_mime = form.logo_mime;
        labelObject.mainColor = form.mainColor;
        return labelObject;
    };


    /**
     * Generate Account questions
     * @param record Account object
     */
    const getQuestion = (record) => {
        let questions = [];
        let validators = {};

        //Add [mainColor] text
        validators = {}
        validators[formConfig.formValidators.require] = {
            value: true,
            errorMessage: '[mainColor] is required.'
        };
        questions.push(new TextboxQuestion({
            key: 'mainColor',
            label: 'mainColor',
            value: record.mainColor,
            validators: validators,
            type: formConfig.inputTypeDef.text,
            readonly: props.viewMode,
            order: 1000
        }));

        //Add [logoText] text
        validators = {}
        validators[formConfig.formValidators.require] = {
            value: true,
            errorMessage: '[logoText] is required.'
        };
        questions.push(new TextboxQuestion({
            key: 'logoText',
            label: 'logoText',
            value: record.logoText,
            validators: validators,
            readonly: props.viewMode,
            order: 2000
        }));

        //Add [Logo] file uploader
        questions.push(new FileUploaderQuestion({
            key: 'logo_url',
            label: 'logo_url',
            value: record.logo_url,
            readonly: props.viewMode,
            order: 7000
        }));

        return questions.sort((a, b) => a.order - b.order);
    };

    return (
        <div className="plr-15">
            <div className="mtb-30 theme-color">
                <div className="introduction"></div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <DynamicForm ListFields={questions}
                        OnUpdateCallback={handleOnUpdate}
                        OnSubmitCallback={handleSubmit}
                        viewMode={props.viewMode} />
                </div>
            </div>
        </div>
    );
}

LabelSettingForm.prototype = {
    label: propTypes.object.isRequired,
    onSubmit: propTypes.func,
    viewMode: propTypes.bool
}

export default LabelSettingForm;
