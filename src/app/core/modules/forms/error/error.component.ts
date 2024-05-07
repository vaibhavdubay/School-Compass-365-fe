import { Component, Input } from '@angular/core';
import { errorMessages } from '@sc-forms/form.constant';
import {
  Checkbox,
  DateInput,
  Radio,
  Select,
  TextAreaInput,
  TextInput,
} from '@sc-models/form';

@Component({
  selector: 'sc-error',
  templateUrl: './error.component.html',
  styles: ``,
})
export class ErrorComponent {
  @Input({ required: true }) element!:
    | Checkbox
    | DateInput
    | Radio
    | Select
    | TextInput
    | TextAreaInput;
  @Input() minLength?: number;
  @Input() min?: number;
  @Input() max?: number;
  @Input() errorMessages: { [key: string]: string } = {};
  @Input({ required: true }) set errors(errors: { [k: string]: string }) {
    Object.keys(errors || {}).forEach((error) => {
      switch (error) {
        case 'required':
          this.message = errorMessages.required(this.element.label);
          break;
        case 'minLength':
          this.message = errorMessages.minlength(
            this.element.label,
            this.minLength || 0,
          );
          break;
        case 'pattern':
          this.message = errorMessages.pattern;
          break;
        case 'email':
          this.message = errorMessages.email;
          break;
        case 'min':
          this.message = errorMessages.min(this.element.label, this.min || 0);
          break;
        case 'max':
          this.message = errorMessages.max(this.element.label, this.max || 0);
          break;
        case 'matDatepickerMin':
          this.message = errorMessages.matDatepickerMin;
          break;
        case 'matDatepickerMax':
          this.message = errorMessages.matDatepickerMax;
          break;
      }
      if (this.errorMessages[error]) {
        this.message = this.errorMessages[error];
      }
    });
  }

  message: string = '';
}
