import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SamplesModule } from 'src/app/modules/samples/samples.module';
import { RouteObjectPassportComponent } from 'src/app/route-modules/samples/object-passport/route.object-passport.component';
import { RouteObjectPassportsComponent } from 'src/app/route-modules/samples/object-passports/route.object-passports.component';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';

@NgModule({
  imports: [
    CommonModule,
    SamplesModule,
    MatButtonModule,
    RouterModule,
    LoaderWithBackdropModule,
  ],

  declarations: [
    RouteObjectPassportsComponent,
    RouteObjectPassportComponent,
  ],
})
export class RouteSamplesModule {
}
