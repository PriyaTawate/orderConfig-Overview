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
  sumAddFeaturesotc;
  sumAddFeaturesmonth;
  arr = [0,1,2,3,4];

  constructor(private route: ActivatedRoute, router: Router, private orderConfigService: OrderConfigService) { }

  ngOnInit() {
        
  }
  
  ngOnChanges() {
    console.log("new " + this.orderConfigJson.addFeatures);
    this.sumAddFeaturesotc = 0;
    this.sumAddFeaturesmonth = 0;
    this.orderConfigJson.addFeatures.forEach(element => {
      if (element.featureUnit === 'OTC') {
        this.sumAddFeaturesotc = this.sumAddFeaturesotc + (element.instNumber * element.featurePrice);
      }
      else {
        this.sumAddFeaturesmonth = this.sumAddFeaturesmonth + (element.instNumber * element.featurePrice);
      }
      
    });
    console.log(this.sumAddFeaturesotc);
    console.log(this.sumAddFeaturesmonth);
  }
  

}
