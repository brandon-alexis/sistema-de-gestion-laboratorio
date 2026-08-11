import type { Repository } from 'typeorm';

import { ItemTypeMapper } from '@itemTypes/mappers/ItemTypeMapper.js';
import type { ItemType } from '@itemTypes/models/ItemType.js';
import type { ItemTypeEntity } from '@itemTypes/entities/ItemTypeEntity.js';
import type { ItemTypeRepository } from '@itemTypes/repositories/ItemTypeRepository.js';

export class TypeOrmItemTypeRepository implements ItemTypeRepository {
  constructor(private readonly repository: Repository<ItemTypeEntity>) {}

  async create(itemType: ItemType): Promise<void> {
    const _itemType = ItemTypeMapper.fromItemTypeToItemTypeEntity(itemType);

    await this.repository.save(_itemType);
  }

  async findAll(): Promise<ItemType[]> {
    const itemTypes = await this.repository.find();

    return itemTypes.map(ItemTypeMapper.fromItemTypeEntityToItemType);
  }

  async findById(id: string): Promise<ItemType | null> {
    const foundItemType = await this.repository.findOneBy({ id });

    if (foundItemType == null) return null;

    return ItemTypeMapper.fromItemTypeEntityToItemType(foundItemType);
  }

  async update(id: string, itemType: ItemType): Promise<void> {
    const foundItemType = await this.repository.findOneBy({ id });

    if (!foundItemType) {
      return;
    }

    const _itemType = ItemTypeMapper.fromItemTypeToItemTypeEntity(itemType);

    await this.repository.save(_itemType);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
