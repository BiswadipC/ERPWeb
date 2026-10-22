import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditParty } from './add-edit-party';

describe('AddEditParty', () => {
  let component: AddEditParty;
  let fixture: ComponentFixture<AddEditParty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditParty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditParty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
