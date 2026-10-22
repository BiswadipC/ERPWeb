import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditItems } from './add-edit-items';

describe('AddEditItems', () => {
  let component: AddEditItems;
  let fixture: ComponentFixture<AddEditItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
