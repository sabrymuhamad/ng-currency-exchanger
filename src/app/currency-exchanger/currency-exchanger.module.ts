import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyExchangerRoutingModule } from './currency-exchanger-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ConverterComponent } from './converter/converter.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule } from '@angular/forms';
import { ConverstionCardComponent } from './converstion-card/converstion-card.component';
import { CurrencyConverstionDetailsComponent } from './currency-converstion-details/currency-converstion-details.component';
import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { PipesModule } from '../pipes/pipes.module';
// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

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
    FormsModule,
    FusionChartsModule,
    PipesModule
  ]
})
export class CurrencyExchangerModule { }
