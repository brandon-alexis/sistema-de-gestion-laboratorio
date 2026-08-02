export class Student {
  constructor(
    private readonly id: string,
    private fullname: string,
    private documentNumber: string,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getFullname(): string {
    return this.fullname;
  }

  public setFullname(fullname: string): void {
    this.fullname = fullname;
  }

  public getDocumentNumber(): string {
    return this.documentNumber;
  }

  public setDocumentNumber(documentNumber: string): void {
    this.documentNumber = documentNumber;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
