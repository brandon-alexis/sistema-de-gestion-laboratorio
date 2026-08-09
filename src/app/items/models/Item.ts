import type { ItemCategory } from '../types/ItemCategory.js';
import type { ItemType } from '../types/ItemType.js';

export class Item {
  constructor(
    private readonly id: string,
    private name: string,
    private category: ItemCategory,
    private type: ItemType,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getCategory(): ItemCategory {
    return this.category;
  }

  public setCategory(category: ItemCategory): void {
    this.category = category;
  }

  public getType(): ItemType {
    return this.type;
  }

  public setType(type: ItemType): void {
    this.type = type;
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
