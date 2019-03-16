import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteReportsModule } from 'src/app/route-modules/reports/route.reports.module';
import { SamplesComponent } from 'src/app/route-modules/reports/samples/samples.component';

export const routes: Routes = [
  {
    path: 'samples',
    component: SamplesComponent,
  },
  { path: '**', redirectTo: 'samples' },
];

@NgModule({
  imports: [
    RouteReportsModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteReportsRoutingModule {
}
