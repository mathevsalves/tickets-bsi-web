import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserListComponent } from './register-user-list.component';

describe('RegisterUserListComponent', () => {
  let component: RegisterUserListComponent;
  let fixture: ComponentFixture<RegisterUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
