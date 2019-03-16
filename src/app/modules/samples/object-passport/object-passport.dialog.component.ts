import { ChangeDetectionStrategy, Component, Inject, Type } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ObjectPassportDialogData } from 'src/app/modules/samples/object-passport/object-passport.dialog-data';

@Component({
  template: `
    <dc-object-passport
        [objectPassport]="data.objectPassport"
        (objectPassportChanged)="dialogRef.close($event)"
        (cancel)="dialogRef.close(null)"
    ></dc-object-passport>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectPassportDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ObjectPassportDialogData,
    public dialogRef: MatDialogRef<Type<any>>,
  ) {
  }
}
