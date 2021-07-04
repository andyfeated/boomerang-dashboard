import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblematicShipmentComponent } from './problematic-shipment.component';

describe('ProblematicShipmentComponent', () => {
  let component: ProblematicShipmentComponent;
  let fixture: ComponentFixture<ProblematicShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblematicShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblematicShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
