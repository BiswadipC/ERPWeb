import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWh } from './view-wh';

describe('ViewWh', () => {
  let component: ViewWh;
  let fixture: ComponentFixture<ViewWh>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewWh]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewWh);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
