export class DynamicForm {
  inputs: DynamicFormInput[];
  formRows: number;
}

export class DynamicFormInput {
  fieldName: string;
  validators: any[];
  label: string;
  value: any;
  type: string;
  size: number;
  rowNumber: number;
  placeholder: string;
  required: boolean;
  options?: any[];
  selectLabel?: string;
  radioBoolean?: boolean;
  radioOptions?: {
    first: string;
    second: string;
  };
  max?: any;
}
