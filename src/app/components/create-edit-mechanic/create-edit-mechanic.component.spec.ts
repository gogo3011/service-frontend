import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditMechanicComponent } from './create-edit-mechanic.component';

describe('CreateEditMechanicComponent', () => {
  let component: CreateEditMechanicComponent;
  let fixture: ComponentFixture<CreateEditMechanicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditMechanicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditMechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
