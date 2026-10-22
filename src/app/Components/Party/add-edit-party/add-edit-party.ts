import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyService } from '../../../Services/party-service';
import { CountryStateService } from '../../../Services/country-state-service';
import { ICountry, IState } from '../../../ClassesAndInterfaces/CountryAndState';
import { IParty } from '../../../ClassesAndInterfaces/IParty';

@Component({
  selector: 'app-add-edit-party',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-party.html',
  styleUrl: './add-edit-party.css',
})
export class AddEditParty implements OnInit {
  partyGroup: FormGroup;
  countries: ICountry[] = [];
  states: IState[] = [];
  errors: string[] = [];

  constructor(private act: ActivatedRoute, private ps: PartyService, private fb: FormBuilder, private cs: CountryStateService,
    private cdr: ChangeDetectorRef, private router: Router)
  {
    this.partyGroup = fb.group({
      'PartyCode': [0],
      'PartyName': [''],
      'PartyType': [''],
      'Address1': [''],
      'CountryCode': [''],
      'CountryName': [''],
      'StateCode': [''],
      'StateName': [''],
      'City': [''],
      'Pin': [''],
      'Phone': [''],
      'Email': [''],
      'Website': ['']
    });
  } // constructor...

  ngOnInit(): void {
    this.cs.GetCountries().subscribe(res => {
      this.countries = res;
      this.cdr.detectChanges();
    });

    const partyCode = Number(this.act.snapshot.params['id']);
    this.ps.GetPartyByPartyCode(partyCode).subscribe(res => {
      this.cs.GetStatesByCountryCode(res.CountryCode).subscribe(x => {
        this.states = x;
        this.partyGroup.patchValue({
        'PartyCode': res.PartyCode,
        'PartyName': res.PartyName,
        'PartyType': res.PartyType,
        'Address1': res.Address1,
        'CountryCode': res.CountryCode,
        'CountryName': res.CountryName,
        'StateCode': res.StateCode,
        'StateName': res.StateName,
        'City': res.City,
        'Pin': res.Pin,
        'Phone': res.Phone,
        'Email': res.Email,
        'Website': res.Website
      });
      });
    });
  } // ngOnInit...

  selectState(event: any)
  {
    this.states = [];
    var partyCode = event.target.value;
    this.cs.GetStatesByCountryCode(partyCode).subscribe(res => {
      this.states = res;
      this.cdr.detectChanges();
    })
  } // selectState...

  Back()
  {
    this.router.navigateByUrl('party');
  } // Back...

  Save()
  {
    this.errors = [];
    if(this.partyGroup.get('PartyName')?.value == '')
    {
      this.errors.push("Party Name cannot be blank.");
    }
    if(this.partyGroup.get('PartyType')?.value == '')
    {
      this.errors.push("Select a Party Type to proceed.");
    }
    if(this.partyGroup.get('CountryCode')?.value == '')
    {
      this.errors.push("Please Select a country.");
    }
    if(this.partyGroup.get('StateCode')?.value == '')
    {
      this.errors.push("Please Select a state.");
    }

    if(this.errors.length > 0)
    {
      return;
    }

    const party: IParty = {} as IParty;
    party.PartyCode = this.partyGroup.get('PartyCode')?.value;
    party.PartyName = this.partyGroup.get('PartyName')?.value;
    party.PartyType = this.partyGroup.get('PartyType')?.value;
    party.Address1 = this.partyGroup.get('Address1')?.value;
    party.CountryCode = this.partyGroup.get('CountryCode')?.value;
    party.CountryName = '';
    party.StateCode = this.partyGroup.get('StateCode')?.value;
    party.StateName = '';
    party.City = this.partyGroup.get('City')?.value;
    party.Pin = this.partyGroup.get('Pin')?.value;
    party.Phone = this.partyGroup.get('Phone')?.value;
    party.Email = this.partyGroup.get('Email')?.value;
    party.Website = this.partyGroup.get('Website')?.value;
    party.CompanyId = Number(sessionStorage.getItem('CompanyId'));

    this.ps.Save(party).subscribe({
      next: res => {
        if(res.Message == "Success")
        {
          this.router.navigateByUrl('party');
        }
      },
      error: err => {
        this.errors = [];
        const errorlist = err.error.errors;
        for(let m in errorlist)
        {
          const messages = errorlist[m];
          messages.forEach((x: string) => {
            this.errors.push(x);
          })
        }
      }
    }); // subscribe...
  } // Save...
} // class...
