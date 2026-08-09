import type { ItemCategory } from '@items/types/ItemCategory.js';
import type { ItemType } from '@items/types/ItemType.js';

export class ResponseItemDto {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly category: ItemCategory,
    private readonly type: ItemType,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCategory(): ItemCategory {
    return this.category;
  }

  public getType(): ItemType {
    return this.type;
  }
}
