import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceReceivablesComponent } from './finance-receivables.component';

describe('FinanceReceivablesComponent', () => {
  let component: FinanceReceivablesComponent;
  let fixture: ComponentFixture<FinanceReceivablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceReceivablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceReceivablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
