export class UpdateStudentDto {
  constructor(
    private readonly fullname?: string,
    private readonly documentNumber?: string,
  ) {}

  public getFullname(): string | undefined {
    return this.fullname;
  }

  public getDocumentNumber(): string | undefined {
    return this.documentNumber;
  }
}
