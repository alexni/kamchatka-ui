import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { ObjectPassport } from 'src/app/modules/samples/models/object-passport';
import { SamplesService } from 'src/app/modules/samples/samples.service';
import { TableDataSource } from 'src/app/ui/table-with-paginator/table-data.source';
import { TableWithPaginatorComponent } from 'src/app/ui/table-with-paginator/table-with-paginator.component';
import { Column } from 'src/app/ui/table/column';

@Component({
  selector: 'dc-object-passports',
  templateUrl: './object-passports.component.html',
  styleUrls: ['./object-passports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectPassportsComponent {

  public readonly COLUMNS = [
    new Column('code', 'Код объекта'),
    new Column('name', 'Наименование'),
    new Column('commander', 'Командир (начальник)'),
    new Column('deputy', 'Зам. по тылу (МТО)'),
    new Column('paramedic', 'НМС (фельдшер)'),
    new Column('phone', 'Контактный телефон'),
  ];

  public paginatorSource!: TableDataSource<ObjectPassport>;

  @ContentChild('actions')
  public actionsTemplate?: TemplateRef<any>;

  @ViewChild(TableWithPaginatorComponent)
  private paginatorListComponent!: TableWithPaginatorComponent<ObjectPassport>;

  constructor(
    private samplesService: SamplesService,
  ) {
    this.createPaginatorSource();
  }

  public reloadList(): void {
    this.paginatorListComponent.reloadList();
  }

  private createPaginatorSource(): void {
    this.paginatorSource = new TableDataSource<ObjectPassport>((offset: number, limit: number) => this
      .samplesService
      .loadObjectPassportsList(offset, limit),
    );
  }

}
