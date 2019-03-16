import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ObjectPassportDialogService } from 'src/app/modules/samples/object-passport/object-passport.dialog.service';
import { ObjectPassportsComponent } from 'src/app/modules/samples/object-passports/object-passports.component';
import { TitleService } from 'src/app/ui/common/services/title.service';

@Component({
  templateUrl: './route.object-passports.component.html',
  styleUrls: ['./route.object-passports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteObjectPassportsComponent {

  @ViewChild(ObjectPassportsComponent)
  private objectPassportsComponent!: ObjectPassportsComponent;

  constructor(
    private titleService: TitleService,
    private objectPassportDialogService: ObjectPassportDialogService,
  ) {
    this.titleService.setTitle('Паспорта объектов');
  }

  public createObjectPassport(): void {
    this.objectPassportDialogService
      .openEditor(null)
      .pipe(
        filter(objectPassport => !!objectPassport),
      )
      .subscribe(() => this.objectPassportsComponent.reloadList());
  }
}
