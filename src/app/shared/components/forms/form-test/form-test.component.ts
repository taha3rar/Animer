import { countries } from "@app/shared/helpers/countries";
import { DynamicFormsService } from "./../../../../core/forms/dynamic-forms-service";
import { DynamicFormInput } from "./../../../../core/forms/dynamic-forms.model";
import { BaseValidationComponent } from "@app/shared/components/base-validation/base-validation.component";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { DynamicForm } from "@app/core/forms/dynamic-forms.model";
import { copyArrayItem, moveItemInArray } from "@angular/cdk/drag-drop";
declare const $: any;
class FormConfig {
  label: string = "Field Name";
  tooltip: string = "";
  type: string = "text";
  isDisabled?: boolean = false;
  req?: boolean = false;
  color: string = "#000";
  validators: string[] = [];
  min: number;
  max: number;
  minLength: number;
  maxLength: number;
}

const fields = [
  "fieldName",
  "label",
  "type",
  "size",
  "rowNumber",
  "placeholder",
  "required",
  "selectLabel",
  "first",
  "second",
];
@Component({
  selector: "app-form-test",
  templateUrl: "./form-test.component.html",
  styleUrls: ["./form-test.component.scss"],
})
export class FormTestComponent extends BaseValidationComponent implements OnInit {
  form: FormGroup;
  iArray = new Array();
  testForm = new DynamicForm();
  counter = 1;
  validatorNames = ["Min Value", "Max Value", "Email", "Min Length", "Max Length"];
  currentConfig: FormConfig;
  showForm = false;
  size: any[];
  former: FormGroup;
  jsonForm: FormGroup;
  configs: FormConfig[] = [];
  json: string = "hi";
  movies = [
    {
      title: "Text",
    },
    {
      title: "Number",
    },
  ];
  inputs: any[] = [];
  configForm: FormGroup;
  dynamicForm = new DynamicForm();
  isRequired: boolean;
  required: any[] = [null];
  constructor(private fb: FormBuilder, private dn: DynamicFormsService) {
    super();
    this.form = this.fb.group({
      forms: this.fb.array([this.createForm()]),
    });
    this.jsonForm = this.fb.group({
      form: [undefined, Validators.required],
    });
    this.formInput = this.form;
    this.configForm = this.fb.group({
      label: [undefined],
      type: [undefined],
      isDisabled: [undefined],
      req: [undefined],
      color: [undefined],
      tooltip: [undefined],
      validations: [undefined],
      min: [0],
      max: [100],
      minLength: [0],
      maxLength: [8],
    });
    this.configForm.valueChanges.subscribe((data) => {
      this.currentConfig["color"] = data.color;
      this.currentConfig["label"] = data.label;
      this.currentConfig["tooltip"] = data.tooltip;
      this.currentConfig["req"] = data.req;
      this.currentConfig["validators"] = data.validations;
      this.currentConfig["min"] = data.min;
      this.currentConfig["max"] = data.max;
      this.currentConfig["minLength"] = data.minLength;
      this.currentConfig["maxLength"] = data.maxLength;
      console.log(data);
    });
  }

