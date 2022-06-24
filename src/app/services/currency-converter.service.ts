import { APIService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Converter } from '../models/converter.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService extends APIService {

  constructor(private http: HttpClient) {
    super();
  }


  convert(converter:Converter) {
    return this.http.get(this.api() + `convert?to=${converter.to}&from=${converter.from}&amount=${converter.amount}`, this.requestOptions());
  }

  getSymbols(){
    return this.http.get(this.api() + `symbols`, this.requestOptions());
  }

}
