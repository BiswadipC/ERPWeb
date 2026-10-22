import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWh } from './add-edit-wh';

describe('AddEditWh', () => {
  let component: AddEditWh;
  let fixture: ComponentFixture<AddEditWh>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditWh]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditWh);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
