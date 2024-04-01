export type FormConfig = FormElement[];
export type FormElement = InputElement | UiElement;

export type InputElement =
  | CheckboxElement
  | DateElement
  | RadioElement
  | SelectElement
  | TextElement
  | TextAreaElement;
export type UiElement = ButtonElement | LabelElement | ButtonGroupElement;
export type ButtonClickEvent = {
  key: string;
  element: ButtonElement;
};

export type CheckboxElement = { elementType: 'checkbox'; element: Checkbox };
export type RadioElement = { elementType: 'radio'; element: Radio };
export type DateElement = { elementType: 'date'; element: DateInput };
export type SelectElement = { elementType: 'select'; element: Select };
export type TextElement = { elementType: 'text'; element: TextInput };
export type TextAreaElement = {
  elementType: 'textarea';
  element: TextAreaInput;
};
export type ButtonElement<F = (event: MouseEvent) => void> = {
  elementType: 'button';
  element: Button<F>;
};
export type LabelElement = {
  elementType: 'label';
  element: Label;
};
export type ButtonGroupElement = {
  elementType: 'button-group';
  element: ButtonGroup;
};

export type Element = {
  key: string;
  label: string;
  cssClass?: string;
  width?: string;
  hidden?: boolean;
  hint?: string;
  disabled?: boolean;
};

type CoreInputElement = {
  readonly?: boolean;
  required?: boolean;
  value?: string;
  valueFn?: (form: {
    [k: string]: string | boolean | object | undefined;
  }) => string;
};
export type Checkbox = Element &
  CoreInputElement & {
    checked?: boolean;
  };
export type DateInput = Element &
  CoreInputElement & {
    placeholder?: string;
    filteredDates?: Date[];
    customClasses?: { [className: string]: Date[] };
    min?: string;
    max?: string;
  };
export type Radio = Element &
  CoreInputElement & {
    options?: ListOptions;
  };
export type Select = Element &
  CoreInputElement & {
    allowMultiple?: boolean;
    autoComplete?: boolean;
    value?: string;
    placeholder?: string;
    selectedValues?: ListOptions;
    options: ListOptions;
  };

export type InputValidators =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'currency'
  | 'decimal'
  | 'confirmPassword'
  | 'pattern';

export type TextInput = Element &
  CoreInputElement & {
    placeholder?: string;
    validationPattern?: string | RegExp;
    validateAs: InputValidators;
    pattern?: string | RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
export type TextAreaInput = Element &
  CoreInputElement & {
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
  };
export type Button<F = (event: MouseEvent) => void> = Element & {
  type?: 'button' | 'submit' | 'reset';
  theme?: 'basic' | 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini_fab';
  color?: 'basic' | 'primary' | 'accent' | 'warn' | 'link';
  onClick?: F;
  href?: string;
  title?: string;
};
export type Label = Omit<Element, 'disabled'>;
export type ButtonGroup = Element & {
  display?: 'row' | 'column';
  buttons: ButtonElement[];
};
export type ListOptions = { key: string; label: string }[];
