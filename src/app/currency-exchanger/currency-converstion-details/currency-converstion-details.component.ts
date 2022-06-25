import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Converter } from 'src/app/models/converter.model';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';
import { ConverterComponent } from '../converter/converter.component';

@Component({
  selector: 'app-currency-converstion-details',
  templateUrl: './currency-converstion-details.component.html',
  styleUrls: ['./currency-converstion-details.component.scss']
})
export class CurrencyConverstionDetailsComponent implements OnInit {
  @ViewChild('converterSelector') converterSelector: ConverterComponent;
  currentConverter: Converter;
  converterId: number;
  constructor(private _cc: CurrencyConverterService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.converterId = +this.route.snapshot.params['id'];
    this._cc.getConvHistory.subscribe((res: any[]) => {
      this.currentConverter = res.find(c => c.id === this.converterId);
    });
    setTimeout(() => {
      this.converterSelector.setPredefinedCoverter(this.currentConverter);
    }, 0);
  }

}
