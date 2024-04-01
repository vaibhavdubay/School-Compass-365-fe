import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ButtonClickEvent,
  ButtonElement,
  DateElement,
  FormElement,
  InputElement,
} from '@sc-models/form';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'sc-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent<T = { [k: string]: string }> implements OnChanges {
  @Input({ required: true }) formConfig: FormElement[] = [];
  @Input() dateFilters: { [k: string]: Date[] } = {};
  @Input() customDateClasses: {
    [k: string]: { [className: string]: Date[] };
  } = {};
  @Output() buttonClick = new EventEmitter<ButtonClickEvent>();
  private inputElements = [
    'checkbox',
    'date',
    'radio',
    'select',
    'text',
    'textarea',
  ];

  formGroup = new FormGroup({}) as unknown as FormGroup<{
    [K in keyof T]: AbstractControl;
  }>;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formConfig']) {
      const inputElements = this.formConfig.filter((element) =>
        this.inputElements.includes(element.elementType),
      ) as InputElement[];

      inputElements
        .filter(
          (elem) =>
            !Object.keys(this.formGroup.value).includes(elem.element.key),
        )
        .forEach((formElement) => {
          this.formGroup.addControl(
            formElement.element.key as string & keyof T,
            this.fb.control(formElement.element.value || ''),
          );
          if (formElement.elementType === 'text') {
            const element = formElement.element;
            if (
              element.validateAs === 'email' ||
              element.validateAs === 'password' ||
              element.validateAs === 'confirmPassword'
            ) {
              const passwordPattern = new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
              );
              const emailPattern = new RegExp(
                /^\w+[+.\w-]*@([\w-]+\.)*\w+[\w-]*\.([+.\w-]{2,}|\d+)$/i,
              );
              this.formGroup
                .get(element.key)
                ?.addValidators(
                  Validators.pattern(
                    element.validateAs === 'email'
                      ? emailPattern
                      : passwordPattern,
                  ),
                );
            }
          }
        });

      const inputsWithValueFn = inputElements.filter(
        (element) => !!element.element.valueFn,
      );
      if (inputsWithValueFn.length) {
        this.formGroup.valueChanges.subscribe(() => {
          inputsWithValueFn.forEach((element) => {
            if (element.element?.valueFn) {
              element.element.value = element.element?.valueFn(
                this.formGroup.value,
              );
              console.log(element.element, this.formGroup.value);
            }
          });
        });
      }
      const confirmPassword = inputElements.find(
        (elem) =>
          elem.elementType == 'text' &&
          elem.element.validateAs == 'confirmPassword',
      )?.element;
      const password = inputElements.find(
        (elem) =>
          elem.elementType == 'text' && elem.element.validateAs == 'password',
      )?.element;
      if (password && confirmPassword) {
        this.formGroup.addValidators(
          this.passwordMatchValidator(password.key, confirmPassword.key),
        );
      }
    }
    if (changes['dateFilter']) {
      Object.keys(this.dateFilters).forEach((key) => {
        const date = this.formConfig.find(
          (elem) => elem.elementType === 'date' && elem.element.key === key,
        ) as DateElement;
        date.element.filteredDates = this.dateFilters[key];
      });
    }
    if (changes['customDateClasses']) {
      Object.keys(this.customDateClasses).forEach((key) => {
        const date = this.formConfig.find(
          (elem) => elem.elementType === 'date' && elem.element.key === key,
        ) as DateElement;
        date.element.customClasses = this.customDateClasses[key];
      });
    }
  }
  private passwordMatchValidator(
    mainControl: string,
    secondControl: string,
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(mainControl);
      const confirmPasswordControl = formGroup.get(secondControl);

      // Early return if one or both controls are missing
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      // Handle existing errors on confirmPassword
      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['mustMatch']
      ) {
        return null; // Return if another validator already found an error
      }

      // Validate password
      if (passwordControl.errors) {
        passwordControl.markAsTouched(); // Mark password as touched if invalid
        if (confirmPasswordControl.touched) {
          // Set invalidPass error only if touched
          confirmPasswordControl.setErrors({ invalidPass: true });
        }
        return null; // No further validation needed if password is invalid
      }

      // Validate password match
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
        return { mustMatch: true }; // Return explicit error object for clarity
      }

      // Clear any existing errors on confirmPassword
      confirmPasswordControl.setErrors(null);
      return null;
    };
  }
}
