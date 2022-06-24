import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Converter, ConverterSymbol } from 'src/app/models/converter.model';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  converter: Converter = new Converter();
  btnLoading: boolean;
  symbolsLoading: boolean;
  symbols: ConverterSymbol[] = [
    // {
    //   "name": "USD",
    //   "label": "United States Dollar"
    // }, {
    //   "name": "EUR",
    //   "label": "Euro"
    // }
  ];
  constructor(private _cc: CurrencyConverterService) { }

  ngOnInit(): void {
    // this.getSymbols();
  }

  convert(converterForm: NgForm) {
    this.btnLoading = true;
    if (converterForm.form.status === 'VALID') {
      this.symbols.forEach((s) => {
        if (s.name === this.converter.to) { this.converter.toCurrencyFullName = s.label }
        if (s.name === this.converter.from) { this.converter.fromCurrencyFullName = s.label }
      });
      // this.converter.result = 500;
      // this.converter.rate = 1.05;
      // this.converter.timestamp = 1656086478;
      // this._cc.updateConvHistory(this.converter);
      // this.converter = new Converter();
      // converterForm.resetForm();

      // return
      this._cc.convert(this.converter).subscribe({
        next: (res: any) => {
          this.btnLoading = false;
          if (res.success) {
            this.converter.result = res.result;
            this.converter.rate = res.info.rate;
            this.converter.timestamp = res.info.timestamp;
            this._cc.updateConvHistory(this.converter);
          }
        },
        complete: () => {
          this.converter = new Converter();
          converterForm.reset();
        },
        error: () => {
          this.btnLoading = false;
        }
      })
    } else {
      this.btnLoading = false;
    }
  }

  getSymbols() {
    this.symbolsLoading = true;

    this._cc.getSymbols().subscribe({
      next: (res: any) => {
        if (res.success) {
          Object.entries(res.symbols).forEach(([key, value]) => {
            let s = new ConverterSymbol();
            s.name = key;
            s.label = value;
            this.symbols.push(s);
          });
          this.symbolsLoading = false;
        }
      }, error: () => {
        this.symbolsLoading = false;
      }
    });
  }

  switchSides() {
    let from = this.converter.from;
    let to = this.converter.to;
    this.converter.from = to;
    this.converter.to = from;
  }

}
