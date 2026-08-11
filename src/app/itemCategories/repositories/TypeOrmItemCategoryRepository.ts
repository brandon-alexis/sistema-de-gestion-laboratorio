import type { Repository } from 'typeorm';

import { ItemCategoryMapper } from '@itemCategories/mappers/ItemCategoryMapper.js';
import type { ItemCategory } from '@itemCategories/models/ItemCategory.js';
import type { ItemCategoryEntity } from '@itemCategories/entities/ItemCategoryEntity.js';
import type { ItemCategoryRepository } from '@itemCategories/repositories/ItemCategoryRepository.js';

export class TypeOrmItemCategoryRepository implements ItemCategoryRepository {
  constructor(private readonly repository: Repository<ItemCategoryEntity>) {}

  async create(category: ItemCategory): Promise<void> {
    const _category = ItemCategoryMapper.fromCategoryToCategoryEntity(category);

    this.repository.save(_category);
  }

  async findAll(): Promise<ItemCategory[]> {
    const categories = await this.repository.find();

    return categories.map(ItemCategoryMapper.fromCategoryEntityToCategory);
  }

  async findById(id: string): Promise<ItemCategory | null> {
    const foundCategory = await this.repository.findOneBy({ id });

    if (foundCategory == null) return null;

    return ItemCategoryMapper.fromCategoryEntityToCategory(foundCategory);
  }

  async update(id: string, category: ItemCategory): Promise<void> {
    const foundCategory = await this.repository.findOneBy({ id });

    if (!foundCategory) {
      return;
    }

    const _category = ItemCategoryMapper.fromCategoryToCategoryEntity(category);

    await this.repository.save(_category);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
