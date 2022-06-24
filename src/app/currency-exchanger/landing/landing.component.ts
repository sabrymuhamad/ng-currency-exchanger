import { Component, OnInit } from '@angular/core';
import { Converter } from 'src/app/models/converter.model';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  history: Converter[] = []
  constructor(private _cc: CurrencyConverterService) { }

  ngOnInit(): void {
    this._cc.getConvHistory.subscribe((h: Converter[]) => {
      this.history = h;
    })
  }

}
