import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUsersModule } from 'src/app/route-modules/users/route.users.module';
import { SignInComponent } from 'src/app/route-modules/users/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
];

@NgModule({
  imports: [
    RouteUsersModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteUsersRoutingModule {
}
