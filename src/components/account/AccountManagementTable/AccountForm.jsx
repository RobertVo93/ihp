import { DropdownQuestion, FormConfig, ReferenceQuestion, TextboxQuestion, FileUploaderQuestion } from 'components/forms/dynamicform';
import propTypes from "prop-types";
import { DynamicForm } from 'components/forms/dynamicform/DynamicForm';
import React, { useEffect, useState } from 'react';
const _ = require('lodash');

const AccountForm = (props) => {
    let formConfig = new FormConfig();
    const [afterComponentDidMount, setComponentDidMount] = useState(false);//check if the componentDidMount is run
    const [accountRecord, setAccountRecord] = useState({});
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
        if (props.account) {
            //set incomming selected account to state
            setTimeout(() => {
                //Need timeout to wait for other thread are completed
                //clone companyMap single value (in case to use when user's type is company)
                let account = props.account;
                account.CompanyMapSingle = account.CompanyMap ? account.CompanyMap[0] : null;
                setAccountRecord(account);
            }, 100);
        }
    }, [props.account]);

    /**
     * ComponentDidUpdate: accountRecord
     * To regenerate questions
     */
    useEffect(() => {
        setQuestions(getQuestion(accountRecord));
    }, [accountRecord]);

    /**
     * Handle submit Account
     * @param form Dynamic form state
     */
    const handleSubmit = async (form) => {
        //convert from dynamic form to Account object
        let accountObject = convertFormToObject(form);
        if (props.onSubmit) {
            props.onSubmit(accountObject);
        }
    };

    /**
     * Handle Form's value changed
     * @param {*} form Dynamic form state
     */
    const handleOnUpdate = async (form) => {
        //convert from dynamic form to account object
        let accountObject = convertFormToObject(form);
        if (afterComponentDidMount && !_.isEqual(accountRecord, accountObject)) {
            setAccountRecord(accountObject);
        }
    };

    /**
     * Convert object from dynamic form to Account
     * @param form Dynamic form state
     */
    const convertFormToObject = (form) => {
        let accountObject = {};
        accountObject.UserID = accountRecord.UserID;
        accountObject.Username = form.Username;
        accountObject.Email = form.Email;
        accountObject.RoleID = form.RoleID;
        accountObject.Type = form.Type;
        accountObject.WhiteLabelID = form.WhiteLabelID;
        accountObject.CompanyMap = form.CompanyMap;
        accountObject.CompanyMapSingle = form.CompanyMapSingle;
        return accountObject;
    };

    /**
     * Generate Account questions
     * @param record Account object
     */
    const getQuestion = (record) => {
        let questions = [];
        let validators = {};
        let options = [];

        //Add [Username] text
        validators = {}
        validators[formConfig.formValidators.require] = {
            value: true,
            errorMessage: '[Username] is required.'
        };
        questions.push(new TextboxQuestion({
            key: 'Username',
            label: 'Username',
            value: record.Username,
            validators: validators,
            type: formConfig.inputTypeDef.text,
            readonly: props.viewMode,
            order: 1000
        }));

        //Add [Email] text
        validators = {}
        validators[formConfig.formValidators.require] = {
            value: true,
            errorMessage: '[Email] is required.'
        };
        questions.push(new TextboxQuestion({
            key: 'Email',
            label: 'Email',
            value: record.Email,
            validators: validators,
            type: formConfig.inputTypeDef.email,
            readonly: props.viewMode,
            order: 2000
        }));

        //Add [Role ID] reference list
        validators = {}
        validators[formConfig.formValidators.require] = {
            value: true,
            errorMessage: '[Role ID] is required.'
        };
        questions.push(new ReferenceQuestion({
            key: 'RoleID',
            label: 'Role ID',
            value: record.RoleID,
            serverUrl: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/user/getallmasterroles`,
            displayField: 'RoleName',
            idField: 'RoleID',
            listFields: ['RoleID', 'RoleName'],
            searchBar: true,
            readonly: props.viewMode,
            validators: validators,
            order: 3000
        }));

        //Add [Type] dropdown
        options = [];
        formConfig.options.accountType.forEach((val) => {
            options.push(val);
        });
        validators = {}
        validators[formConfig.formValidators.require] = {
            value: true,
            errorMessage: '[Type] is required.'
        };
        questions.push(new DropdownQuestion({
            key: 'Type',
            label: 'Type',
            value: record.Type,
            options: options,
            readonly: props.viewMode,
            validators: validators,
            order: 4000
        }));

        //Add [White Label] reference list
        validators = {}
        validators[formConfig.formValidators.require] = {
            value: true,
            errorMessage: '[White Label] is required.'
        };
        questions.push(new ReferenceQuestion({
            key: 'WhiteLabelID',
            label: 'White Label',
            value: record.WhiteLabelID,
            serverUrl: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/user/getwhitelabelsettings`,
            displayField: 'logoText',
            idField: 'id',
            listFields: ['id', 'logoText', 'mainColor'],
            searchBar: true,
            readonly: props.viewMode,
            validators: validators,
            order: 5000
        }));
        //type = broker => show the below variable
        //Add [Company Map] reference list
        questions.push(new ReferenceQuestion({
            key: 'CompanyMap',
            label: 'Company Map',
            value: record.CompanyMap,
            serverUrl: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/mssql_interface_company/getfirst100companies`,
            displayField: 'CoyName',
            idField: 'CoyID',
            listFields: ['CoyID', 'CoyName'],
            searchBar: true,
            multiple: true,
            hidden: record.Type != formConfig.options.accountType[0].key,
            readonly: props.viewMode,
            order: 6000
        }));
        //type = company => show the behind variable
        questions.push(new ReferenceQuestion({
            key: 'CompanyMapSingle',
            label: 'Company Map',
            value: record.CompanyMapSingle,
            serverUrl: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/mssql_interface_company/getfirst100companies`,
            displayField: 'CoyName',
            idField: 'CoyID',
            listFields: ['CoyID', 'CoyName'],
            searchBar: true,
            multiple: false,
            hidden: record.Type != formConfig.options.accountType[1].key,
            readonly: props.viewMode,
            order: 6000
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

AccountForm.prototype = {
    account: propTypes.object.isRequired,
    onSubmit: propTypes.func,
    viewMode: propTypes.bool
}

export default AccountForm;
