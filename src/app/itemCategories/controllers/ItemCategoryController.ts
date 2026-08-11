import type { Request, Response } from 'express';

import type { ItemCategoryService } from '@itemCategories/services/ItemCategoryService.js';
import type { ResponseItemCategoryDto } from '@itemCategories/dtos/ResponseItemCategoryDto.js';
import type { ItemCategory } from '@itemCategories/models/ItemCategory.js';
import type { itemCategoryParams } from '@itemCategories/types/itemCategoryParams.js';
import type { ItemCategoryBody } from '@itemCategories/types/itemCategoryBody.js';
import { CreateItemCategoryDto } from '@itemCategories/dtos/CreateItemCategoryDto.js';
import { ItemCategoryMapper } from '@itemCategories/mappers/ItemCategoryMapper.js';
import { UpdateItemCategoryDto } from '@itemCategories/dtos/UpdateItemCategoryDto.js';

export class ItemCategoryController {
  constructor(private readonly categoryService: ItemCategoryService) {}

  createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name }: ItemCategoryBody = req.body;

      const createDto: CreateItemCategoryDto = new CreateItemCategoryDto(name);

      const category: ItemCategory =
        ItemCategoryMapper.fromCreateDtoToCategory(createDto);

      await this.categoryService.createCategory(category);

      res.status(201).json({ message: 'Categoria creada con exito' });
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getAllCategories = async (
    _: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const categories: ResponseItemCategoryDto[] = (
        await this.categoryService.getAllCategories()
      ).map(ItemCategoryMapper.fromCategoryToResponseDto);

      res.status(200).json(categories);
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getCategoryById = async (
    req: Request<itemCategoryParams>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const category: ItemCategory =
        await this.categoryService.getCategoryById(id);

      const responseDto: ResponseItemCategoryDto =
        ItemCategoryMapper.fromCategoryToResponseDto(category);

      res.status(200).json(responseDto);
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };

  public updateCategory = async (
    req: Request<itemCategoryParams>,
    res: Response,
  ) => {
    try {
      const { name }: ItemCategoryBody = req.body;
      const { id }: itemCategoryParams = req.params;

      const updateDto = new UpdateItemCategoryDto(name);

      await this.categoryService.updateCategory(id, updateDto);

      res.status(200).json({ message: 'Categoria actualizada con exito' });
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };

  public deleteCategory = async (
    req: Request<itemCategoryParams>,
    res: Response,
  ) => {
    try {
      const { id }: itemCategoryParams = req.params;

      await this.categoryService.deleteCategory(id);

      res.status(200).json({ message: 'Categoria eliminada con exito' });
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };
}
