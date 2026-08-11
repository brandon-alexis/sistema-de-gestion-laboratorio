export class UpdateItemCategoryDto {
  constructor(private readonly name?: string) {}

  public getName(): string | undefined {
    return this.name;
  }
}
