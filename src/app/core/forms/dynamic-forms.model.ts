export class DynamicForm {
  inputs: DynamicFormInput[];
  formRows: number;
  name?: string;
}

export class DynamicFormInput {
  fieldName: string;
  validators: any[];
  label: string;
  value?: any;
  type: string;
  size: number;
  rowNumber: number;
  placeholder: string;
  required: boolean;
  tooltip?: string;
  options?: any[];
  color?: string;
  selectLabel?: string;
  radioBoolean?: boolean;
  radioOptions?: {
    first: string;
    second: string;
  };
  max?: any;
}
