import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PurchaseOrderService } from '../../../Services/purchase-order-service';
import { IPurchaseOrderHead } from '../../../ClassesAndInterfaces/IPurchaseOrder';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-po',
  imports: [RouterLink],
  templateUrl: './view-po.html',
  styleUrl: './view-po.css',
})
export class ViewPo implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef, private pos: PurchaseOrderService){}
  heads: IPurchaseOrderHead[] = [];
  subs!: Subscription

  ngOnInit(): void {
    this.subs =  this.pos.GetOrders().subscribe(res => {
        this.heads = res;
        this.cdr.detectChanges();
      })
  } // ngOnInit...

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  } // ngOnDestroy...
} // class...
