export class Professor {
  constructor(
    private readonly id: string,
    private fullname: string,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {
    this.id = id;
    this.fullname = fullname;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getFullname(): string {
    return this.fullname;
  }

  public setFullname(fullname: string): void {
    this.fullname = fullname;
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
