import type { Item } from '@items/models/Item.js';

export interface ItemRepository {
  create(item: Item): Promise<void>;
  update(id: string, item: Item): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Item | null>;
  findAll(): Promise<Item[]>;
}
