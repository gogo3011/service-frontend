import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditRepairShopComponent } from './create-edit-repair-shop.component';

describe('CreateEditRepairShopComponent', () => {
  let component: CreateEditRepairShopComponent;
  let fixture: ComponentFixture<CreateEditRepairShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditRepairShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditRepairShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
