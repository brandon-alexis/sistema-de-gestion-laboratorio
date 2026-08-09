import type { Repository } from 'typeorm';

import type { ItemRepository } from '@items/repositories/ItemRepository.js';
import { Item } from '@items/models/Item.js';
import type { ItemEntity } from '@items/entities/ItemEntity.js';
import { ItemMapper } from '@items/mappers/ItemMapper.js';

export class TypeOrmItemRepository implements ItemRepository {
  constructor(private readonly repository: Repository<ItemEntity>) {}

  async create(item: Item): Promise<void> {
    const _item = ItemMapper.fromItemToItemEntity(item);

    await this.repository.save(_item);
  }

  async findAll(): Promise<Item[]> {
    const items = await this.repository.find();

    return items.map(ItemMapper.fromItemEntityToItem);
  }

  async findById(id: string): Promise<Item | null> {
    const foundItem = await this.repository.findOneBy({ id });

    if (foundItem == null) return null;

    return ItemMapper.fromItemEntityToItem(foundItem);
  }

  async update(id: string, item: Item): Promise<void> {
    const foundItem = await this.repository.findOneBy({ id });

    if (!foundItem) {
      return;
    }

    const _item = ItemMapper.fromItemToItemEntity(item);

    await this.repository.save(_item);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
