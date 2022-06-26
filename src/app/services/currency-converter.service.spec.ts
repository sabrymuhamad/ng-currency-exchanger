import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CurrencyConverterService } from './currency-converter.service';

describe('CurrencyConverterService', () => {
  let service: CurrencyConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(CurrencyConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
