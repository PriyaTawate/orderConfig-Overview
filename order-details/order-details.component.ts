import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OrderConfigService } from '../order-config.service';
import { FormGroup } from '@angular/forms';

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
  constructor(private route: ActivatedRoute, router: Router, private orderConfigService: OrderConfigService) { }

  ngOnInit() {
    console.log("in new page " + this.checkedItems);
  //   this.route.params.subscribe(
  //     (params: Params) => {
  //       this.id = +params['id'];
  //       console.log(this.id);
  //     }
  //   );


  // //this.id = this.orderConfigService.getId();
  //   this.orderConfigService.orderChanged.subscribe(
  //     (id: number) =>
  //       {
  //         this.id = id;
  //       }
  //   );
  }
  

}
