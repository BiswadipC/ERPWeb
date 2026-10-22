import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOpStock } from './item-op-stock';

describe('ItemOpStock', () => {
  let component: ItemOpStock;
  let fixture: ComponentFixture<ItemOpStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemOpStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemOpStock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
