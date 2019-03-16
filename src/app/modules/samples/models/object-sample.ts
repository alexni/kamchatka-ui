export class ObjectSample {
  constructor(
    public id: string,
    public objectPassportId: string,
    public code: string | null,
    public name: string | null,
    public dateTimeOfReceipt: string | null,
    public dateTimeOfSampling: string | null,
    public target: string | null,
    public place: string | null,
    public value: string | null,
  ) {
  }
}
