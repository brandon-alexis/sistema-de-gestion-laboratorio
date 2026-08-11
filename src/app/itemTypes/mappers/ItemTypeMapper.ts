import type { CreateItemTypeDto } from '@itemTypes/dtos/CreateItemTypeDto.js';
import { ResponseItemTypeDto } from '@itemTypes/dtos/ResponseItemTypeDto.js';
import type { ItemTypeEntity } from '@itemTypes/entities/ItemTypeEntity.js';
import { ItemType } from '@itemTypes/models/ItemType.js';

export class ItemTypeMapper {
  public static fromCreateDtoToItemType(dto: CreateItemTypeDto): ItemType {
    return new ItemType(
      crypto.randomUUID(),
      dto.getName(),
      new Date(),
      new Date(),
    );
  }

  public static fromItemTypeToResponseDto(
    itemType: ItemType,
  ): ResponseItemTypeDto {
    return new ResponseItemTypeDto(itemType.getId(), itemType.getName());
  }

  public static fromItemTypeToItemTypeEntity(
    itemType: ItemType,
  ): ItemTypeEntity {
    return {
      id: itemType.getId(),
      name: itemType.getName(),
      createdAt: itemType.getCreatedAt(),
      updatedAt: itemType.getUpdatedAt(),
    };
  }

  public static fromItemTypeEntityToItemType(entity: ItemTypeEntity): ItemType {
    return new ItemType(
      entity.id,
      entity.name,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
