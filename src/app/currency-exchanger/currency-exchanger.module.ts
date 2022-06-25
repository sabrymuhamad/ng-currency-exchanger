import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyExchangerRoutingModule } from './currency-exchanger-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ConverterComponent } from './converter/converter.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule } from '@angular/forms';
import { ConverstionCardComponent } from './converstion-card/converstion-card.component';
import { CurrencyConverstionDetailsComponent } from './currency-converstion-details/currency-converstion-details.component';


@NgModule({
  declarations: [
    LandingComponent,
    ConverterComponent,
    ConverstionCardComponent,
    CurrencyConverstionDetailsComponent
  ],
  imports: [
    CommonModule,
    CurrencyExchangerRoutingModule,
    MaterialsModule,
    FormsModule
  ]
})
export class CurrencyExchangerModule { }
