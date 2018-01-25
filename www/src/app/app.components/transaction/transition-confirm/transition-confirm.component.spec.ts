import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionConfirmComponent } from './transition-confirm.component';

describe('TransitionConfirmComponent', () => {
  let component: TransitionConfirmComponent;
  let fixture: ComponentFixture<TransitionConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitionConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
