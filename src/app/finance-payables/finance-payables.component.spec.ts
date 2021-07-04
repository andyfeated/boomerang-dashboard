import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePayablesComponent } from './finance-payables.component';

describe('FinancePayablesComponent', () => {
  let component: FinancePayablesComponent;
  let fixture: ComponentFixture<FinancePayablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancePayablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancePayablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
