export class ResponseItemTypeDto {
  constructor(
    private readonly id: string,
    private readonly name: string,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }
}
