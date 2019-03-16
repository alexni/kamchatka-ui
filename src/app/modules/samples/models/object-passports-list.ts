import { ObjectPassport } from 'src/app/modules/samples/models/object-passport';
import { TableData } from 'src/app/ui/table-with-paginator/table-data.interface';

export class ObjectPassportsList implements TableData<ObjectPassport>{
  constructor(
    public items: ObjectPassport[],
    public total: number,
  ) {
  }

}
