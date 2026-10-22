import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WarehouseService } from '../../../Services/warehouse-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICountry, IState } from '../../../ClassesAndInterfaces/CountryAndState';
import { CountryStateService } from '../../../Services/country-state-service';
import { CommonModule } from '@angular/common';
import { IWarehouse } from '../../../ClassesAndInterfaces/IWarehouse';

@Component({
  selector: 'app-add-edit-wh',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-wh.html',
  styleUrl: './add-edit-wh.css',
})
export class AddEditWh implements OnInit {
  whGroup: FormGroup;
  countries: ICountry[] = [];
  states: IState[] = [];
  errors: string[] = [];
  wh: IWarehouse = {} as IWarehouse;

  constructor(private ws: WarehouseService, private fb: FormBuilder, private act: ActivatedRoute,
    private css: CountryStateService, private cdr: ChangeDetectorRef, private router: Router)
  {
    this.whGroup = fb.group({
      'WhId': [0],
      'WhName': [''],
      'WhDescription': [''],
      'WhAddress': [''],
      'WhCountry': [''],
      'WhState': [''],
      'WhCity': [''],
      'WhPin': ['']
    });
  } // constructor...

  ngOnInit(): void {
    this.css.GetCountries().subscribe(res => {
      this.countries = res;
      this.cdr.detectChanges();
    });

    const whId = Number(this.act.snapshot.params['id']);
    this.ws.GetWarehouseById(whId).subscribe(res => {
      const country = res.WhCountry;
      this.css.GetStatesByCountryCode(country).subscribe(x => {
        this.states = x;
        this.cdr.detectChanges();

        this.whGroup.patchValue({
        'WhId': res.WhId,
        'WhName': res.WhName,
        'WhDescription': res.WhDescription,
        'WhAddress': res.WhAddress,
        'WhCountry': res.WhCountry,
        'WhState': res.WhState,
        'WhCity': res.WhCity,
        'WhPin': res.WhPin
      });
      })
    });
  } // ngOnInit...

  GetStates(event: any)
  {
    const countryCode = event.target.value;
    this.css.GetStatesByCountryCode(countryCode).subscribe(res => {
      this.states = res;
      this.cdr.detectChanges();
    });
  } // GetStates...

  Back()
  {
    this.router.navigateByUrl('warehouse');
  }

  Save()
  {
    this.errors = [];
    if(this.whGroup.get('WhName')?.value == "")
    {
      this.errors.push("Warehouse Name cannot be blank.");
    }
    if(this.whGroup.get('WhCountry')?.value == "")
    {
      this.errors.push("Warehouse Country cannot be blank.");
    }
    if(this.whGroup.get('WhState')?.value == "")
    {
      this.errors.push("Warehouse State cannot be blank.");
    }

    if(this.errors.length > 0)
    {
      return;
    }

    this.wh.WhId = this.whGroup.get('WhId')?.value;
    this.wh.WhName = this.whGroup.get('WhName')?.value;
    this.wh.WhDescription = this.whGroup.get('WhDescription')?.value;
    this.wh.WhAddress = this.whGroup.get('WhAddress')?.value;
    this.wh.WhCountry = this.whGroup.get('WhCountry')?.value;
    this.wh.WhState = this.whGroup.get('WhState')?.value;
    this.wh.WhCity = this.whGroup.get('WhCity')?.value;
    this.wh.WhPin = this.whGroup.get('WhPin')?.value;
    this.wh.CompanyId = Number(sessionStorage.getItem('CompanyId'));

    this.ws.Save(this.wh).subscribe({
      next: res => {
        if(res.Message == "Success")
        {
          this.router.navigateByUrl('warehouse');
        }
      },
      error: err => {
        this.errors = [];
        var errorList = err.error.errors;
        for(let m in errorList)
        {
          const messages = errorList[m];
          messages.forEach((v: string) => {
            this.errors.push(v);
          })
        }
      }
    });
  } // Save...
} // class...
