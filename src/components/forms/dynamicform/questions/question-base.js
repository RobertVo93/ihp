export class QuestionBase {
    value;
    key;
    label;
    required;
    order;
    controlType;
    type;
    options;
    validators;
    multiple; //dropdown list multiple
    rows; //number of rows in text area
    readonly; //question is readonly or not
    searchBar;
    serverUrl;
    displayField;
    listFields;
    idField; //Id reference of reference list
    filterCondition;
    hidden;

    constructor(options = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.options = options.options || [];
        this.validators = options.validators || [];
        this.multiple = !!options.multiple;
        this.rows = options.rows === undefined ? 1 : options.rows;
        this.readonly = !!options.readonly;
        this.searchBar = !!options.searchBar;
        this.serverUrl = options.serverUrl || '';
        this.displayField = options.displayField || '';
        this.listFields = options.listFields || [];
        this.filterCondition = options.filterCondition || '';
        this.idField = options.idField || '';
        this.hidden = !!options.hidden;
    }
}