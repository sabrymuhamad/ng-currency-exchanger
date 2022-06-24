import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  api(): string {
    return 'https://api.apilayer.com/fixer/';
  }

  requestOptions(): { redirect: string, headers: any } {
    const myHeaders = new HttpHeaders()
    .set("apikey", "ZIHmSoaWe950s6aSkKS800Zo9mRGWnqf");

    const options = {
      redirect: 'follow',
      headers: myHeaders
    };

    return options;
  }
}
