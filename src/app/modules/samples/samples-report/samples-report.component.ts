import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SamplesReport } from 'src/app/modules/samples/models/samples-report';
import { SamplesReportService } from 'src/app/modules/samples/samples-report/samples-report.service';
import { TableItem } from 'src/app/modules/samples/samples-report/table-item';
import { SamplesService } from 'src/app/modules/samples/samples.service';
import { Column } from 'src/app/ui/table/column';

@Component({
  selector: 'dc-samples-report',
  templateUrl: './samples-report.component.html',
  styleUrls: ['./samples-report.component.scss'],
  providers: [
    SamplesReportService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamplesReportComponent implements OnInit, OnDestroy {

  public columns!: Column[];

  public report: SamplesReport | null = null;

  public items: TableItem[] = [];

  public loading = false;

  public filtersForm!: FormGroup;

  public subscriptions = new Subscription();

  @ViewChild('monthDatesTemplate')
  private monthDatesTemplate!: TemplateRef<any>;

  private loadReportSubscription: Subscription | null = null;

  constructor(
    private samplesService: SamplesService,
    private sampleReportService: SamplesReportService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) {
    this.createFiltersForm();
  }

  public ngOnInit(): void {
    this.columns = [
      new Column('object_code', 'Код объекта'),
      new Column('object_name', 'Имя объекта'),
      new Column('object_place', 'Место сбора'),
      new Column('month1', 'Янв.', this.monthDatesTemplate),
      new Column('month2', 'Фев.', this.monthDatesTemplate),
      new Column('month3', 'Март', this.monthDatesTemplate),
      new Column('month4', 'Апр.', this.monthDatesTemplate),
      new Column('month5', 'Май', this.monthDatesTemplate),
      new Column('month6', 'Июнь.', this.monthDatesTemplate),
      new Column('month7', 'Июль', this.monthDatesTemplate),
      new Column('month8', 'Авг.', this.monthDatesTemplate),
      new Column('month9', 'Сен.', this.monthDatesTemplate),
      new Column('month10', 'Окт..', this.monthDatesTemplate),
      new Column('month11', 'Ноя.', this.monthDatesTemplate),
      new Column('month12', 'Дек.', this.monthDatesTemplate),
    ];
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.loadReportsUnsubscribe();
  }

  public loadReport(): void {
    const year = this.filtersForm.get('year')!.value as number;

    this.loadReportsUnsubscribe();
    this.setLoading(true);
    this.loadReportSubscription = this.samplesService
      .loadSamplesReport(year)
      .pipe(
        finalize(() => this.setLoading(false)),
      )
      .subscribe(report => {
        this.report = report;
        this.items = this.sampleReportService.reportItemsToTableItems(report.items);
        this.changeDetectorRef.markForCheck();
      });
  }

  private createFiltersForm(): void {
    this.filtersForm = this.formBuilder.group({
      year: [null, [Validators.required]],
    });

    const refreshViewSubscription = this.filtersForm.valueChanges.subscribe(() => this.changeDetectorRef.markForCheck());
    this.subscriptions.add(refreshViewSubscription);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

  private loadReportsUnsubscribe(): void {
    if (this.loadReportSubscription) {
      this.loadReportSubscription.unsubscribe();
      this.loadReportSubscription = null;
    }
  }

}
