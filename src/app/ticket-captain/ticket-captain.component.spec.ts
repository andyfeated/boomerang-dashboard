import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCaptainComponent } from './ticket-captain.component';

describe('TicketCaptainComponent', () => {
  let component: TicketCaptainComponent;
  let fixture: ComponentFixture<TicketCaptainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketCaptainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCaptainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
