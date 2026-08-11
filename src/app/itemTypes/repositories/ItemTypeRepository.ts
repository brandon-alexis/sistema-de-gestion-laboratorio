import type { BaseRepository } from '@shared/repository/BaseRepository.js';
import type { ItemType } from '@itemTypes/models/ItemType.js';

export interface ItemTypeRepository extends BaseRepository<string, ItemType> {}
