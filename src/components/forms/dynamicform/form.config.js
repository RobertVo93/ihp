export class FormConfig {
    formValidators = { //the understand the value => refer the attributes of Validators in angular form, see in question-control.service.ts
        require: "required",
        minLength: "minLength",
        maxLength: "maxLength",
        email: "email"
    }

    inputTypeDef = {
        button: 'button',
        checkbox: 'checkbox',
        color: 'color',
        date: 'date',
        datetime: 'datetime',
        datetimeLocal: 'datetime-local',
        email: 'email',
        file: 'file',
        hidden: 'hidden',
        image: 'image',
        month: 'month',
        number: 'number',
        password: 'password',
        radio: 'radio',
        range: 'range',
        reset: 'reset',
        search: 'search',
        submit: 'submit',
        tel: 'tel',
        text: 'text',
        time: 'time',
        url: 'url',
        week: 'week'
    }

    questionControlType = {
        textbox: 'textbox',
        textarea: 'textarea',
        dropdown: 'dropdown',
        reference: 'reference',
        dateRange: 'daterange',
        ckeditor: 'ckeditor',
        datetime: 'datetime',
        radiobutton: 'radiobutton',
        file: 'file'
    }

    options = {
        alertWhen: [
            { key: 1, value: "Any Company" },
            { key: 2, value: "Any Member" },
            { key: 3, value: "Specific Company" },
            { key: 4, value: "Specific Member" }
        ],
        worthOf: [
            { key: 1, value: "Utilization" },
            { key: 2, value: "MC days" }
        ],
        ina: [
            { key: 1, value: "Policy Year" },
            { key: 2, value: "Calendar Year" },
            { key: 3, value: "Quarter" },
            { key: 4, value: "Month" }
        ],
        allowedPages: [
            { key: "intro", value: "intro" },
            { key: "am.dashboard", value: "am.dashboard" },
            { key: "insurer.dashboard", value: "insurer.dashboard" },
            { key: "company.dashboard", value: "company.dashboard" },
            { key: "am.viewclaims", value: "am.viewclaims" },
            { key: "cm.dashboard", value: "cm.dashboard" },
            { key: "medical_escalation", value: "medical_escalation" },
            { key: "medical_escalation.all_escalations", value: "medical_escalation.all_escalations" },
            { key: "orders", value: "orders" },
            { key: "orders.all", value: "orders.all" },
            { key: "earlywarning", value: "earlywarning" },
            { key: "company.listview", value: "company.listview" },
            { key: "company", value: "company" },
            { key: "company.cmoverview", value: "company.cmoverview" },
            { key: "company.cmproductivity", value: "company.cmproductivity" },
            { key: "company.cmbreakdown", value: "company.cmbreakdown" },
            { key: "company.glstatistics", value: "company.glstatistics" },
            { key: "company.glstatistics.cmoverview", value: "company.glstatistics.cmoverview" },
            { key: "company.glstatistics.initialgl", value: "company.glstatistics.initialgl" },
            { key: "company.glstatistics.declinegl", value: "company.glstatistics.declinegl" },
            { key: "company.glstatistics.finalgl", value: "company.glstatistics.finalgl" },
            { key: "company.cmprofiles", value: "company.cmprofiles" },
            { key: "company.cmprofiles.inpatient", value: "company.cmprofiles.inpatient" },
            { key: "company.cmprofiles.gpoutpatient", value: "company.cmprofiles.gpoutpatient" },
            { key: "company.cmprofiles.inpatient", value: "company.cmprofiles.inpatient" },
            { key: "patient", value: "patient" },
            { key: "patient.cmoverview", value: "patient.cmoverview" },
            { key: "clinic", value: "clinic" },
            { key: "clinic.cmoverview", value: "clinic.cmoverview" },
            { key: "diagnosis", value: "diagnosis" },
            { key: "diagnosis.cmoverview", value: "diagnosis.cmoverview" },
            { key: "reports", value: "reports" },
            { key: "reports.generateppt", value: "reports.generateppt" },
            { key: "alert.escalation", value: "alert.escalation" },
            { key: "accounts", value: "accounts" },
            { key: "account.management", value: "account.management" },
            { key: "account.whitelabelsettings", value: "account.whitelabelsettings" },
            { key: "account.rolesmanagement", value: "account.rolesmanagement" }
        ],
        permissions: [
            { key: "review_escalation", value: "review_escalation" },
            { key: "confirm_escalation", value: "confirm_escalation" },
            { key: "add_call_log", value: "add_call_log" },
            { key: "edit_orders", value: "edit_orders" },
            { key: "create_orders", value: "create_orders" },
            { key: "close_orders", value: "close_orders" },
            { key: "cancel_orders", value: "cancel_orders" },
            { key: "view_personal_diagnosis", value: "view_personal_diagnosis" },
            { key: "create_account", value: "create_account" },
            { key: "edit_account", value: "edit_account" }
        ],
        accountType: [
            { key: "Broker", value: "Broker" },
            { key: "Company", value: "Company" }
        ]
    }
}