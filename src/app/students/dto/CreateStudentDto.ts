export class CreateStudentDto {
  constructor(
    private readonly fullname: string,
    private readonly documentNumber: string,
  ) {}

  public getFullname(): string {
    return this.fullname;
  }

  public getDocumentNumber(): string {
    return this.documentNumber;
  }
}
