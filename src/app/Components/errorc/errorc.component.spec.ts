import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorcComponent } from './errorc.component';

describe('ErrorcComponent', () => {
  let component: ErrorcComponent;
  let fixture: ComponentFixture<ErrorcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
