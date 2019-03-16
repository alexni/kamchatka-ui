import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteObjectPassportComponent } from 'src/app/route-modules/samples/object-passport/route.object-passport.component';
import { RouteObjectPassportsComponent } from 'src/app/route-modules/samples/object-passports/route.object-passports.component';
import { RouteSamplesModule } from 'src/app/route-modules/samples/route.samples.module';

export const routes: Routes = [
  {
    path: '',
    component: RouteObjectPassportsComponent,
  },
  {
    path: 'object-passport/:objectPassportId',
    component: RouteObjectPassportComponent,
  },
];

@NgModule({
  imports: [
    RouteSamplesModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteSamplesRoutingModule {
}
