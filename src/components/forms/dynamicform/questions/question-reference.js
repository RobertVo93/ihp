import { QuestionBase } from './question-base';
import { FormConfig } from '../form.config';

export class ReferenceQuestion extends QuestionBase {
    controlType = '';

    constructor(options) {
        super(options);
        this.controlType = new FormConfig().questionControlType.reference;
    }
}