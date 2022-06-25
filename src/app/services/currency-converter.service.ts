import { APIService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Converter } from '../models/converter.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService extends APIService {
  convHistoryArr: Converter[] = [
    {
      id: 1,
      amount: 100,
      from: 'EUR',
      fromCurrencyFullName: 'Euro',
      to: 'USD',
      toCurrencyFullName: 'United States Dollar',
      result: 5.3254,
      timestamp: 1656087423,
      rate: 0.053254
    },
    {
      id: 2,
      amount: 100,
      from: 'EGP',
      fromCurrencyFullName: 'Egyptian Pound',
      to: 'USD',
      toCurrencyFullName: 'United States Dollar',
      result: 105.4975,
      timestamp: 1656079264,
      rate: 1.054975
    }
  ];
  private converstionHistory = new BehaviorSubject<Converter[]>(this.convHistoryArr);
  getConvHistory = this.converstionHistory.asObservable();
  updateConvHistory(convHistory: Converter) {
    this.convHistoryArr.unshift(convHistory)
    this.converstionHistory.next(this.convHistoryArr);
  }

  constructor(private http: HttpClient) {
    super();
  }


  convert(converter: Converter) {
    return this.http.get(this.api() + `convert?to=${converter.to}&from=${converter.from}&amount=${converter.amount}`, this.requestOptions());
  }

  getSymbols() {
    return this.http.get(this.api() + `symbols`, this.requestOptions());
  }

}
