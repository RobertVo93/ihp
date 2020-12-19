import { QuestionBase } from './question-base';
import { FormConfig } from '../form.config';

export class DropdownQuestion extends QuestionBase {
    controlType = '';
    options = [];

    constructor(options) {
        super(options);
        this.options = options['options'] || [];
        this.controlType = new FormConfig().questionControlType.dropdown;
    }
}