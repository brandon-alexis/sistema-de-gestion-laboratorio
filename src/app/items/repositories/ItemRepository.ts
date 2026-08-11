import type { Item } from '@items/models/Item.js';
import type { BaseRepository } from '@shared/repository/BaseRepository.js';

export interface ItemRepository extends BaseRepository<string, Item> {}
