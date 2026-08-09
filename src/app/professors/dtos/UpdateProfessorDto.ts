export class UpdateProfessorDto {
  constructor(private readonly fullname?: string) {}

  public getFullname(): string | undefined {
    return this.fullname;
  }
}
