import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ItemService } from '../../../Services/item-service';
import { RouterLink } from '@angular/router';
import { IItemHead } from '../../../ClassesAndInterfaces/IItem';

@Component({
  selector: 'app-view-items',
  imports: [RouterLink],
  templateUrl: './view-items.html',
  styleUrl: './view-items.css',
})
export class ViewItems implements OnInit {
  constructor(private is: ItemService, private cdr: ChangeDetectorRef){}
  items: IItemHead[] = [];

  ngOnInit(): void {
    const companyId = sessionStorage.getItem('CompanyId');
    this.is.GetItems(Number(companyId)).subscribe(res => {
      this.items = res;
      this.cdr.detectChanges();
    })
  }
} // class...
