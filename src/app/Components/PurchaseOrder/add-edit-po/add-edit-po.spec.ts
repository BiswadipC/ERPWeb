import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPo } from './add-edit-po';

describe('AddEditPo', () => {
  let component: AddEditPo;
  let fixture: ComponentFixture<AddEditPo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
