export class ResponseStudentDto {
  constructor(
    private readonly id: string,
    private readonly fullname: string,
    private readonly documentNumber: string,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getFullname(): string {
    return this.fullname;
  }

  public getDocumentNumber(): string {
    return this.documentNumber;
  }
}
