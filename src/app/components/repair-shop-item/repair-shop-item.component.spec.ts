import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairShopItemComponent } from './repair-shop-item.component';

describe('RepairShopItemComponent', () => {
  let component: RepairShopItemComponent;
  let fixture: ComponentFixture<RepairShopItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairShopItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairShopItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
