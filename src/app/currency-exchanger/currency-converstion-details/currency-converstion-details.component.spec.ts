import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverstionDetailsComponent } from './currency-converstion-details.component';

describe('CurrencyConverstionDetailsComponent', () => {
  let component: CurrencyConverstionDetailsComponent;
  let fixture: ComponentFixture<CurrencyConverstionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyConverstionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyConverstionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
