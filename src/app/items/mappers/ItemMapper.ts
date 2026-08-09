import type { CreateItemDto } from '@items/dtos/CreateItemDto.js';
import { ResponseItemDto } from '@items/dtos/ResponseItemDto.js';
import type { ItemEntity } from '@items/entities/ItemEntity.js';
import { Item } from '@items/models/Item.js';
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
    return {
      id: item.getId(),
      name: item.getName(),
      category: item.getCategory(),
      type: item.getType(),
      createdAt: item.getCreatedAt(),
      updatedAt: item.getUpdatedAt(),
    };
  }

  public static fromItemEntityToItem(entity: ItemEntity): Item {
    return new Item(
      entity.id,
      entity.name,
      entity.category as ItemCategory,
      entity.type as ItemType,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
