import { ChangeDetectionStrategy, Component, ContentChild, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ObjectSample } from 'src/app/modules/samples/models/object-sample';
import { SamplesService } from 'src/app/modules/samples/samples.service';
import { TableDataSource } from 'src/app/ui/table-with-paginator/table-data.source';
import { TableWithPaginatorComponent } from 'src/app/ui/table-with-paginator/table-with-paginator.component';
import { Column } from 'src/app/ui/table/column';

@Component({
  selector: 'dc-object-samples',
  templateUrl: './object-samples.component.html',
  styleUrls: ['./object-samples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectSamplesComponent implements OnChanges {

  @Input()
  public objectPassportId!: string;

  public readonly COLUMNS = [
    new Column('code', 'Код объекта'),
    new Column('name', 'Наименование'),

    new Column('dateTimeOfReceipt', 'Дата и время приема пробы'),
    new Column('dateTimeOfSampling', 'Дата и время отбора пробы'),

    new Column('target', 'Цель исследования'),
    new Column('place', 'Место сбора'),
    new Column('value', 'Результат'),
  ];

  public paginatorSource!: TableDataSource<ObjectSample>;

  @ContentChild('actions')
  public actionsTemplate?: TemplateRef<any>;

  @ViewChild(TableWithPaginatorComponent)
  private paginatorListComponent!: TableWithPaginatorComponent<ObjectSample>;

  constructor(
    private samplesService: SamplesService,
  ) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.objectPassportId) {
      this.createPaginatorSource(this.objectPassportId);
    }
  }

  public reloadList(): void {
    this.paginatorListComponent.reloadList();
  }

  private createPaginatorSource(objectPassportId: string): void {
    this.paginatorSource = new TableDataSource<ObjectSample>((offset: number, limit: number) => this
      .samplesService
      .loadObjectsSamplesList(objectPassportId, offset, limit),
    );
  }

}
