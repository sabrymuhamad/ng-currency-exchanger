import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Converter } from 'src/app/models/converter.model';
import { CustomDatePipe } from 'src/app/pipes/custom-date.pipe';
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
  dataSource: Object;
  chartConfig: any = {
    width: '100%',
    height: '400',
    type: 'column2d',
    dataFormat: 'json',
  };
  newConverterChecked: boolean;

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  startDate: string;
  endDate: string;
  loading: boolean;
  constructor(private _cc: CurrencyConverterService, private route: ActivatedRoute, private date: CustomDatePipe,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.converterId = +params.id;
      this._cc.getConvHistory.subscribe((res: any[]) => {
        if (!this.newConverterChecked)
          this.currentConverter = res.find(c => c.id === this.converterId);
        if (!this.currentConverter) this.currentConverter = JSON.parse(localStorage.getItem('lastConverter') || '');
        this.getHistoryRates();
      });
      setTimeout(() => {
        this.converterSelector.setPredefinedCoverter(this.currentConverter);
      }, 0);
    })
  }

  criteriaIsChanged(newConverter: Converter) {
    this.newConverterChecked = true;
    this.currentConverter = { ...newConverter };
    this.getHistoryRates();
  }

  getHistoryRates() {
    this.loading = true;
    let startYear = new Date().getFullYear() - 1;
    let endYear = new Date().getFullYear();
    let monthStart = new Date().getMonth() + 1;
    let monthEnd = new Date().getMonth();
    let dayStart = new Date(startYear, monthStart, 0).getDate();
    let dayEnd = new Date(endYear, monthEnd, 0).getDate();

    this.startDate = `${startYear}-${monthStart > 9 ? monthStart : '0' + monthStart}-${dayStart}`;
    this.endDate = `${endYear}-${monthEnd > 9 ? monthEnd : '0' + monthEnd}-${dayEnd}`;
    let data: any = [];

    this.dataSource = {
      chart: {
        "caption": `Rates for the full year`,
        "subCaption": `From [${this.startDate}] to [${this.endDate}]`,
        "xAxisName": "Months",
        "yAxisName": "Rates",
        "numberSuffix": "",
        "theme": "fusion",
      },
      data: data
    };

    this._cc.getTimeseries(this.startDate, this.endDate, this.currentConverter.from, this.currentConverter.to).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res.success) {
          Object.entries(res.rates).forEach(([k, v]: any) => {
            let obj = { label: '', value: '' };
            let lastDay = this.date.transform(k);
            if (lastDay === k) {
              obj.label = this.monthNames[new Date(lastDay).getMonth()];
              obj.value = v[this.currentConverter.to];
              data.push(obj);
            }
          });
        } else {
          this._snackBar.open(res.error.info, 'Close', {
            duration: 3000,
            panelClass: 'error-alert'
          });
        }
      },
      error: (err) => {
        this.loading = false;
        this._snackBar.open('Something went wrong!', 'Close', {
          duration: 3000,
          panelClass: 'error-alert'
        });
      }
    })

  }



}
