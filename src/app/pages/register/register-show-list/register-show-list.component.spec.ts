import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterShowListComponent } from './register-show-list.component';

describe('RegisterShowListComponent', () => {
  let component: RegisterShowListComponent;
  let fixture: ComponentFixture<RegisterShowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterShowListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterShowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
