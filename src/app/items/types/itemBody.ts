import type { ItemCategory } from '@items/types/ItemCategory.js';
import type { ItemType } from '@items/types/ItemType.js';

export interface ItemBody {
  name: string;
  category: ItemCategory;
  type: ItemType;
}
