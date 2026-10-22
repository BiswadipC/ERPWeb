import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUnits } from './add-edit-units';

describe('AddEditUnits', () => {
  let component: AddEditUnits;
  let fixture: ComponentFixture<AddEditUnits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditUnits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditUnits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
