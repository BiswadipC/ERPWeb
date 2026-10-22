import { ChangeDetectorRef, Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WarehouseService } from '../../../Services/warehouse-service';
import { IWarehouse } from '../../../ClassesAndInterfaces/IWarehouse';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-op-stock',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './item-op-stock.html',
  styleUrl: './item-op-stock.css',
})
export class ItemOpStock implements OnInit {
  opGroup: FormGroup;
  Arr: FormArray;
  whs: IWarehouse[] = [];
  @Output() OpStockEmitter = new EventEmitter<FormArray>();
  @Input() OpStockInput!: FormArray;

  constructor(private fb: FormBuilder, private ws: WarehouseService, private cdr: ChangeDetectorRef)
  {
    this.opGroup = fb.group({
      'RecId': [-1],
      'IdNo': [0],
      'WhId': [0],
      'WhName': [''],
      'Qty': [0],
      'Rate': [0],
      'Amount': [0]
    });

    this.Arr = fb.array([]);
  } // constructor...

  ngOnInit(): void {
    this.Arr = this.OpStockInput;
    this.OpStockEmitter.emit(this.Arr);

    this.ws.GetWarehouses().subscribe(res => {
      this.whs = res;
      this.cdr.detectChanges();
    })
  }

  get getDetails()
  {
    return this.Arr as FormArray;
  }

  calc()
  {
    const qty = this.opGroup.get('Qty')?.value;
    const rate = this.opGroup.get('Rate')?.value;
    const amount = (qty * rate);
    this.opGroup.get('Amount')?.patchValue(amount);
  }

  async Add()
  {
    const recId = this.opGroup.get('RecId')?.value;
    const whId = this.opGroup.get('WhId')?.value;
    const whName = (await firstValueFrom(this.ws.GetWarehouseById(whId))).WhName;
    const qty = this.opGroup.get('Qty')?.value;
    const rate = this.opGroup.get('Rate')?.value;
    const amount = this.opGroup.get('Amount')?.value;

    let b = true;
    this.Arr.controls.forEach((m,i) => {
      if(recId == -1 && m.get('WhId')?.value == whId)
      {
        b = false;
        return;
      }

      if(recId >= 0 && m.get('WhId')?.value == whId && recId != i)
      {
        b = false;
        return;
      }
    });

    if(!b)
    {
      alert("Duplicate Warehouse not allowed.");
      return;
    }

    if(whId == null || whId == 0)
    {
      alert('Warehouse cannot be blank.');
      return;
    }

    if(qty <= 0)
    {
      alert('Invalid Opening Stock. Please enter a valid value.');
      return;
    }

    const initialGroup = this.fb.group({
      'RecId': [recId],
      'IdNo': [this.opGroup.get('IdNo')?.value],
      'WhId': [whId],
      'WhName': [whName],
      'Qty': [qty],
      'Rate': [rate],
      'Amount': [amount]
    });

    if(recId == -1)
    {
      this.Arr.push(initialGroup);
    }
    else
    {
      this.Arr.setControl(recId, initialGroup);
    }

    this.OpStockEmitter.emit(this.Arr);
    this.Reset();
  } // Add...

  Reset()
  {
    this.opGroup.patchValue({
      'RecId': -1,
      'IdNo': 0,
      'WhId': 0,
      'WhName': '',
      'Qty': 0,
      'Rate': 0,
      'Amount': 0
    });
  } // Reset...

  async Edit(num: number, d: AbstractControl)
  {
    let gg = d as FormGroup;
    const whId = gg.get('WhId')?.value;
    const whName = await (await firstValueFrom(this.ws.GetWarehouses())).find(x => x.WhId == whId)?.WhName;

    this.opGroup.patchValue({
      'RecId': num,
      'IdNo': gg.get('IdNo')?.value,
      'WhId': whId,
      'WhName': whName,
      'Qty': gg.get('Qty')?.value,
      'Rate': gg.get('Rate')?.value,
      'Amount': gg.get('Amount')?.value
    });
  } // Edit...
} // class...
