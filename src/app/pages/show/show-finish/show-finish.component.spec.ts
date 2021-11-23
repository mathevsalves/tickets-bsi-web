import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowFinishComponent } from './show-finish.component';


describe('ShowFinishComponent', () => {
  let component: ShowFinishComponent;
  let fixture: ComponentFixture<ShowFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFinishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
