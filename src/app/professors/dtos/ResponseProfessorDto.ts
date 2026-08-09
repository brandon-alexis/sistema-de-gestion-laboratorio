export class ResponseProfessorDto {
  constructor(
    private readonly id: string,
    private readonly fullname: string,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getFullname(): string {
    return this.fullname;
  }
}
