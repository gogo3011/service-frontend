import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairShopsComponent } from './repair-shops.component';

describe('RepairShopsComponent', () => {
  let component: RepairShopsComponent;
  let fixture: ComponentFixture<RepairShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairShopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
