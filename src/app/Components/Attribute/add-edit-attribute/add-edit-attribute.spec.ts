import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAttribute } from './add-edit-attribute';

describe('AddEditAttribute', () => {
  let component: AddEditAttribute;
  let fixture: ComponentFixture<AddEditAttribute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAttribute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAttribute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
