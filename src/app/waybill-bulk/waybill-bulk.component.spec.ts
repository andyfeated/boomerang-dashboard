import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaybillBulkComponent } from './waybill-bulk.component';

describe('WaybillBulkComponent', () => {
  let component: WaybillBulkComponent;
  let fixture: ComponentFixture<WaybillBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaybillBulkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
