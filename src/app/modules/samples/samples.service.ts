import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { random } from 'lodash';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { ObjectPassportJson } from 'src/app/modules/samples/json/object-passport.json-interface';
import { ObjectPassportsListJson } from 'src/app/modules/samples/json/object-passports-list.json-interface';
import { ObjectSamplesListJson } from 'src/app/modules/samples/json/object-samples-list.json-interface';
import { SampleReportItemJson } from 'src/app/modules/samples/json/sample-report-item.json-interface';
import { SamplesReportJson } from 'src/app/modules/samples/json/samples-report.json-interface';
import { ObjectPassport } from 'src/app/modules/samples/models/object-passport';
import { ObjectPassportsList } from 'src/app/modules/samples/models/object-passports-list';
import { ObjectSample } from 'src/app/modules/samples/models/object-sample';
import { ObjectSamplesList } from 'src/app/modules/samples/models/object-samples-list';
import { SamplesModelsFactory } from 'src/app/modules/samples/models/samples-models.factory';
import { SamplesReport } from 'src/app/modules/samples/models/samples-report';
import { emptyArray } from 'src/app/ui/common/helpers/empty-array.function';

@Injectable()
export class SamplesService {
  constructor(
    private httpClient: HttpClient,
    private samplesModelsFactory: SamplesModelsFactory,
    @Inject(API_URL_GATEWAY) private apiUrl: string,
  ) {
  }

  public loadObjectPassportsList(offset: number, limit: number): Observable<ObjectPassportsList> {
    return of(mockLoadObjectPassportsList(offset, limit))
      .pipe(
        delay(1500),
        map(json => this.samplesModelsFactory.createObjectPassportsListFromJson(json)),
      );
  }

  public loadObjectPassport(id: string): Observable<ObjectPassport> {
    return of(mockObjectPassport(id))
      .pipe(
        delay(1000),
        map(json => this.samplesModelsFactory.createObjectPassportFromJson(json)),
      );
  }

  public createObjectPassport(
    code: string | null,
    name: string | null,
    commander: string | null,
    deputy: string | null,
    paramedic: string | null,
    phone: string | null,
  ): Observable<ObjectPassport> {
    return of({ id: '3434' })
      .pipe(
        delay(1500),
        map(json => this.samplesModelsFactory.createObjectPassport(json.id, code, name, commander, deputy, paramedic, phone)),
      );
  }

  public updateObjectPassport(
    id: string,
    code: string | null,
    name: string | null,
    commander: string | null,
    deputy: string | null,
    paramedic: string | null,
    phone: string | null,
  ): Observable<ObjectPassport> {
    return of(null)
      .pipe(
        delay(1500),
        map(() => this.samplesModelsFactory.createObjectPassport(id, code, name, commander, deputy, paramedic, phone)),
      );
  }

  public loadObjectsSamplesList(objectPassportId: string, offset: number, limit: number): Observable<ObjectSamplesList> {
    return of(mockLoadObjectSamplesList(objectPassportId, offset, limit))
      .pipe(
        delay(1500),
        map(json => this.samplesModelsFactory.createObjectSamplesListFromJson(json)),
      );
  }

  public createObjectSample(
    objectPassportId: string,
    code: string | null,
    name: string | null,
    dateTimeOfReceipt: string | null,
    dateTimeOfSampling: string | null,
    target: string | null,
    place: string | null,
    value: string | null,
  ): Observable<ObjectSample> {
    return of({ id: '3434' })
      .pipe(
        delay(1500),
        map(json => this.samplesModelsFactory
          .createObjectSample(json.id, objectPassportId, code, name, dateTimeOfReceipt, dateTimeOfSampling, target, place, value),
        ),
      );
  }

  public updateObjectSample(
    id: string,
    objectPassportId: string,
    code: string | null,
    name: string | null,
    dateTimeOfReceipt: string | null,
    dateTimeOfSampling: string | null,
    target: string | null,
    place: string | null,
    value: string | null,
  ): Observable<ObjectSample> {
    return of({ id: '3434' })
      .pipe(
        delay(1500),
        map(() => this.samplesModelsFactory
          .createObjectSample(id, objectPassportId, code, name, dateTimeOfReceipt, dateTimeOfSampling, target, place, value),
        ),
      );
  }

  public loadSamplesReport(sampleCoe:string, year: number): Observable<SamplesReport> {
    return of(mockSamplesReport())
      .pipe(
        delay(1000),
        map(json => this.samplesModelsFactory.createSamplesReportFromJson(json)),
      );
  }

}

function mockLoadObjectPassportsList(offset: number, limit: number): ObjectPassportsListJson {
  return {
    items: emptyArray(limit)
      .map((v: null, i: number) => mockObjectPassport(String(i + offset + 1))),
    total: 100,
  };
}

function mockObjectPassport(id: string): ObjectPassportJson {
  return {
    id,
    code: `code-${ id }`,
    name: `name ${ id }`,
    commander: 'commander',
    deputy: 'deputy',
    paramedic: 'paramedic',
    phone: 'phone',
  };
}

function mockLoadObjectSamplesList(objectPassportId: string, offset: number, limit: number): ObjectSamplesListJson {
  return {
    items: emptyArray(limit)
      .map((v: null, i: number) => mockObjectSample(String(i + offset + 1), objectPassportId)),
    total: 100,
  };
}

function mockObjectSample(id: string, objectPassportId: string | null = null): ObjectSampleJson {
  return {
    id,
    object_passport_id: objectPassportId || 'object_passport_id',
    code: `code ${ id }`,
    name: `name ${ id }`,
    date_time_of_receipt: '12-12-2019 11:12:34',
    date_time_of_sampling: '12-12-2019 15:12:34',
    target: `target ${ id }`,
    place: `place ${ id }`,
    value: `value ${ id }`,
  };
}

function mockSampleReportItem(): SampleReportItemJson {
  const dates = [];
  for (let i = 0, l = 12; i < l; i++) {
    if (random(1, 3) === 2) {
      break;
    }

    for (let j = 0, l2 = 3; j < l2; j++) {
      if (random(1, 3) === 2) {
        continue;
      }

      dates.push(`2019-${ i + 1 }-${ 10 + j } 10:12:54`);
    }
  }
  return {
    dates,
    object_code: 'code',
    object_name: 'name',
    object_place: 'place',
  };
}

function mockSamplesReport(): SamplesReportJson {
  return {
    items: emptyArray(100)
      .map(() => mockSampleReportItem()),
  };
}
