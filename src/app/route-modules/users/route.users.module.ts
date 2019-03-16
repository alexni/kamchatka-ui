import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersModule } from 'src/app/modules/users/users.module';
import { SignInComponent } from 'src/app/route-modules/users/sign-in/sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    UsersModule,
  ],

  declarations: [
    SignInComponent,
  ],
})
export class RouteUsersModule {
}
