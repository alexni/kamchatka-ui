import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SamplesModule } from 'src/app/modules/samples/samples.module';
import { SamplesComponent } from 'src/app/route-modules/reports/samples/samples.component';

@NgModule({
  imports: [
    CommonModule,
    SamplesModule,
  ],

  declarations: [
    SamplesComponent,
  ],
})
export class RouteReportsModule {
}
