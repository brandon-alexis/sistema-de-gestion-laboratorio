export class CreateItemCategoryDto {
  constructor(private readonly name: string) {}

  public getName(): string {
    return this.name;
  }
}
