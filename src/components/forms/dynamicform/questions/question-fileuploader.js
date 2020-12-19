import { QuestionBase } from './question-base';
import { FormConfig } from '../form.config';

export class FileUploaderQuestion extends QuestionBase {
    controlType = '';
    type;

    constructor(options) {
        super(options);
        this.type = options['type'] || '';
        this.controlType = new FormConfig().questionControlType.file;
    }
}