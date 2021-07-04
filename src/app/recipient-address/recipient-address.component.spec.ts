import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientAddressComponent } from './recipient-address.component';

describe('RecipientAddressComponent', () => {
  let component: RecipientAddressComponent;
  let fixture: ComponentFixture<RecipientAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipientAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