  ngOnInit() {
    this.formInput = this.form;
  }
  createForm() {
    return this.fb.group({
      fieldName: [undefined, Validators.required],
      label: [undefined, Validators.required],
      type: [undefined, Validators.required],
      size: [undefined, [Validators.required, Validators.min(1)]],
      rowNumber: [undefined, Validators.required],
      placeholder: [undefined],
      required: [undefined, Validators.required],
      selectLabel: [undefined],
      first: [undefined],
      second: [undefined],
    });
  }
  translateJson(json: string) {
    try {
      const formJson: DynamicForm = JSON.parse(json);
      const form: FormGroup = this.fb.group({
        forms: this.fb.array([this.createForm()]),
      });
      this.counter = 0;
      this.required = [];
      const control = form.controls.forms as FormArray;
      control.removeAt(0);
      formJson.inputs.forEach((data, i) => {
        this.addNewInputField(form);
        Object.keys(data).forEach((key) => {
          console.log(form.get("forms"));
          console.log(key);
          if (data && data[key]) {
            if (key === "radioOptions") {
              form.get("forms").get(`${i}`).get("first").setValue(data.radioOptions.first);
              form.get("forms").get(`${i}`).get("second").setValue(data.radioOptions.second);
            } else if (key == "required") {
              if (data[key]) {
                if (this.required.length == i - 1) {
                  this.required.push(true);
                } else this.required[i] = true;
                form.get("forms").get(`${i}`).get("required").setValue("yes");
              } else {
                if (this.required.length == i - 1) {
                  this.required.push(false);
                } else this.required[i] = false;
                form.get("forms").get(`${i}`).get("required").setValue("no");
              }
            } else if (fields.includes(key)) {
              form.get("forms").get(`${i}`).get(key).setValue(data[key]);
            }
          }
        });
      });
      this.form = form;
    } catch (err) {
      console.log("here");
      console.log(err);
    }
  }
  addNewInputField(form: FormGroup = this.form): void {
    this.counter++;
    this.required.push(null);
    const control = form.controls.forms as FormArray;
    control.push(this.createForm());
    this.formInput = form;
  }
  removeInputField(i: number, form: FormGroup = this.form): void {
    const control = form.controls.forms as FormArray;
    if (control.length > 1) {
      control.removeAt(i);
      this.required.splice(i, 1);
      this.counter--;
      this.formInput = form;
    }
  }
  isRadio(i: number) {
    return this.form.value.forms[i].type === "radio";
  }
  gender(type: "yes" | "no", i: number) {
    this.form.get("forms").get(i.toString()).patchValue({
      required: type,
    });
    type === "yes" ? (this.required[i] = true) : (this.required[i] = false);
  }
  radio(type: string, item: DynamicFormInput) {
    const patch = {};
    patch[item.fieldName] = type;
    this.former.patchValue(patch);
    item.radioOptions.first === type ? (item.radioBoolean = true) : (item.radioBoolean = false);
  }
  fileUpload(name: string) {
    $("#" + name).trigger("click");
    // need endpoint
  }
  submit() {
    const form: any = this.form.controls.forms;
    const dynamicForm = new DynamicForm();
    dynamicForm.formRows = this.form
      .get("forms")
      .get((this.counter - 1).toString())
      .get("rowNumber").value;
    console.log(dynamicForm.formRows);
    this.size = new Array(dynamicForm.formRows);
    this.onSubmit(form);
    dynamicForm.inputs = [new DynamicFormInput()];
    dynamicForm.inputs.pop();
    if (this.form.valid) {
      for (let i = 0; i < this.counter; i++) {
        const fieldName = this.form.get("forms").get(i.toString()).get("fieldName").value;
        const label = this.form.get("forms").get(i.toString()).get("label").value;
        const type = this.form.get("forms").get(i.toString()).get("type").value;
        const size = this.form.get("forms").get(i.toString()).get("size").value;
        const rowNumber = this.form.get("forms").get(i.toString()).get("rowNumber").value;
        const placeholder = this.form.get("forms").get(i.toString()).get("placeholder").value;
        const required = this.form.get("forms").get(i.toString()).get("required").value;
        const selectLabel = this.form.get("forms").get(i.toString()).get("placeholder").value;
        const first = this.form.get("forms").get(i.toString()).get("first").value;
        const second = this.form.get("forms").get(i.toString()).get("second").value;
        const input: DynamicFormInput = {
          fieldName: fieldName,
          label: label,
          type: type.toLowerCase() === "countries" ? "select" : type.toLowerCase(),
          size: size,
          options: type.toLowerCase() === "countries" ? countries : undefined,
          rowNumber: rowNumber,
          placeholder: placeholder,
          required: this.required[i],
          selectLabel: placeholder,
          radioOptions: {
            first: first,
            second: second,
          },
          radioBoolean: undefined,
          value: undefined,
          validators: this.required[i] ? [Validators.required] : undefined,
        };

        dynamicForm.inputs.push(input);
      }
      this.former = this.dn.getJson(dynamicForm.inputs);
      this.dynamicForm = dynamicForm;
      this.formInput = this.former;
      console.log(this.former);
      this.json = JSON.stringify(this.dynamicForm);
      this.former.addControl("json", new FormControl(this.json));
      this.showForm = true;
    }
  }
  copy() {
    const copyText: any = document.getElementById("copy");
    copyText.select();
    document.execCommand("copy");
    alert("copied");
  }
  back() {
    this.showForm = false;
    this.formInput = this.form;
  }
  go() {
    this.translateJson(this.jsonForm.get("form").value);
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      console.log(event);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      if (event.container.id === "cdk-drop-list-1") {
      }
    } else {
      const p = new FormConfig();
      p.type = event.previousContainer.data[event.previousIndex].title.toLowerCase();
      this.configs.push(p);
      copyArrayItem(
        JSON.parse(JSON.stringify(event.previousContainer.data)),
        JSON.parse(JSON.stringify(event.container.data)),
        event.previousIndex,
        event.currentIndex
      );
      // delete this.inputs[event.currentIndex]["title"];
      this.inputs.push({
        titles: [
          {
            name: event.previousContainer.data[event.previousIndex].title,
            id: this.randomString(),
            config: new FormConfig(),
          },
          // { name: "placeholder", id: this.randomString() },
        ],
      });
      this.inputs[event.currentIndex]["id"] = this.randomString();
      console.log(this.inputs);
    }
  }
  drobHelper(array: any[], nowIndex: number, prevIndex: number) {
    const arr = JSON.parse(JSON.stringify(array));
    const newArr = new Array(arr.length);
    newArr[nowIndex] = arr[prevIndex];
    delete arr[prevIndex];
    for (let i = 0, j = 0; i < arr.length; i++) {
      if (j == arr.length) {
        continue;
      }
      if (!newArr[i] && arr[j]) {
        newArr[i] = arr[j];
        j++;
      }
      if (!arr[j] && i != 0) {
        j++;
      }
    }
    return newArr;
  }
  drob(event: any, titles: any, input: any) {
    if (event.previousContainer === event.container) {
      console.log(event);
      // titles = this.drobHelper(titles, event.currentIndex, event.previousIndex);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }
  randomString(): string {
    let randomer = "abcdefghijklmnopqrstuvwxyz1234567890-_";
    let randomString = [];
    for (let i = 0; i < randomer.length; i++) {
      let p = Math.floor(Math.random() * randomer.length);
      randomString[i] = randomer[p];
      console.log(p);
    }
    console.log(randomString);
    return randomString.join("");
  }
  log(a: any) {
    console.log(a);
  }
  returnFalse() {
    return false;
  }
  add(a: any, e: string) {
    const placeholder = a.titles.some((data: any) => {
      return data.name === "placeholder";
    });
    if (placeholder) {
      a.titles.pop();
    }
    let config = new FormConfig();
    config.color = "#37c1ce";
    a.titles.push({ name: e, id: this.randomString(), config });
    console.log(a.titles);
  }
  done(a: any) {
    const placeholder = a.titles.some((data: any) => {
      return data.name === "placeholder";
    });
    if (placeholder) a.titles.pop();
  }
  map(array: any[]) {
    this.inputs.map((data) => {
      return data.id;
    });
  }
  changeConfig(config: any) {
    if (config == this.currentConfig) {
      console.log("yes");
    } else {
      this.currentConfig = config;
      this.configForm.patchValue(this.currentConfig);
    }
  }
  get hasMinMax() {
    console.log(this.currentConfig);
    return (
      this.currentConfig &&
      this.currentConfig.validators &&
      this.currentConfig.validators[0] &&
      (this.currentConfig.validators.includes("Min Value") || this.currentConfig.validators.includes("Max Value"))
    );
  }
  get hasLengthValidator() {
    return (
      this.currentConfig &&
      this.currentConfig.validators &&
      this.currentConfig.validators[0] &&
      (this.currentConfig.validators.includes("Min Length") || this.currentConfig.validators.includes("Max Length"))
    );
  }
  validatorChange(e: { value: string }) {
    if (e.value.includes("Min Value")) {
      this.configForm.get("min").setValidators(Validators.required);
      this.configForm.get("min").updateValueAndValidity({ emitEvent: false });
    } else {
      this.configForm.get("min").clearValidators();
      this.configForm.get("min").updateValueAndValidity({ emitEvent: false });
    }
    if (e.value.includes("Max Value")) {
      this.configForm.get("max").setValidators(Validators.required);
      this.configForm.get("max").updateValueAndValidity({ emitEvent: false });
    } else {
      this.configForm.get("max").clearValidators();
      this.configForm.get("max").updateValueAndValidity({ emitEvent: false });
    }
    if (e.value.includes("Min Length")) {
      this.configForm.get("minLength").setValidators(Validators.required);
      this.configForm.get("minLength").updateValueAndValidity({ emitEvent: false });
    } else {
      this.configForm.get("minLength").clearValidators();
      this.configForm.get("minLength").updateValueAndValidity({ emitEvent: false });
    }
    if (e.value.includes("Max Length")) {
      this.configForm.get("maxLength").setValidators(Validators.required);
      this.configForm.get("maxLength").updateValueAndValidity({ emitEvent: false });
    } else {
      this.configForm.get("maxLength").clearValidators();
      this.configForm.get("maxLength").updateValueAndValidity({ emitEvent: false });
    }
  }
}
// {"formRows":5,"inputs":[{"fieldName":"firstName","label":"First Name","type":"text","size":6,"rowNumber":1,"placeholder":"Type first name here..","required":true,"selectLabel":"Type first name here..","radioOptions":{"first":null,"second":null},"validators":[null]},{"fieldName":"lastName","label":"Last Name","type":"text","size":6,"rowNumber":1,"placeholder":"Type last name here..","required":true,"selectLabel":"Type last name here..","radioOptions":{"first":null,"second":null},"validators":[null]},{"fieldName":"country","label":"Country","type":"select","size":6,"options":[{"viewValue":"Afghanistan","value":"AF"},{"viewValue":"Åland Islands","value":"AX"},{"viewValue":"Albania","value":"AL"},{"viewValue":"Algeria","value":"DZ"},{"viewValue":"American Samoa","value":"AS"},{"viewValue":"Andorra","value":"AD"},{"viewValue":"Angola","value":"AO"},{"viewValue":"Anguilla","value":"AI"},{"viewValue":"Antarctica","value":"AQ"},{"viewValue":"Antigua and Barbuda","value":"AG"},{"viewValue":"Argentina","value":"AR"},{"viewValue":"Armenia","value":"AM"},{"viewValue":"Aruba","value":"AW"},{"viewValue":"Australia","value":"AU"},{"viewValue":"Austria","value":"AT"},{"viewValue":"Azerbaijan","value":"AZ"},{"viewValue":"Bahamas","value":"BS"},{"viewValue":"Bahrain","value":"BH"},{"viewValue":"Bangladesh","value":"BD"},{"viewValue":"Barbados","value":"BB"},{"viewValue":"Belarus","value":"BY"},{"viewValue":"Belgium","value":"BE"},{"viewValue":"Belize","value":"BZ"},{"viewValue":"Benin","value":"BJ"},{"viewValue":"Bermuda","value":"BM"},{"viewValue":"Bhutan","value":"BT"},{"viewValue":"Bolivia","value":"BO"},{"viewValue":"Bosnia and Herzegovina","value":"BA"},{"viewValue":"Botswana","value":"BW"},{"viewValue":"Bouvet Island","value":"BV"},{"viewValue":"Brazil","value":"BR"},{"viewValue":"British Indian Ocean Territory","value":"IO"},{"viewValue":"Brunei Darussalam","value":"BN"},{"viewValue":"Bulgaria","value":"BG"},{"viewValue":"Burkina Faso","value":"BF"},{"viewValue":"Burundi","value":"BI"},{"viewValue":"Cambodia","value":"KH"},{"viewValue":"Cameroon","value":"CM"},{"viewValue":"Canada","value":"CA"},{"viewValue":"Cape Verde","value":"CV"},{"viewValue":"Cayman Islands","value":"KY"},{"viewValue":"Central African Republic","value":"CF"},{"viewValue":"Chad","value":"TD"},{"viewValue":"Chile","value":"CL"},{"viewValue":"China","value":"CN"},{"viewValue":"Christmas Island","value":"CX"},{"viewValue":"Cocos (Keeling) Islands","value":"CC"},{"viewValue":"Colombia","value":"CO"},{"viewValue":"Comoros","value":"KM"},{"viewValue":"Congo","value":"CG"},{"viewValue":"Congo, The Democratic Republic of the","value":"CD"},{"viewValue":"Cook Islands","value":"CK"},{"viewValue":"Costa Rica","value":"CR"},{"viewValue":"Cote DIvoire","value":"CI"},{"viewValue":"Croatia","value":"HR"},{"viewValue":"Cuba","value":"CU"},{"viewValue":"Cyprus","value":"CY"},{"viewValue":"Czech Republic","value":"CZ"},{"viewValue":"Denmark","value":"DK"},{"viewValue":"Djibouti","value":"DJ"},{"viewValue":"Dominica","value":"DM"},{"viewValue":"Dominican Republic","value":"DO"},{"viewValue":"Ecuador","value":"EC"},{"viewValue":"Egypt","value":"EG"},{"viewValue":"El Salvador","value":"SV"},{"viewValue":"Equatorial Guinea","value":"GQ"},{"viewValue":"Eritrea","value":"ER"},{"viewValue":"Estonia","value":"EE"},{"viewValue":"Ethiopia","value":"ET"},{"viewValue":"Falkland Islands (Malvinas)","value":"FK"},{"viewValue":"Faroe Islands","value":"FO"},{"viewValue":"Fiji","value":"FJ"},{"viewValue":"Finland","value":"FI"},{"viewValue":"France","value":"FR"},{"viewValue":"French Guiana","value":"GF"},{"viewValue":"French Polynesia","value":"PF"},{"viewValue":"French Southern Territories","value":"TF"},{"viewValue":"Gabon","value":"GA"},{"viewValue":"Gambia","value":"GM"},{"viewValue":"Georgia","value":"GE"},{"viewValue":"Germany","value":"DE"},{"viewValue":"Ghana","value":"GH"},{"viewValue":"Gibraltar","value":"GI"},{"viewValue":"Greece","value":"GR"},{"viewValue":"Greenland","value":"GL"},{"viewValue":"Grenada","value":"GD"},{"viewValue":"Guadeloupe","value":"GP"},{"viewValue":"Guam","value":"GU"},{"viewValue":"Guatemala","value":"GT"},{"viewValue":"Guernsey","value":"GG"},{"viewValue":"Guinea","value":"GN"},{"viewValue":"Guinea-Bissau","value":"GW"},{"viewValue":"Guyana","value":"GY"},{"viewValue":"Haiti","value":"HT"},{"viewValue":"Heard Island and Mcdonald Islands","value":"HM"},{"viewValue":"Holy See (Vatican City State)","value":"VA"},{"viewValue":"Honduras","value":"HN"},{"viewValue":"Hong Kong","value":"HK"},{"viewValue":"Hungary","value":"HU"},{"viewValue":"Iceland","value":"IS"},{"viewValue":"India","value":"IN"},{"viewValue":"Indonesia","value":"ID"},{"viewValue":"Iran, Islamic Republic Of","value":"IR"},{"viewValue":"Iraq","value":"IQ"},{"viewValue":"Ireland","value":"IE"},{"viewValue":"Isle of Man","value":"IM"},{"viewValue":"Israel","value":"IL"},{"viewValue":"Italy","value":"IT"},{"viewValue":"Jamaica","value":"JM"},{"viewValue":"Japan","value":"JP"},{"viewValue":"Jersey","value":"JE"},{"viewValue":"Jordan","value":"JO"},{"viewValue":"Kazakhstan","value":"KZ"},{"viewValue":"Kenya","value":"KE"},{"viewValue":"Kiribati","value":"KI"},{"viewValue":"Korea, Democratic PeopleS Republic of","value":"KP"},{"viewValue":"Korea, Republic of","value":"KR"},{"viewValue":"Kuwait","value":"KW"},{"viewValue":"Kyrgyzstan","value":"KG"},{"viewValue":"Lao PeopleS Democratic Republic","value":"LA"},{"viewValue":"Latvia","value":"LV"},{"viewValue":"Lebanon","value":"LB"},{"viewValue":"Lesotho","value":"LS"},{"viewValue":"Liberia","value":"LR"},{"viewValue":"Libyan Arab Jamahiriya","value":"LY"},{"viewValue":"Liechtenstein","value":"LI"},{"viewValue":"Lithuania","value":"LT"},{"viewValue":"Luxembourg","value":"LU"},{"viewValue":"Macao","value":"MO"},{"viewValue":"Macedonia, The Former Yugoslav Republic of","value":"MK"},{"viewValue":"Madagascar","value":"MG"},{"viewValue":"Malawi","value":"MW"},{"viewValue":"Malaysia","value":"MY"},{"viewValue":"Maldives","value":"MV"},{"viewValue":"Mali","value":"ML"},{"viewValue":"Malta","value":"MT"},{"viewValue":"Marshall Islands","value":"MH"},{"viewValue":"Martinique","value":"MQ"},{"viewValue":"Mauritania","value":"MR"},{"viewValue":"Mauritius","value":"MU"},{"viewValue":"Mayotte","value":"YT"},{"viewValue":"Mexico","value":"MX"},{"viewValue":"Micronesia, Federated States of","value":"FM"},{"viewValue":"Moldova, Republic of","value":"MD"},{"viewValue":"Monaco","value":"MC"},{"viewValue":"Mongolia","value":"MN"},{"viewValue":"Montserrat","value":"MS"},{"viewValue":"Morocco","value":"MA"},{"viewValue":"Mozambique","value":"MZ"},{"viewValue":"Myanmar","value":"MM"},{"viewValue":"Namibia","value":"NA"},{"viewValue":"Nauru","value":"NR"},{"viewValue":"Nepal","value":"NP"},{"viewValue":"Netherlands","value":"NL"},{"viewValue":"Netherlands Antilles","value":"AN"},{"viewValue":"New Caledonia","value":"NC"},{"viewValue":"New Zealand","value":"NZ"},{"viewValue":"Nicaragua","value":"NI"},{"viewValue":"Niger","value":"NE"},{"viewValue":"Nigeria","value":"NG"},{"viewValue":"Niue","value":"NU"},{"viewValue":"Norfolk Island","value":"NF"},{"viewValue":"Northern Mariana Islands","value":"MP"},{"viewValue":"Norway","value":"NO"},{"viewValue":"Oman","value":"OM"},{"viewValue":"Pakistan","value":"PK"},{"viewValue":"Palau","value":"PW"},{"viewValue":"Palestinian Territory","value":"PS"},{"viewValue":"Panama","value":"PA"},{"viewValue":"Papua New Guinea","value":"PG"},{"viewValue":"Paraguay","value":"PY"},{"viewValue":"Peru","value":"PE"},{"viewValue":"Philippines","value":"PH"},{"viewValue":"Pitcairn","value":"PN"},{"viewValue":"Poland","value":"PL"},{"viewValue":"Portugal","value":"PT"},{"viewValue":"Puerto Rico","value":"PR"},{"viewValue":"Qatar","value":"QA"},{"viewValue":"Reunion","value":"RE"},{"viewValue":"Romania","value":"RO"},{"viewValue":"Russian Federation","value":"RU"},{"viewValue":"Rwanda","value":"RW"},{"viewValue":"Saint Helena","value":"SH"},{"viewValue":"Saint Kitts and Nevis","value":"KN"},{"viewValue":"Saint Lucia","value":"LC"},{"viewValue":"Saint Pierre and Miquelon","value":"PM"},{"viewValue":"Saint Vincent and the Grenadines","value":"VC"},{"viewValue":"Samoa","value":"WS"},{"viewValue":"San Marino","value":"SM"},{"viewValue":"Sao Tome and Principe","value":"ST"},{"viewValue":"Saudi Arabia","value":"SA"},{"viewValue":"Senegal","value":"SN"},{"viewValue":"Seychelles","value":"SC"},{"viewValue":"Sierra Leone","value":"SL"},{"viewValue":"Singapore","value":"SG"},{"viewValue":"Slovakia","value":"SK"},{"viewValue":"Slovenia","value":"SI"},{"viewValue":"Solomon Islands","value":"SB"},{"viewValue":"Somalia","value":"SO"},{"viewValue":"South Africa","value":"ZA"},{"viewValue":"South Georgia and the South Sandwich Islands","value":"GS"},{"viewValue":"Spain","value":"ES"},{"viewValue":"Sri Lanka","value":"LK"},{"viewValue":"Sudan","value":"SD"},{"viewValue":"Suriname","value":"SR"},{"viewValue":"Svalbard and Jan Mayen","value":"SJ"},{"viewValue":"Swaziland","value":"SZ"},{"viewValue":"Sweden","value":"SE"},{"viewValue":"Switzerland","value":"CH"},{"viewValue":"Syrian Arab Republic","value":"SY"},{"viewValue":"Taiwan, Province of China","value":"TW"},{"viewValue":"Tajikistan","value":"TJ"},{"viewValue":"Tanzania, United Republic of","value":"TZ"},{"viewValue":"Thailand","value":"TH"},{"viewValue":"Timor-Leste","value":"TL"},{"viewValue":"Togo","value":"TG"},{"viewValue":"Tokelau","value":"TK"},{"viewValue":"Tonga","value":"TO"},{"viewValue":"Trinidad and Tobago","value":"TT"},{"viewValue":"Tunisia","value":"TN"},{"viewValue":"Turkey","value":"TR"},{"viewValue":"Turkmenistan","value":"TM"},{"viewValue":"Turks and Caicos Islands","value":"TC"},{"viewValue":"Tuvalu","value":"TV"},{"viewValue":"Uganda","value":"UG"},{"viewValue":"Ukraine","value":"UA"},{"viewValue":"United Arab Emirates","value":"AE"},{"viewValue":"United Kingdom","value":"GB"},{"viewValue":"United States","value":"US"},{"viewValue":"United States Minor Outlying Islands","value":"UM"},{"viewValue":"Uruguay","value":"UY"},{"viewValue":"Uzbekistan","value":"UZ"},{"viewValue":"Vanuatu","value":"VU"},{"viewValue":"Venezuela","value":"VE"},{"viewValue":"Viet Nam","value":"VN"},{"viewValue":"Virgin Islands, British","value":"VG"},{"viewValue":"Virgin Islands, U.S.","value":"VI"},{"viewValue":"Wallis and Futuna","value":"WF"},{"viewValue":"Western Sahara","value":"EH"},{"viewValue":"Yemen","value":"YE"},{"viewValue":"Zambia","value":"ZM"},{"viewValue":"Zimbabwe","value":"ZW"}],"rowNumber":2,"placeholder":"Choose country","required":true,"selectLabel":"Choose country","radioOptions":{"first":null,"second":null},"validators":[null]},{"fieldName":"address","label":"Address","type":"text","size":6,"rowNumber":2,"placeholder":"Type Address Here...","required":true,"selectLabel":"Type Address Here...","radioOptions":{"first":null,"second":null},"validators":[null]},{"fieldName":"gender","label":"Gender","type":"radio","size":6,"rowNumber":3,"placeholder":"Gender","required":true,"selectLabel":"Gender","radioOptions":{"first":"Male","second":"Female"},"validators":[null]},{"fieldName":"dateOfBirth","label":"Date Of Birth","type":"date","size":6,"rowNumber":3,"placeholder":"DD/MM/YYYY","required":true,"selectLabel":"DD/MM/YYYY","radioOptions":{"first":null,"second":null},"validators":[null]},{"fieldName":"wifeName","label":"Wife Name","type":"text","size":4,"rowNumber":4,"placeholder":"Enter Wife Name here...","required":false,"selectLabel":"Enter Wife Name here...","radioOptions":{"first":null,"second":null}},{"fieldName":"sonName","label":"Son Name","type":"text","size":4,"rowNumber":4,"placeholder":"Enter Son Name here...","required":false,"selectLabel":"Enter Son Name here...","radioOptions":{"first":null,"second":null}},{"fieldName":"daughterName","label":"Daughter Name","type":"text","size":4,"rowNumber":4,"placeholder":"Enter Daughter name here ...","required":false,"selectLabel":"Enter Daughter name here ...","radioOptions":{"first":null,"second":null}},{"fieldName":"certificate","label":"Children Certifiace","type":"file","size":12,"rowNumber":5,"placeholder":"Children certificate here","required":false,"selectLabel":"Children certificate here","radioOptions":{"first":null,"second":null}}]}
