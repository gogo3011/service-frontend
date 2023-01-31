import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCarComponent } from './create-edit-car.component';

describe('CreateEditCarComponent', () => {
  let component: CreateEditCarComponent;
  let fixture: ComponentFixture<CreateEditCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
