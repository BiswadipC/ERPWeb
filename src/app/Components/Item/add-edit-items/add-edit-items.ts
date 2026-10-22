import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../../../Services/item-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitService } from '../../../Services/unit-service';
import { IUnit } from '../../../ClassesAndInterfaces/IUnit';
import { AttributeService } from '../../../Services/attribute-service';
import { IAttributeDtl, IAttributeHead } from '../../../ClassesAndInterfaces/IAttribute';
import { ItemGST } from '../item-gst/item-gst';
import { ItemOpStock } from '../item-op-stock/item-op-stock';
import { IItemDtl, IItemGst, IItemHead, IItemOpStock } from '../../../ClassesAndInterfaces/IItem';

@Component({
  selector: 'app-add-edit-items',
  imports: [ReactiveFormsModule, CommonModule, ItemGST, ItemOpStock],
  templateUrl: './add-edit-items.html',
  styleUrl: './add-edit-items.css',
})
export class AddEditItems implements OnInit {
  headGroup: FormGroup;
  dtlGroup: FormGroup;
  gstGroup!: FormGroup;
  opGroup!: FormGroup;
  units: IUnit[] = [];
  attrHeads: IAttributeHead[] = [];
  attrDtls: IAttributeDtl[] = [];
  errors: string[] = [];
  OpStockArray: FormArray;
  item: IItemHead = {} as IItemHead;
  dtls: IItemDtl[] = [];
  ops: IItemOpStock[] = [];

  constructor(private is: ItemService, private act: ActivatedRoute, private fb: FormBuilder, private us: UnitService,
    private cdr: ChangeDetectorRef, private as: AttributeService, private router: Router)
  {
    this.headGroup = fb.group({
      'ItemId': [0],
      'ItemName': [''],
      'UnitId': [0],
      'MRP': [0],
      'ReorderLevel': [0],
      'Dtl': fb.array([])
    });

    this.dtlGroup = fb.group({
      'RecId': [-1],
      'DtlId': [0],
      'AttrHeadId': [0],
      'AttrName': [''],
      'AttrDtlId': [0],
      'AttrValue': ['']
    });

    this.gstGroup = fb.group({
      'IdNo': [0],
      'PurCgst': [0],
      'PurSgst': [0],
      'PurIgst': [0],
      'SalCgst': [0],
      'SalSgst': [0],
      'SalIgst': [0]
    });

    this.opGroup = fb.group({
      'RecId': [-1],
      'IdNo': [0],
      'WhId': [0],
      'WhName': [''],
      'Qty': [0],
      'Rate': [0],
      'Amount': [0]
    });

    this.OpStockArray = fb.array([]);
  } // constructor...

  ngOnInit(): void {
    this.us.GetUnits().subscribe(res => {
      this.units = res;
      this.cdr.detectChanges();
    });

    this.as.GetAttributes().subscribe(res => {
      this.attrHeads = res;
      this.cdr.detectChanges();
    });

    const itemId = this.act.snapshot.params['id'];
    if(itemId > 0)
    {
      this.is.GetItemByItemId(itemId).subscribe(res => {
        this.headGroup.patchValue({
          'ItemId': itemId,
          'ItemName': res.ItemName,
          'UnitId': res.UnitId,
          'MRP': res.MRP,
          'ReorderLevel': res.ReorderLevel
        });

        res.ListItemDtl.forEach((x,i) => {
          const initialGroup = this.fb.group({
            'RecId': [i],
            'DtlId': [x.DtlId],
            'AttrHeadId': [x.AttrHeadId],
            'AttrName': [x.AttrHeadName],
            'AttrDtlId': [x.AttrDtlId],
            'AttrValue': [x.AttrDtlValue]
          });
          (this.headGroup.get('Dtl') as FormArray).push(initialGroup);
        });

        this.gstGroup.patchValue({
          'IdNo': res.itemGst.IdNo,
          'PurCgst': res.itemGst.PurCgst,
          'PurSgst': res.itemGst.PurSgst,
          'PurIgst': res.itemGst.PurIgst,
          'SalCgst': res.itemGst.SalCgst,
          'SalSgst': res.itemGst.SalSgst,
          'SalIgst': res.itemGst.SalIgst
        });

        this.OpStockArray.controls = [];
        res.ListItemOpStock.forEach((x,i) => {
          const initialGroup = this.fb.group({
            'RecId': [i],
            'IdNo': [x.IdNo],
            'WhId': [x.WhId],
            'WhName': [x.WhName],
            'Qty': [x.Qty],
            'Rate': [x.Rate],
            'Amount': [x.Amount]
          });
          this.OpStockArray.push(initialGroup);
        })
      }); // subscribe...
    } // end if...
  } // ngOnInit...

