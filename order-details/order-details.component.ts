import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OrderConfigService } from '../order-config.service';
import { FormGroup, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  id: number = 0;
  @Input() idNew : number;
  @Input() osTitle: string;
  @Input() expandAcc : boolean;
  @Input() checkedItems: any;
  @Input() selectedFeatures: any;
  @Input() orderConfigJson;
  @Input() sysAccJson;

  sumAddFeaturesotc;
  sumAddFeaturesmonth;
  sumSysAccotc;
  sumSysAccmonth;
  jsonObject : [] = [];
  jsonObject1 : [] = [];

  constructor(private route: ActivatedRoute, router: Router, private orderConfigService: OrderConfigService) { }

  ngOnInit() {
        
  }
  
  ngOnChanges() {
    console.log("new " + this.orderConfigJson.addFeatures);
    this.sumAddFeaturesotc = 0;
    this.sumAddFeaturesmonth = 0;
    this.sumSysAccotc = 0;
    this.sumSysAccmonth = 0;
    this.jsonObject1 = [];
    this.jsonObject =[];

    this.orderConfigJson.addFeatures.forEach(element => {
      //this.jsonObject1.push({'featureLabel': element.featureLabel + element.versionSelect + element.instNumber, 'featurePrice': (element.featurePrice * element.instNumber) });
      
      if (element.featureUnit === 'OTC') {
        this.sumAddFeaturesotc = this.sumAddFeaturesotc + (element.instNumber * element.featurePrice);
      }
      else {
        this.sumAddFeaturesmonth = this.sumAddFeaturesmonth + (element.instNumber * element.featurePrice);
      }     
    });
    // this.jsonObject.push({'sumAddFeaturesotc' : this.sumAddFeaturesotc, 
    // 'sumAddFeaturesmonth' : this.sumAddFeaturesmonth, 'addFeatures' : this.jsonObject1});
    
    this.sysAccJson.sysAccInfoArray.forEach(element => {
      if (element.selectItem && element.selectItem > 0) {
        if (element.sysAccItemUnit === 'OTC') {
          this.sumSysAccotc = this.sumSysAccotc + element.sysAccItemPrice;
        }
        else {
          this.sumSysAccmonth = this.sumSysAccmonth + element.sysAccItemPrice;
        }
      }
    });

    if (this.sysAccJson.sysAccInfoLoginId.selectLoginItem && this.sysAccJson.sysAccInfoLoginId.selectLoginItem > 0) {
      if (this.sysAccJson.sysAccInfoLoginId.sysAccItemLoginUnit === 'OTC') {
        this.sumSysAccotc = this.sumSysAccotc + (+this.sysAccJson.sysAccInfoLoginId.sysAccItemLoginPrice * 
          this.sysAccJson.sysAccInfoLoginId.selectLoginItem);
      }
      else {
        this.sumSysAccmonth = this.sumSysAccmonth + (+this.sysAccJson.sysAccInfoLoginId.sysAccItemLoginPrice * 
          this.sysAccJson.sysAccInfoLoginId.selectLoginItem);
      }
    }
  }
  
}
