import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPo } from './view-po';

describe('ViewPo', () => {
  let component: ViewPo;
  let fixture: ComponentFixture<ViewPo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
