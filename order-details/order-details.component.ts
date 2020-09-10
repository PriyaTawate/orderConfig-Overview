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
  sumAddFeatures;
  arr = [0,1,2,3,4]

  constructor(private route: ActivatedRoute, router: Router, private orderConfigService: OrderConfigService) { }

  ngOnInit() {
        

   this.sumAddFeatures = this.arr.reduce((a, b) => { return a + b; });
   console.log(this.sumAddFeatures);
  }
  
  

}