  get GetDetails()
  {
    return this.headGroup.get('Dtl') as FormArray;
  }

  onAttrHeadChange(event: any)
  {
    const attrHeadId = event.target.value;
    this.as.GetAttributeDtlsByAttrHeadId(attrHeadId).subscribe(res => {
      this.attrDtls = res;
      this.cdr.detectChanges();
    });
  } // onAttrHeadChange...

  Add()
  {
    const recId = this.dtlGroup.get('RecId')?.value;
    const attrHeadId = this.dtlGroup.get('AttrHeadId')?.value;
    const attrDtlId = this.dtlGroup.get('AttrDtlId')?.value;
    const attrName = this.attrHeads.find(x => x.IdNo == attrHeadId)?.Name;

    this.errors = [];
    if(attrHeadId == null || attrHeadId == 0)
    {
      this.errors.push("Attribute Name cannot be blank.");
    }
    if(attrDtlId == null || attrDtlId == 0)
    {
      this.errors.push("Attribute Value cannot be blank.");
    }

    this.GetDetails.controls.forEach((m, index) => {
        if(recId == -1 && attrHeadId == m.get('AttrHeadId')?.value)
        {
          this.errors.push("Duplicate Attribute Name not allowed.");
          return;
        }
        if(recId >= 0 && attrHeadId == m.get('AttrHeadId')?.value && recId !== index)
        {
          this.errors.push("Duplicate Attribute Name not allowed.");
          return;
        }
    });

    if(this.errors.length > 0)
    {
      return;
    }

    this.as.GetAttributeDtlsByAttrHeadId(attrHeadId).subscribe(res => {
      const attrValue = res.find(x => x.IdNo == attrDtlId)?.AttrValue;
      const initialGroup = this.fb.group({
        'RecId': [this.dtlGroup.get('RecId')?.value],
        'DtlId': [this.dtlGroup.get('DtlId')?.value],
        'AttrHeadId': [attrHeadId],
        'AttrName': [attrName],
        'AttrDtlId': [attrDtlId],
        'AttrValue': [attrValue]
      });
      if(recId == -1)
      {
        (this.headGroup.get('Dtl') as FormArray).push(initialGroup);
      }
      else
      {
        (this.headGroup.get('Dtl') as FormArray).setControl(recId, initialGroup);
      }

      this.Clear();
    }) // GetAttributeDtlsByAttrHeadId...
  } // Add...

  Clear()
  {
    this.dtlGroup.patchValue({
      'RecId': -1,
      'DtlId': 0,
      'AttrHeadId': 0,
      'AttrName': '',
      'AttrDtlId': 0,
      'AttrValue': ''
    });
  } // Clear...

