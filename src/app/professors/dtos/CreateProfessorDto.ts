export class CreateProfessorDto {
  constructor(private readonly fullname: string) {}

  public getFullname(): string {
    return this.fullname;
  }
}
