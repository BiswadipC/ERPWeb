import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttribute } from './view-attribute';

describe('ViewAttribute', () => {
  let component: ViewAttribute;
  let fixture: ComponentFixture<ViewAttribute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAttribute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAttribute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