  Edit(num: number, d: AbstractControl)
  {
    let gg = d as FormGroup;
    const attrHeadId = gg.get('AttrHeadId')?.value;
    this.attrDtls = [];
    this.as.GetAttributeDtlsByAttrHeadId(attrHeadId).subscribe(res => {
      this.attrDtls = res;

      this.dtlGroup.patchValue({
      'RecId': num,
      'DtlId': gg.get('DtlId')?.value,
      'AttrHeadId': attrHeadId,
      'AttrName': gg.get('AttrName')?.value,
      'AttrDtlId': gg.get('AttrDtlId')?.value,
      'AttrValue': gg.get('AttrValue')?.value
    });
      this.cdr.detectChanges();
    });
  } // Edit...

  GetGst(event: any)
  {
    let gstGroup = event as FormGroup;
    this.gstGroup = gstGroup;
  } // GetGst...

  GetOpStock(event: any)
  {
    this.OpStockArray = event;
  } // GetOpStock...

  Save()
  {
    this.errors = [];
    if(this.headGroup.get('ItemName')?.value == '')
    {
      this.errors.push("Item Name cannot be blank.");
    }
    if(this.headGroup.get('UnitId')?.value == 0 || this.headGroup.get('UnitId')?.value == null)
    {
      this.errors.push("Specify an Unit for the item.");
    }
    if(this.headGroup.get('MRP')?.value <= 0)
    {
      this.errors.push('Invalid MRP specified. Please enter a valid value.');
    }
    if(this.headGroup.get('ReorderLevel')?.value <= 0)
    {
      this.errors.push('Invalid Reorder-Level specified. Please enter a valid value.');
    }

    if(this.errors.length > 0)
    {
      return;
    }

    this.dtls = [];
    this.GetDetails.controls.forEach(m => {
      const dtl: IItemDtl = {} as IItemDtl;
      dtl.DtlId = m.get('DtlId')?.value;
      dtl.AttrHeadId = m.get('AttrHeadId')?.value;
      dtl.AttrHeadName = m.get('AttrName')?.value;
      dtl.AttrDtlId = m.get('AttrDtlId')?.value;
      dtl.AttrDtlValue = m.get('AttrValue')?.value;
      this.dtls.push(dtl);
    });

    const gst: IItemGst = {} as IItemGst;
    gst.IdNo = this.gstGroup.get('IdNo')?.value;
    gst.PurCgst = this.gstGroup.get('PurCgst')?.value;
    gst.PurSgst = this.gstGroup.get('PurSgst')?.value;
    gst.PurIgst = this.gstGroup.get('PurIgst')?.value;
    gst.SalCgst = this.gstGroup.get('SalCgst')?.value;
    gst.SalSgst = this.gstGroup.get('SalSgst')?.value;
    gst.SalIgst = this.gstGroup.get('SalIgst')?.value;

    this.ops = [];
    this.OpStockArray.controls.forEach(m => {
      const op: IItemOpStock = {} as IItemOpStock
      op.IdNo = m.get('IdNo')?.value;
      op.WhId = m.get('WhId')?.value;
      op.WhName = '';
      op.Qty = m.get('Qty')?.value;
      op.Rate = m.get('Rate')?.value;
      op.Amount = m.get('Amount')?.value;
      this.ops.push(op);
    });

    this.item = {} as IItemHead;
    this.item.ItemId = this.headGroup.get('ItemId')?.value;
    this.item.ItemName = this.headGroup.get('ItemName')?.value;
    this.item.CompanyId = Number(sessionStorage.getItem('CompanyId'));
    this.item.UnitId = this.headGroup.get('UnitId')?.value;
    this.item.MRP = this.headGroup.get('MRP')?.value;
    this.item.ReorderLevel = this.headGroup.get('ReorderLevel')?.value;
    this.item.verb = 'post';
    this.item.ListItemDtl = this.dtls;
    this.item.itemGst = gst;
    this.item.ListItemOpStock = this.ops;

    this.is.Save(this.item).subscribe({
      next: res => {
        if(res.Message == "Success")
        {
          this.router.navigateByUrl('items');
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
    }); // subscribe...
  } // Save...

  Back()
  {
    this.router.navigateByUrl('items');
  } // Back...
} // class...
