import { DropdownQuestion, FormConfig, ReferenceQuestion, TextboxQuestion } from 'components/forms/dynamicform';
import { DynamicForm } from 'components/forms/dynamicform/DynamicForm';
import React, { useEffect, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import alertEscalateActions from 'redux/alertescalations/actions';
const { createAlertEscalation, getAlertEscalationByID, clearSelectedAlertEscalation, updateAlertEscalation } = alertEscalateActions;

const AlertEscalationForm = (props) => {
	let formConfig = new FormConfig();
	const [afterComponentDidMount, setComponentDidMount] = useState(false);//check if the componentDidMount is run
	const [alertRecord, setAlertRecord] = useState({});
	const [showError, setShowError] = useState(false);
	const [questions, setQuestions] = useState([]);

	/**
	 * ComponentDidMount
	 */
	useEffect(() => {
		props.clearSelectedAlertEscalation();
		setComponentDidMount(true);
		if (props.alertID !== 0) {
			//In case of edit, get props.data.alertEscalation
			props.getAlertEscalationByID(props.authData, props.alertID);
		}

		//ComponentWillUnmount
		return function cleanup() {
			//Clear selected alert escalation and formdataid
			props.clearSelectedAlertEscalation();
		};
	}, []);

	/**
	 * ComponentDidUpdate: props.data.alertEscalation
	 * Reset Selected Alert Escalation
	 */
	useEffect(() => {
		if (props.data.alertEscalation) {
			//set incomming selected alert escalation to state
			setTimeout(() => {
				//Need timeout to wait for other thread are completed
				setAlertRecord(props.data.alertEscalation);
			}, 100);
		}
	}, [props.data.alertEscalation]);

	/**
	 * ComponentDidUpdate: alertRecord
	 * To regenerate questions
	 */
	useEffect(() => {
		setQuestions(getQuestion(alertRecord));
	}, [alertRecord]);

	/**
	 * Handle submit Alert
	 * @param form Dynamic form state
	 */
	const handleSubmit = async (form) => {
		//convert from dynamic form to alert object
		let alertObject = convertFormToObject(form);
		let result = true;
		if (props.alertID === 0) {
			//Create new
			result = await props.createAlertEscalation(props.authData, alertObject);
		}
		else {
			//Update
			result = await props.updateAlertEscalation(props.authData, alertObject);
		}
		if (result === false) {
			//Show error
			setShowError(true);
		}
		else if (props.onClosed) {
			//if form is loaded from modal => close modal
			props.onClosed(true);
		}
	};

	/**
	 * Handle Form's value changed
	 * @param {*} form Dynamic form state
	 */
	const handleOnUpdate = async (form) => {
		if (form.AlertWhen != alertRecord.AlertWhen && afterComponentDidMount) {
			//convert from dynamic form to alert object
			let alertObject = convertFormToObject(form);
			setAlertRecord(alertObject);
		}
	};

	/**
	 * Convert object from dynamic form to Alert
	 * @param form Dynamic form state
	 */
	const convertFormToObject = (form) => {
		let alertObject = {};
		alertObject.ID = props.alertID;	//this is ID in MySQL (user_alert_escalations)
		alertObject.DefID = alertRecord.DefID;	//This is ID in MSSQL (tb_AlertEscalations)
		alertObject.AlertWhen = form.AlertWhen;
		alertObject.SpecificCompany = form.SpecificCompany;
		alertObject.SpecificMember = form.SpecificMember;
		alertObject.Exceeds = form.Exceeds;
		alertObject.WorthOf = form.WorthOf;
		alertObject.InA = form.InA;
		return alertObject;
	};

	/**
	 * Generate Alert questions
	 * @param record Alert object
	 */
	const getQuestion = (record) => {
		let questions = [];
		let validators = {};
		//Add [Alert me when] text
		let options = [];
		formConfig.options.alertWhen.forEach((val) => {
			options.push(val);
		});
		//Define validator
		validators = {}
		validators[formConfig.formValidators.require] = {
			value: true,
			errorMessage: '[Alert me when] is required.'
		};
		questions.push(new DropdownQuestion({
			key: 'AlertWhen',
			label: 'Alert me when',
			value: record.AlertWhen,
			validators: validators,
			options: options,
			searchBar: true,
			order: 100
		}));

		//Add [Specific Company] reference list
		//Define validator
		validators = {}
		validators[formConfig.formValidators.require] = {
			value: true,
			errorMessage: '[Specific Company] is required.'
		};
		questions.push(new ReferenceQuestion({
			key: 'SpecificCompany',
			label: 'Specific Company',
			value: record.SpecificCompany,
			serverUrl: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/mssql_interface_company/getfirst100companies`,
			validators: validators,
			displayField: 'CoyName',
			idField: 'CoyID',
			listFields: ['CoyID', 'CoyName'],
			searchBar: true,
			hidden: record.AlertWhen != 3,//Specific Company = 3
			order: 150
		}));

		//Add [Specific Member] reference list
		//Define validator
		validators = {}
		validators[formConfig.formValidators.require] = {
			value: true,
			errorMessage: '[Specific Member] is required.'
		};
		questions.push(new ReferenceQuestion({
			key: 'SpecificMember',
			label: 'Specific Member',
			value: record.SpecificMember,
			serverUrl: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/mssql_interface_patient/getfirst100members`,
			validators: validators,
			displayField: 'NRIC',
			idField: 'UNID',
			listFields: ['NRIC', 'Name'],
			searchBar: true,
			hidden: record.AlertWhen != 4,//Specific Member = 4
			order: 150
		}));

		//Add [Exceeds] text
		validators = {}
		validators[formConfig.formValidators.require] = {
			value: true,
			errorMessage: '[Exceeds] is required.'
		};
		questions.push(new TextboxQuestion({
			key: 'Exceeds',
			label: 'Exceeds',
			value: record.Exceeds,
			validators: validators,
			type: formConfig.inputTypeDef.number,
			order: 200
		}));

		//Add [Worth of] dropdown list
		options = [];
		formConfig.options.worthOf.forEach((val) => {
			options.push(val);
		});
		//Define validator
		validators = {}
		validators[formConfig.formValidators.require] = {
			value: true,
			errorMessage: '[Worth of] is required.'
		};
		questions.push(new DropdownQuestion({
			key: 'WorthOf',
			label: 'Worth of',
			value: record.WorthOf,
			validators: validators,
			options: options,
			searchBar: true,
			order: 300
		}));

		//Add [In a] dropdown list
		options = [];
		formConfig.options.ina.forEach((val) => {
			options.push(val);
		});
		//Define validator
		validators = {}
		validators[formConfig.formValidators.require] = {
			value: true,
			errorMessage: '[In a] is required.'
		};
		questions.push(new DropdownQuestion({
			key: 'InA',
			label: 'In a',
			value: record.InA,
			validators: validators,
			options: options,
			searchBar: true,
			order: 400
		}));

		return questions.sort((a, b) => a.order - b.order);
	};

	/**
	 * Hide error popup
	 */
	const toggleError = () => {
		setShowError(false);
	};

	return (
		<div className="plr-15">
			<SweetAlert
				title="Error"
				onConfirm={toggleError}
				show={showError}
			>
				<div>
					Something wrong !!!
				</div>
			</SweetAlert>
			<div className="mtb-30 theme-color">
				<div className="introduction">
					Alert Escalation [{props.alertID}]
				</div>
			</div>
			<div className="row">
				<div className="col-lg-12">
					<DynamicForm ListFields={questions} OnUpdateCallback={handleOnUpdate} OnSubmitCallback={handleSubmit} />
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		authData: {
			accessToken: state.auth.accessToken,
		},
		data: {
			alertEscalation: state.alertescalations.selectedAlertEscalation
		}
	};
}

export default connect(
	mapStateToProps,
	{ createAlertEscalation, getAlertEscalationByID, clearSelectedAlertEscalation, updateAlertEscalation }
)(AlertEscalationForm);
