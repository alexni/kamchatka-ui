import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObjectSample } from 'src/app/modules/samples/models/object-sample';
import { ObjectSampleDialogData } from 'src/app/modules/samples/object-sample/object-sample.dialog-data';
import { ObjectSampleDialogComponent } from 'src/app/modules/samples/object-sample/object-sample.dialog.component';

@Injectable()
export class ObjectSampleDialogService {

  constructor(private dialog: MatDialog) {
  }

  public openEditor(
    objectPassportId: string,
    objectSample: ObjectSample | null,
  ): Observable<ObjectSample | null> {

    return this.dialog
      .open<ObjectSampleDialogComponent, ObjectSampleDialogData, ObjectSample | null>(ObjectSampleDialogComponent, {
        disableClose: true,
        panelClass: [
          'mat-dialog-no-padding',
        ],
        data: {
          objectPassportId,
          objectSample,
        },
      })
      .afterClosed()
      .pipe(
        map(objectSample => objectSample || null),
      );
  }
}
