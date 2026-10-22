import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParty } from './view-party';

describe('ViewParty', () => {
  let component: ViewParty;
  let fixture: ComponentFixture<ViewParty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewParty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewParty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
