import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth-service';
import { IAuthenticateUser } from '../../ClassesAndInterfaces/IAuthenticateUser';
import { CompanyService } from '../../Services/company-service';
import { ICompany, IFinYear } from '../../ClassesAndInterfaces/CompanyAndFinYear';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  imports: [CommonModule, FormsModule],
  templateUrl: './authentication.html',
  styleUrl: './authentication.css',
})
export class Authentication {
  isAuthenticated: boolean = false;
  username: string = '';
  password: string = '';
  errors: string[] = [];
  user: IAuthenticateUser = {} as IAuthenticateUser;
  as = inject(AuthService);
  cs = inject(CompanyService);
  companyId: number = 0;
  finYearId: number = 0;
  companies: ICompany[] = [];
  years: IFinYear[] = [];

  constructor(private cdr: ChangeDetectorRef, private router: Router){}

  Authenticate()
  {
    this.user.UserName = this.username;
    this.user.Password = this.password;

    this.as.Authenticate(this.user).subscribe({
      next: res => {
        if(res == true)
        {
          this.isAuthenticated = true;
          this.cs.GetCompanies().subscribe(res => {
            this.companies = res;
            this.cdr.detectChanges();
          });
        }
        else
        {
          this.isAuthenticated = false;
        }
      },
      error: err => {
        this.isAuthenticated = false;
        const errorList = err.error.errors;
        this.errors = [];
        for(let m in errorList)
        {
          const messages = errorList[m];
          messages.forEach((v: string) => {
            this.errors.push(v)
          })
        }
      }
    });
  } // Authenticate...

  GetFinYears(event: any)
  {
    const companyId = event.target.value;
    this.cs.GetFinYearsByCompanyId(companyId).subscribe(res => {
      this.years = res;
      this.cdr.detectChanges();
    });
  } // GetFinYears...

  ContinueToDashboard()
  {
    this.errors = [];
    if(this.companyId == 0 || this.companyId == null)
    {
      this.errors.push("Please select a company to proceed.");
    }
    if(this.finYearId == 0 || this.finYearId == null)
    {
      this.errors.push("Please select a financial year to proceed.");
    }

    if(this.errors.length > 0)
    {
      return;
    }

    this.as.CompanyFinYearSelection(this.companyId, this.finYearId, this.username).subscribe(res => {
      sessionStorage.setItem('CompanyId', String(this.companyId));
      sessionStorage.setItem('FinYearId', String(this.finYearId));
      sessionStorage.setItem('UserName', this.username);
      this.router.navigate(['dashboard']);
    })
  } // ContinueToDashboard...
} // class...
