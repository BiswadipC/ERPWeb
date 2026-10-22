import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IAttributeDtl, IAttributeHead } from '../../../ClassesAndInterfaces/IAttribute';
import { AttributeService } from '../../../Services/attribute-service';

@Component({
  selector: 'app-add-edit-attribute',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-attribute.html',
  styleUrl: './add-edit-attribute.css',
})
export class AddEditAttribute {
  headGroup: FormGroup;
  dtlGroup: FormGroup;
  head: IAttributeHead = {} as IAttributeHead;
  dtls: IAttributeDtl[] = [];
  errors: string[] = [];

  constructor(private fb: FormBuilder, private act: ActivatedRoute, private router: Router, private as: AttributeService)
  {
    this.headGroup = fb.group({
      'IdNo': [0],
      'AttrName': [''],
      'Dtls': fb.array([])
    });

    this.dtlGroup = fb.group({
      'RecId': [-1],
      'IdNo': [0],
      'AttrValue': ['']
    });

    const AttrHeadIdNo = Number(act.snapshot.params['id']);
    as.GetAttributeHeadByAttrHeadId(AttrHeadIdNo).subscribe(res => {
      this.headGroup.patchValue({
        'IdNo': res.IdNo,
        'AttrName': res.Name
      })

      res.ListAttributeDtlResponse.forEach(v => {
        const initialGroup = fb.group({
          'RecId': [-1],
          'IdNo': [v.IdNo],
          'AttrValue': [v.AttrValue]
        });

        (this.headGroup.get('Dtls') as FormArray).push(initialGroup);
      });
    });
  } // constructor...

  get GetDetails()
  {
    return this.headGroup.get('Dtls') as FormArray;
  } // GetDetails...

  Add()
  {
    this.errors = [];
    if(this.dtlGroup.get('AttrValue')?.value == "")
    {
      this.errors.push("Attribute value cannot be blank.")
    }

    if(this.errors. length > 0)
    {
      return;
    }

    const recId = this.dtlGroup.get('RecId')?.value;
    const initialGroup = this.fb.group({
      'RecId': [recId],
      'IdNo': [this.dtlGroup.get('IdNo')?.value],
      'AttrValue': [this.dtlGroup.get('AttrValue')?.value]
    });

    if(recId == -1)
    {
      this.GetDetails.push(initialGroup);
    }
    else
    {
      this.GetDetails.setControl(recId, initialGroup);
    } // end if...

    this.Reset();
  } // Add...

  Reset()
  {
    this.dtlGroup.patchValue({
      'RecId': -1,
      'IdNo': 0,
      'AttrValue': ''
    });
  } // Reset...

  Edit(num: number, d: AbstractControl)
  {
    let gg = d as FormGroup;

    this.dtlGroup.patchValue({
      'RecId': num,
      'IdNo': gg.get('IdNo')?.value,
      'AttrValue': gg.get('AttrValue')?.value
    });
  } // Edit...

  Back()
  {
    this.router.navigate(['attributes']);
  } // Back...

  Save()
  {
    this.errors = [];
    const attrName = this.headGroup.get('AttrName')?.value;
    if(attrName == "")
    {
      this.errors.push("Attribute Name cannot be blank.");
    }
    if(this.GetDetails.length == 0)
    {
      this.errors.push("An Attribute must have atleast one value.");
    }

    if(this.errors.length > 0)
    {
      return;
    }

    this.head.IdNo = this.headGroup.get('IdNo')?.value;
    this.head.Name = this.headGroup.get('AttrName')?.value;
    this.head.CompanyId = Number(sessionStorage.getItem('CompanyId'));
    this.head.Verb = "post";

    this.dtls = [];
    for(let m of this.GetDetails.controls)
    {
      const dtl: IAttributeDtl = {} as IAttributeDtl;
      dtl.IdNo = m.get('IdNo')?.value;
      dtl.AttrValue = m.get('AttrValue')?.value;
      dtl.CompanyId = Number(sessionStorage.getItem('CompanyId'));
      this.dtls.push(dtl);
    }
    this.head.ListAttributeDtlResponse = this.dtls;

    this.as.Save(this.head).subscribe({
      next: res => {
        if(res.Message == "Success")
        {
          this.router.navigateByUrl('attributes');
        }
      },
      error: err => {
        this.errors = [];
        const errorlist = err.error.errors;
        for(let m in errorlist)
        {
          const messages = errorlist[m];
          messages.forEach((v: string) => {
            this.errors.push(v);
          })
        }
      }
    });
  } // Save...
} // class...
