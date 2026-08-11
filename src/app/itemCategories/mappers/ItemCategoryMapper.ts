import { ItemCategory } from '@itemCategories/models/ItemCategory.js';
import type { ItemCategoryEntity } from '@itemCategories/entities/ItemCategoryEntity.js';
import type { CreateItemCategoryDto } from '@itemCategories/dtos/CreateItemCategoryDto.js';
import { ResponseItemCategoryDto } from '@itemCategories/dtos/ResponseItemCategoryDto.js';

export class ItemCategoryMapper {
  public static fromCategoryToCategoryEntity(
    category: ItemCategory,
  ): ItemCategoryEntity {
    return {
      id: category.getId(),
      name: category.getName(),
      createdAt: category.getCreatedAt(),
      updatedAt: category.getUpdatedAt(),
    };
  }

  public static fromCategoryEntityToCategory(entity: ItemCategoryEntity) {
    return new ItemCategory(
      entity.id,
      entity.name,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  public static fromCreateDtoToCategory(
    dto: CreateItemCategoryDto,
  ): ItemCategory {
    return new ItemCategory(
      crypto.randomUUID(),
      dto.getName(),
      new Date(),
      new Date(),
    );
  }

  public static fromCategoryToResponseDto(
    category: ItemCategory,
  ): ResponseItemCategoryDto {
    return new ResponseItemCategoryDto(category.getId(), category.getName());
  }
}
