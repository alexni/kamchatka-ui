import { ObjectSample } from 'src/app/modules/samples/models/object-sample';
import { TableData } from 'src/app/ui/table-with-paginator/table-data.interface';

export class ObjectSamplesList implements TableData<ObjectSample> {
  constructor(
    public items: ObjectSample[],
    public total: number,
  ) {
  }

}
