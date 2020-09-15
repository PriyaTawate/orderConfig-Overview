import { Component, OnInit, ElementRef, ViewChild, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { OrderConfigService } from './order-config.service';
import {FormControl, FormGroup, FormBuilder, FormArray, Validator, Validators} from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  selector: 'app-order-config',
  templateUrl: './order-config.component.html',
  styleUrls: ['./order-config.component.scss']
})
export class OrderConfigComponent implements OnInit {
  id: number = 0;
  expandAcc: boolean = false;
  selectedOSTitle: string = "Remote Development Program for z/OS V2";
  preInstalledSoftwares = [{id: 1, content: "DB 2 11 for z/OS and Utilities"},
                           {id: 2, content: "DB 2 10 for z/OS and Utilities"},
                           {id: 3, content: "CICS Transaction server for z/OS v5.1"},
                           {}];
  SoftwarestobeSaved = [];
  features = [];
  selectedRadio = 0;
  requiredLogins = 1;
  addFeaturesForm = new FormGroup({});
  addFeatures = new FormArray([]);
  sysAccForm = new FormGroup({});
  // sysAccInfoLoginId = new FormGroup({});
  sysAccInfoArray;
  sysAccInfo = [{ "maxnum": 1, "label": "Public Internet Feature", "price": 0, "unit": "Feature at No Cost" },
  { "maxnum": 1, "label": "Site to site VPN connection", "price": 1000, "unit": "OTC" }, 
  { "maxnum": 20, "label": "Number of Login IDs required", "price": 0, "unit": "Feature at No Cost" }];

  sysAccInfoFiltered = [];
  sysAccIngoLoginIds = [];
  selectedFeatures = [];
  

  constructor(private router: Router, private orderConfigService: OrderConfigService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addFeaturesForm = this.formBuilder.group({
      addFeatures: this.formBuilder.array([]) //, this.addFeaturesValidator
    });

    this.sysAccForm = this.formBuilder.group({
      sysAccInfoArray : this.formBuilder.array([]),
      sysAccInfoLoginId : this.formBuilder.group({
        selectLoginItem : '',
        sysAccItemLoginLabel: '',
        sysAccItemLoginPrice : '',
        sysAccItemLoginUnit : ''
      })
    });

    // this.sysAccForm.patchValue({
    //   sysAccInfoLoginId : {selectLoginItem : '1'}
    // });

    this.orderConfigService.getAllAddFeatures().subscribe(res => {
      res.forEach(element => {
        this.addFeatures = this.addFeaturesForm.get('addFeatures') as FormArray;
        this.addFeatures.push(this.createItem());
        this.features.push(element);
      });
      console.log(this.features);
  });

  this.sysAccInfoFiltered = this.sysAccInfo.filter(({label}) => !label.includes('Login'));
  this.sysAccIngoLoginIds = this.sysAccInfo.filter(({label}) => label.includes('Login'));

  console.log(this.sysAccIngoLoginIds[0]);

  this.sysAccInfoFiltered.forEach(element => {
    this.sysAccInfoArray = this.sysAccForm.get('sysAccInfoArray') as FormArray;
    this.sysAccInfoArray.push(this.createSysAccItem());
    });
}

onChange(event) {
  this.id = this.id + 1;
  this.orderConfigService.changeId(this.id);
  this.expandAcc = true;
}

onCheckedSysChange(event, item) {

}

onSelectChange(event) {
  console.log(this.addFeaturesForm.get('addFeatures').value);
}

onInputChange() {
  this.selectedFeatures = [];
    // this.addFeaturesForm.get('addFeatures').value.forEach(element => {
    //   if (element['instNumber'] > 0) {
    //     for (let i of element['instNumber']) {
    //       this.selectedFeatures.push(event)
    //     }
    //   }
    // });
    console.log(this.addFeaturesForm.get('addFeatures').value);
  this.selectedFeatures.push(event);
  console.log(event);
  console.log(this.selectedFeatures);
}

onCheckedChange(event, item) {
  if (event.checked === true)
  {
    console.log(item + " checked");
    this.SoftwarestobeSaved.push(item);
    console.log(this.SoftwarestobeSaved);
  }
  else 
  {
    console.log(item + " unchecked");
    this.SoftwarestobeSaved = this.SoftwarestobeSaved.filter(({ id }) => id !== item.id);
    console.log(this.SoftwarestobeSaved);
  }
}

createItem(): FormGroup {
  return this.formBuilder.group({
    instNumber : new FormControl(0, [Validators.required]),
    featureLabel: '',
    versionSelect : 'default',
    featurePrice: '',
    featureUnit: ''
  });
}

createSysAccItem(): FormGroup {
  return this.formBuilder.group({
    selectItem : 0,
    sysAccItemLabel: '',
    sysAccItemPrice : '',
    sysAccItemUnit : ''
  });
}

onSubmit() {}

onSubmit1() {}

addFeaturesValidator(formarray: FormArray): {[s: string]: boolean} {
  if (formarray.get('instNumber').value > 0 && formarray.get('versionSelect').value === 'default') {
    return { 'versionRequired' : true};
  }
  return null;
}

onRadioChecked(me) {
  // this.sysAccInfoArray.value.forEach((element, index) => {
  //   //console.log(element['selectItem']);
  //   //element['selectItem'] = 2;
  // });

  // this.sysAccInfoArray = this.sysAccForm.get('sysAccInfoArray') as FormArray;

  // for (let control of this.sysAccInfoArray.controls) {
  //   console.log(control.controls['selectItem']);
  // }

  this.selectedRadio = me;
  
  //console.log(this.sysAccInfoArray);
  //console.log(this.sysAccForm.get('sysAccInfoArray').get('1').get('selectItem').patchValue('1'));
}
}

