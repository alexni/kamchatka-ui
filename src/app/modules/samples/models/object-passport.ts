export class ObjectPassport {
  constructor(
    public id: string,
    public code: string | null,
    public name: string | null,
    public commander: string | null,
    public deputy: string | null,
    public paramedic: string | null,
    public phone: string | null,
  ) {
  }
}
