import type { CreateItemDto } from '@items/dtos/CreateItemDto.js';
import { ResponseItemDto } from '@items/dtos/ResponseItemDto.js';
import { ItemEntity } from '@items/entities/ItemEntity.js';
import { Item } from '@items/models/Item.js';
import { ItemCategoryEntity } from '@itemCategories/entities/ItemCategoryEntity.js';
import { ItemTypeEntity } from '@itemTypes/entities/ItemTypeEntity.js';
import { ItemCategory } from '@items/types/ItemCategory.js';
import { ItemType } from '@items/types/ItemType.js';

export class ItemMapper {
  public static fromCreateDtoToItem(dto: CreateItemDto): Item {
    return new Item(
      crypto.randomUUID(),
      dto.getName(),
      dto.getCategory(),
      dto.getType(),
      new Date(),
      new Date(),
    );
  }

  public static fromItemToResponseItemDto(item: Item): ResponseItemDto {
    return new ResponseItemDto(
      item.getId(),
      item.getName(),
      item.getCategory(),
      item.getType(),
    );
  }

  public static fromItemToItemEntity(item: Item): ItemEntity {
    const categoryEntity = new ItemCategoryEntity(
      crypto.randomUUID(),
      item.getCategory(),
      [],
      new Date(),
      new Date(),
    );

    const typeEntity = new ItemTypeEntity(
      crypto.randomUUID(),
      item.getType(),
      [],
      new Date(),
      new Date(),
    );

    return new ItemEntity(
      item.getId(),
      item.getName(),
      categoryEntity,
      typeEntity,
      item.getCreatedAt(),
      item.getUpdatedAt(),
    );
  }

  public static fromItemEntityToItem(entity: ItemEntity): Item {
    return new Item(
      entity.id,
      entity.name,
      (entity.category?.name ?? entity.category) as ItemCategory,
      (entity.type?.name ?? entity.type) as ItemType,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
