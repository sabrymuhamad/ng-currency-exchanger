import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyExchangerRoutingModule } from './currency-exchanger-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ConverterComponent } from './converter/converter.component';
import { MaterialsModule } from '../materials/materials.module';


@NgModule({
  declarations: [
    LandingComponent,
    ConverterComponent
  ],
  imports: [
    CommonModule,
    CurrencyExchangerRoutingModule,
    MaterialsModule
  ]
})
export class CurrencyExchangerModule { }
