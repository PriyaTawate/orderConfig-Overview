import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderConfigService } from './order-config.service';
import {FormControl, FormGroup, FormBuilder, FormArray, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-order-config',
  templateUrl: './order-config.component.html',
  styleUrls: ['./order-config.component.scss']
})
export class OrderConfigComponent implements OnInit {
  id: number = 0;
  expandAcc: boolean = false;
  addFeaturesForm = new FormGroup({});
  selectedOSTitle: string = "Remote Development Program for z/OS V2";
  preInstalledSoftwares = [{id: 1, content: "DB 2 11 for z/OS and Utilities"},{id: 2, content: "DB 2 10 for z/OS and Utilities"},{id: 3, content: "CICS Transaction server for z/OS v5.1"}];
  SoftwarestobeSaved = [];
  features = [];
  addFeatures = new FormArray([]);
  versionReleaseItems = [{content: "v12.0", id: 0}, {content: "v13.0", id: 1}];
  @ViewChild('selectOption', {static: false}) selectOption: ElementRef;
  selectedFeatures = [];
  

  constructor(private router: Router, private orderConfigService: OrderConfigService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addFeaturesForm = this.formBuilder.group({
      addFeatures: this.formBuilder.array([])
    })
    ;

    this.orderConfigService.getAllAddFeatures().subscribe(res => {
      res.forEach(element => {
        this.addFeatures = this.addFeaturesForm.get('addFeatures') as FormArray;
        this.addFeatures.push(this.createItem());
        this.features.push(element);
      });
      console.log(this.features);
  });
}

onChange(event) {
  this.id = this.id + 1;
  this.orderConfigService.changeId(this.id);
  this.expandAcc = true;
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
    versionSelect : '',
    featurePrice: ''
  });
}

onSubmit() {}

}

