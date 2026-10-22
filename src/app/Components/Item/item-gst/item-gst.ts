import { Component, EventEmitter, OnDestroy, OnInit,Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../../../Services/item-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-gst',
  imports: [ReactiveFormsModule],
  templateUrl: './item-gst.html',
  styleUrl: './item-gst.css',
})
export class ItemGST implements OnInit, OnDestroy {
  gstGroup: FormGroup;
  private sub?: Subscription;

  constructor(private fb: FormBuilder, private is: ItemService)
  {
    this.gstGroup = fb.group({
      'IdNo': [0],
      'PurCgst': [0],
      'PurSgst': [0],
      'PurIgst': [0],
      'SalCgst': [0],
      'SalSgst': [0],
      'SalIgst': [0]
    });
  } // constructor...

  @Input() GstInput!: FormGroup;
  @Output() WhEvent = new EventEmitter<FormGroup>();

  ngOnInit(): void {
    this.WhEvent.emit(this.gstGroup);

    this.sub = this.gstGroup.valueChanges.subscribe(res => {
      this.WhEvent.emit(this.gstGroup);
    });
  } // ngOnInit...

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  } // ngOnDestroy...

  CalcPurGst()
  {
    const cgst = this.gstGroup.get('PurCgst')?.value;
    const sgst = this.gstGroup.get('PurSgst')?.value;
    const igst = (Number(cgst) + Number(sgst));
    this.gstGroup.get('PurIgst')?.patchValue(igst);
  } // CalcPurGst...

  CalcSalGst()
  {
    const cgst = this.gstGroup.get('SalCgst')?.value;
    const sgst = this.gstGroup.get('SalSgst')?.value;
    const igst = (Number(cgst) + Number(sgst));
    this.gstGroup.get('SalIgst')?.patchValue(igst);
  } // CalcSalGst...
}
