import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObjectPassport } from 'src/app/modules/samples/models/object-passport';
import { ObjectPassportDialogData } from 'src/app/modules/samples/object-passport/object-passport.dialog-data';
import { ObjectPassportDialogComponent } from 'src/app/modules/samples/object-passport/object-passport.dialog.component';

@Injectable()
export class ObjectPassportDialogService {

  constructor(private dialog: MatDialog) {
  }

  public openEditor(
    objectPassport: ObjectPassport | null,
  ): Observable<ObjectPassport | null> {

    return this.dialog
      .open<ObjectPassportDialogComponent, ObjectPassportDialogData, ObjectPassport | null>(ObjectPassportDialogComponent, {
        disableClose: true,
        panelClass: [
          'mat-dialog-no-padding',
        ],
        data: {
          objectPassport,
        },
      })
      .afterClosed()
      .pipe(
        map(objectPassport => objectPassport || null),
      );
  }
}
