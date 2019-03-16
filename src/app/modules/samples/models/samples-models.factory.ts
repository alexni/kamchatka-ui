import { Injectable } from '@angular/core';
import { ObjectPassportJson } from 'src/app/modules/samples/json/object-passport.json-interface';
import { ObjectPassportsListJson } from 'src/app/modules/samples/json/object-passports-list.json-interface';
import { ObjectSamplesListJson } from 'src/app/modules/samples/json/object-samples-list.json-interface';
import { SampleReportItemJson } from 'src/app/modules/samples/json/sample-report-item.json-interface';
import { SamplesReportJson } from 'src/app/modules/samples/json/samples-report.json-interface';
import { ObjectPassport } from 'src/app/modules/samples/models/object-passport';
import { ObjectPassportsList } from 'src/app/modules/samples/models/object-passports-list';
import { ObjectSample } from 'src/app/modules/samples/models/object-sample';
import { ObjectSamplesList } from 'src/app/modules/samples/models/object-samples-list';
import { SampleReportItem } from 'src/app/modules/samples/models/sample-report-item';
import { SamplesReport } from 'src/app/modules/samples/models/samples-report';

@Injectable({
  providedIn: 'root',
})
export class SamplesModelsFactory {

  public createObjectPassport(
    id: string,
    code: string | null,
    name: string | null,
    commander: string | null,
    deputy: string | null,
    paramedic: string | null,
    phone: string | null,
  ): ObjectPassport {
    return new ObjectPassport(id, code, name, commander, deputy, paramedic, phone);
  }

  public createObjectPassportFromJson(json: ObjectPassportJson): ObjectPassport {
    return this.createObjectPassport(
      json.id,
      json.code || null,
      json.name || null,
      json.commander || null,
      json.deputy || null,
      json.paramedic || null,
      json.phone || null,
    );
  }

  public createObjectPassportsListFromJson(json: ObjectPassportsListJson): ObjectPassportsList {
    return new ObjectPassportsList(
      json.items.map(itemJson => this.createObjectPassportFromJson(itemJson)),
      json.total,
    );
  }

  public createObjectSample(
    id: string,
    objectPassportId: string,
    code: string | null,
    name: string | null,
    dateTimeOfReceipt: string | null,
    dateTimeOfSampling: string | null,
    target: string | null,
    place: string | null,
    value: string | null,
  ): ObjectSample {
    return new ObjectSample(id, objectPassportId, code, name, dateTimeOfReceipt, dateTimeOfSampling, target, place, value);
  }

  public createObjectSampleFromJson(json: ObjectSampleJson): ObjectSample {
    return this.createObjectSample(
      json.id,
      json.object_passport_id,
      json.code || null,
      json.name || null,
      json.date_time_of_receipt || null,
      json.date_time_of_sampling || null,
      json.target || null,
      json.place || null,
      json.value || null,
    );
  }

  public createObjectSamplesListFromJson(json: ObjectSamplesListJson): ObjectSamplesList {
    return new ObjectSamplesList(
      json.items.map(itemJson => this.createObjectSampleFromJson(itemJson)),
      json.total,
    );
  }

  public creteSampleReportItemFromJson(json: SampleReportItemJson): SampleReportItem {
    return new SampleReportItem(
      json.object_code,
      json.object_name,
      json.object_place,
      json.dates,
    );
  }

  public createSamplesReportFromJson(json: SamplesReportJson): SamplesReport {
    return new SamplesReport(
      json.items.map(itemJson => this.creteSampleReportItemFromJson(itemJson)),
    );
  }

}
