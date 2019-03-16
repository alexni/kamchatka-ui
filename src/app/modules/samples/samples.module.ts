import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ObjectPassportComponent } from 'src/app/modules/samples/object-passport/object-passport.component';
import { ObjectPassportDialogComponent } from 'src/app/modules/samples/object-passport/object-passport.dialog.component';
import { ObjectPassportDialogService } from 'src/app/modules/samples/object-passport/object-passport.dialog.service';
import { ObjectPassportsComponent } from 'src/app/modules/samples/object-passports/object-passports.component';
import { ObjectSampleComponent } from 'src/app/modules/samples/object-sample/object-sample.component';
import { ObjectSampleDialogComponent } from 'src/app/modules/samples/object-sample/object-sample.dialog.component';
import { ObjectSampleDialogService } from 'src/app/modules/samples/object-sample/object-sample.dialog.service';
import { ObjectSamplesComponent } from 'src/app/modules/samples/object-samples/object-samples.component';
import { SamplesReportComponent } from 'src/app/modules/samples/samples-report/samples-report.component';
import { SamplesService } from 'src/app/modules/samples/samples.service';
import { DateTimePickerControlModule } from 'src/app/ui/date-time-picker-control/date-time-picker-control.module';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';
import { TableWithPaginatorModule } from 'src/app/ui/table-with-paginator/table-with-paginator.module';
import { TableModule } from 'src/app/ui/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    TableWithPaginatorModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    LoaderWithBackdropModule,
    MatDialogModule,
    DateTimePickerControlModule,
    TableModule,
  ],

  declarations: [
    ObjectPassportsComponent,
    ObjectPassportComponent,
    ObjectPassportDialogComponent,
    ObjectSamplesComponent,
    ObjectSampleComponent,
    ObjectSampleDialogComponent,
    SamplesReportComponent,
  ],

  providers: [
    SamplesService,
    ObjectPassportDialogService,
    ObjectSampleDialogService,
  ],

  entryComponents: [
    ObjectPassportDialogComponent,
    ObjectSampleDialogComponent,
  ],

  exports: [
    ObjectPassportsComponent,
    ObjectPassportComponent,
    ObjectSamplesComponent,
    ObjectSampleComponent,
    SamplesReportComponent,
  ],
})
export class SamplesModule {
}
