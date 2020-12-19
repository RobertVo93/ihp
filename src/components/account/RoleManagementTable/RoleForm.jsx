import { DropdownQuestion, FormConfig, TextboxQuestion } from 'components/forms/dynamicform';
import propTypes from "prop-types";
import { DynamicForm } from 'components/forms/dynamicform/DynamicForm';
import React, { useEffect, useState } from 'react';
const _ = require('lodash');

const RoleForm = (props) => {
    let formConfig = new FormConfig();
    const [afterComponentDidMount, setComponentDidMount] = useState(false);//check if the componentDidMount is run
    const [roleRecord, setRoleRecord] = useState({});
    const [questions, setQuestions] = useState([]);
    
    /**
     * ComponentDidMount
     */
    useEffect(() => {
        setComponentDidMount(true);
    }, []);

    /**
     * ComponentDidUpdate: props.role
     * Reset Selected role
     */
    useEffect(() => {
        if (props.role) {
            //set incomming selected role to state
            setTimeout(() => {
                setRoleRecord(props.role);
            }, 100);
        }
    }, [props.role]);

    /**
     * ComponentDidUpdate: roleRecord
     * To regenerate questions
     */
    useEffect(() => {
        setQuestions(getQuestion(props.role));
    }, [props.role]);

    /**
     * Handle submit Role
     * @param form Dynamic form state
     */
    const handleSubmit = async (form) => {
        //convert from dynamic form to Role object
        let roleObject = convertFormToObject(form);
        if (props.onSubmit) {
            props.onSubmit(roleObject);
        }
    };

    /**
     * Handle Form's value changed
     * @param {*} form Dynamic form state
     */
    const handleOnUpdate = async (form) => {
        //convert from dynamic form to Role object
        let roleObject = convertFormToObject(form);
        if (afterComponentDidMount && !_.isEqual(roleRecord, roleObject)) {
            setRoleRecord(roleObject);
        }
    };

    /**
     * Convert object from dynamic form to Role
     * @param form Dynamic form state
     */
    const convertFormToObject = (form) => {
        let roleObject = {};
        roleObject.RoleID = roleRecord.RoleID;
        roleObject.RoleName = form.RoleName;
        roleObject.PagesAllowed = form.PagesAllowed;
        roleObject.Permissions = form.Permissions;
        roleObject.InitialRoute = form.InitialRoute;
        return roleObject;
    };


    /**
     * Generate Role questions
     * @param record Role object
     */
    const getQuestion = (record) => {
        let questions = [];
        let validators = {};
        let options = [];
        //Add [RoleName] text
        validators = {}
        validators[formConfig.formValidators.require] = {
            value: true,
            errorMessage: '[RoleName] is required.'
        };
        questions.push(new TextboxQuestion({
            key: 'RoleName',
            label: 'RoleName',
            value: record.RoleName,
            validators: validators,
            type: formConfig.inputTypeDef.text,
            readonly: props.viewMode,
            order: 1000
        }));

        //Add [PagesAllowed] dropdown
        options = [];
        formConfig.options.allowedPages.forEach((val) => {
            options.push(val);
        });
        validators = {}
        validators[formConfig.formValidators.require] = {
            value: true,
            errorMessage: '[PagesAllowed] is required.'
        };
        questions.push(new DropdownQuestion({
            key: 'PagesAllowed',
            label: 'PagesAllowed',
            value: record.PagesAllowed,
            options: options,
            readonly: props.viewMode,
            validators: validators,
            multiple: true,
            order: 2000
        }));

        //Add [Permissions] dropdown
        options = [];
        formConfig.options.permissions.forEach((val) => {
            options.push(val);
        });
        questions.push(new DropdownQuestion({
            key: 'Permissions',
            label: 'Permissions',
            value: record.Permissions,
            options: options,
            readonly: props.viewMode,
            multiple: true,
            order: 3000
        }));

        //Add [InitialRoute] text
        validators = {}
        validators[formConfig.formValidators.require] = {
            value: true,
            errorMessage: '[InitialRoute] is required.'
        };
        questions.push(new TextboxQuestion({
            key: 'InitialRoute',
            label: 'InitialRoute',
            value: record.InitialRoute,
            readonly: props.viewMode,
            validators: validators,
            order: 4000
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

RoleForm.prototype = {
    role: propTypes.object.isRequired,
    onSubmit: propTypes.func,
    viewMode: propTypes.bool
}

export default RoleForm;
