import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'samples', loadChildren: './route-modules/samples/route.samples.routing.module#RouteSamplesRoutingModule' },
  { path: 'users', loadChildren: './route-modules/users/route.users.routing.module#RouteUsersRoutingModule' },
  { path: 'reports', loadChildren: './route-modules/reports/route.reports.routing.module#RouteReportsRoutingModule' },
  { path: '**', redirectTo: 'samples' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],

  exports: [
    RouterModule,
  ],

  providers: [],
})
export class AppRoutingModule {
}
