import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../Services/unit-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IUnit } from '../../../ClassesAndInterfaces/IUnit';

@Component({
  selector: 'app-add-edit-units',
  imports: [FormsModule],
  templateUrl: './add-edit-units.html',
  styleUrl: './add-edit-units.css',
})
export class AddEditUnits implements OnInit {
  constructor(private us: UnitService, private router: Router, private act: ActivatedRoute){}
  unitname: string = '';
  unitId: number = 0;
  errors: string[] = [];

  ngOnInit(): void {
    const unitId = Number(this.act.snapshot.params['id']);
    this.us.GetUnitByUnitId(unitId).subscribe(res => {
      this.unitId = res.IdNo;
      this.unitname = res.Name;
    })
  }

  Back()
  {
    this.router.navigateByUrl('units');
  }

  Save()
  {
    const unit: IUnit = {} as IUnit;
    unit.IdNo = this.unitId;
    unit.Name = this.unitname;
    unit.CompanyId = Number(sessionStorage.getItem('CompanyId'));

    this.us.Save(unit).subscribe({
      next: res => {
        if(res.Message == "Success")
        {
          this.router.navigateByUrl('units');
        }
      },
      error: err => {
        const errorlist = err.error.errors;
        this.errors = [];
        for(let m in errorlist)
        {
          const messages = errorlist[m];
          messages.forEach((v: string) => {
            this.errors.push(v);
          })
        }
      }
    });
  }
} // class...
