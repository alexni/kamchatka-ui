import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DateTimePickerControlComponent } from 'src/app/ui/date-time-picker-control/date-time-picker-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatIconModule,
  ],

  declarations: [
    DateTimePickerControlComponent,
  ],

  exports: [
    DateTimePickerControlComponent,
  ],
})
export class DateTimePickerControlModule {
}
