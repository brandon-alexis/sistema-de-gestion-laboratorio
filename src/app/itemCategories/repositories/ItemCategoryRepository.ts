import type { ItemCategory } from '@itemCategories/models/ItemCategory.js';
import type { BaseRepository } from '@shared/repository/BaseRepository.js';

export interface ItemCategoryRepository extends BaseRepository<
  string,
  ItemCategory
> {}
