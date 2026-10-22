import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UnitService } from '../../../Services/unit-service';
import { IUnit } from '../../../ClassesAndInterfaces/IUnit';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unit',
  imports: [RouterLink],
  templateUrl: './unit.html',
  styleUrl: './unit.css',
})
export class Unit implements OnInit {
  constructor(private us: UnitService, private cdr: ChangeDetectorRef){}
  units: IUnit[] = [];

  ngOnInit(): void {
    this.us.GetUnits().subscribe(res => {
      this.units = res;
      this.cdr.detectChanges();
    })
  } // ngOnInit...
} // class...
