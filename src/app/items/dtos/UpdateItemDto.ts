import type { ItemCategory } from '@items/types/ItemCategory.js';
import type { ItemType } from '@items/types/ItemType.js';

export class UpdateItemDto {
  constructor(
    private readonly name?: string,
    private readonly category?: ItemCategory,
    private readonly type?: ItemType,
  ) {}

  public getName(): string | undefined {
    return this.name;
  }

  public getCategory(): ItemCategory | undefined {
    return this.category;
  }

  public getType(): ItemType | undefined {
    return this.type;
  }
}
