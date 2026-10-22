import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGST } from './item-gst';

describe('ItemGST', () => {
  let component: ItemGST;
  let fixture: ComponentFixture<ItemGST>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemGST]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemGST);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
