import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Converter, ConverterSymbol } from 'src/app/models/converter.model';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  @Output() onChangeCriteria: EventEmitter<Converter> = new EventEmitter();
  converter: Converter = new Converter();
  btnLoading: boolean;
  symbolsLoading: boolean;
  symbols: ConverterSymbol[] = [
    {
      "name": "USD",
      "label": "United States Dollar"
    }, {
      "name": "EUR",
      "label": "Euro"
    }, {
      "name": "EGP",
      "label": "Egyptian Pound"
    }
  ];
  onPredefinedDetails: boolean;
  title: string;
  constructor(private _cc: CurrencyConverterService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // defaults 
    this.converter.from = 'EUR';
    this.converter.to = 'USD';
    this.converter.amount = 1;
    
    this.route.queryParams.subscribe((params: any) => {
      if (Object.keys(params).length > 0) {
        this.converter.to = params.to.toUpperCase();
        this.converter.from = params.from.toUpperCase();
        this.converter.amount = params.amount;
      }
    });
    // this.getSymbols();
  }



  setPredefinedCoverter(converter: Converter) {
    this.onPredefinedDetails = true;
    this.title = converter.from + ' - ' + converter.fromCurrencyFullName;
    this.converter = { ...converter };
  }


  convert(converterForm: NgForm) {
    this.btnLoading = true;
    if (converterForm.form.status === 'VALID') {
      this.symbols.forEach((s) => {
        if (s.name === this.converter.to) { this.converter.toCurrencyFullName = s.label }
        if (s.name === this.converter.from) { this.converter.fromCurrencyFullName = s.label }
      });
      //////////////////////////////////////////
      this.converter.result = 500;
      this.converter.rate = 1.05;
      this.converter.timestamp = Date.now() / 1000;
      this.converter.id = Date.now();
      localStorage.setItem('lastConverter', JSON.stringify(this.converter));
      this.onChangeCriteria.emit({ ...this.converter });
      this._cc.updateConvHistory({ ...this.converter });
      ////////////////////////////////////////////////////////
      return
      this._cc.convert(this.converter).subscribe({
        next: (res: any) => {
          this.btnLoading = false;
          if (res.success) {
            this.converter.result = res.result;
            this.converter.rate = res.info.rate;
            this.converter.timestamp = res.info.timestamp;
            this.converter.id = Date.now();
            this._cc.updateConvHistory({ ...this.converter });
          }
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
