import { ChangeDetectionStrategy, Component, Inject, Type } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ObjectSampleDialogData } from 'src/app/modules/samples/object-sample/object-sample.dialog-data';

@Component({
  template: `
    <dc-object-sample
        [objectPassportId]="data.objectPassportId"
        [objectSample]="data.objectSample"
        (objectSampleChanged)="dialogRef.close($event)"
        (cancel)="dialogRef.close(null)"
    ></dc-object-sample>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectSampleDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ObjectSampleDialogData,
    public dialogRef: MatDialogRef<Type<any>>,
  ) {
  }
}
