import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { SampleReportItem } from 'src/app/modules/samples/models/sample-report-item';
import { TableItem } from 'src/app/modules/samples/samples-report/table-item';

@Injectable()
export class SamplesReportService {

  public reportItemsToTableItems(reportItems: SampleReportItem[]): TableItem[] {
    return reportItems.map(reportItem => this.reportItemToTableItem(reportItem));
  }

  private reportItemToTableItem(reportItem: SampleReportItem): TableItem {
    const months = new Map<string, string[]>();

    reportItem
      .dates
      .map(date => moment(date))
      .forEach(date => {
        const month = date.format('M');
        const monthDates = [
          ...(
            months.get(month) || []
          ), date.format('YYYY-MM-DD'),
        ];
        months.set(month, monthDates);
      });

    const getDates = (month: number): string[] | null => months.get(String(month)) || null;

    return new TableItem(
      reportItem.objectCode,
      reportItem.objectName,
      reportItem.objectPlace,
      getDates(1),
      getDates(2),
      getDates(3),
      getDates(4),
      getDates(5),
      getDates(6),
      getDates(7),
      getDates(8),
      getDates(9),
      getDates(10),
      getDates(11),
      getDates(12),
    );
  }
}
