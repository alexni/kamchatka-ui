import { ObjectSample } from 'src/app/modules/samples/models/object-sample';

export interface ObjectSampleDialogData {
  objectPassportId: string;
  objectSample: ObjectSample | null;
}
