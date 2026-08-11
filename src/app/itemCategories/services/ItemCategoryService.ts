import type { ItemCategoryRepository } from '@itemCategories/repositories/ItemCategoryRepository.js';
import { ItemCategory } from '@itemCategories/models/ItemCategory.js';
import { ItemCategoryNotFoundException } from '@itemCategories/exceptions/ItemCategoryNotFoundException.js';
import { ItemCategoryAlreadyExistsException } from '@itemCategories/exceptions/ItemCategoryAlreadyExistsException.js';
import type { UpdateItemCategoryDto } from '@itemCategories/dtos/UpdateItemCategoryDto.js';

export class ItemCategoryService {
  constructor(private readonly categoryRepository: ItemCategoryRepository) {}

  public async createCategory(category: ItemCategory): Promise<void> {
    const categories: ItemCategory[] = await this.categoryRepository.findAll();

    const categoryExists: boolean = categories.some(
      (_category) => _category.getName() === category.getName(),
    );

    if (categoryExists) {
      throw new ItemCategoryAlreadyExistsException();
    }

    await this.categoryRepository.create(category);
  }

  public async getAllCategories(): Promise<ItemCategory[]> {
    return this.categoryRepository.findAll();
  }

  public async getCategoryById(id: string): Promise<ItemCategory> {
    const foundCategory: ItemCategory | null =
      await this.categoryRepository.findById(id);

    if (!foundCategory) {
      throw new ItemCategoryNotFoundException();
    }

    return foundCategory;
  }

  public async updateCategory(
    id: string,
    dto: UpdateItemCategoryDto,
  ): Promise<void> {
    const foundCategory: ItemCategory | null =
      await this.categoryRepository.findById(id);

    if (!foundCategory) {
      throw new ItemCategoryNotFoundException();
    }

    const name = dto.getName();

    if (name !== undefined) {
      const categories: ItemCategory[] =
        await this.categoryRepository.findAll();

      const categoryExists: boolean = categories.some(
        (_category) => _category.getName() === name && _category.getId() !== id,
      );

      if (categoryExists) {
        throw new ItemCategoryAlreadyExistsException();
      }

      foundCategory.setName(name);
    }

    await this.categoryRepository.update(id, foundCategory);
  }

  public async deleteCategory(id: string): Promise<void> {
    const foundCategory: ItemCategory | null =
      await this.categoryRepository.findById(id);

    if (!foundCategory) {
      throw new ItemCategoryNotFoundException();
    }

    await this.categoryRepository.delete(id);
  }
}
