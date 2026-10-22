import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItems } from './view-items';

describe('ViewItems', () => {
  let component: ViewItems;
  let fixture: ComponentFixture<ViewItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
