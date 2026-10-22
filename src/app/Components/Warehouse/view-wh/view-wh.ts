import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../../Services/warehouse-service';
import { IWarehouse } from '../../../ClassesAndInterfaces/IWarehouse';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-wh',
  imports: [RouterLink],
  templateUrl: './view-wh.html',
  styleUrl: './view-wh.css',
})
export class ViewWh implements OnInit {
  whs: IWarehouse[] = [];

  constructor(private ws: WarehouseService, private cdr: ChangeDetectorRef, private router: Router)
  {

  } // constructor...

  ngOnInit(): void {
    this.ws.GetWarehouses().subscribe(res => {
      this.whs = res;
      this.cdr.detectChanges();
    })
  }

  Add()
  {
    this.router.navigate(['add-edit-wh', 0]);
  }
} // class...
