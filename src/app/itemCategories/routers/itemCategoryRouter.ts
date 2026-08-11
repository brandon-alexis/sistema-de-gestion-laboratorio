import { Router } from 'express';

import type { ItemCategoryRepository } from '@itemCategories/repositories/ItemCategoryRepository.js';
import { ItemCategoryService } from '@itemCategories/services/ItemCategoryService.js';
import { ItemCategoryController } from '@itemCategories/controllers/ItemCategoryController.js';
import { TypeOrmItemCategoryRepository } from '@itemCategories/repositories/TypeOrmItemCategoryRepository.js';
import { ItemCategoryEntity } from '@itemCategories/entities/ItemCategoryEntity.js';
import { dataSource } from '@config/loadDatabase.js';

export const router: Router = Router();

const repository: ItemCategoryRepository = new TypeOrmItemCategoryRepository(
  dataSource.getRepository(ItemCategoryEntity),
);
const service: ItemCategoryService = new ItemCategoryService(repository);
const controller: ItemCategoryController = new ItemCategoryController(service);

router
  .get('/', controller.getAllCategories)
  .get('/:id', controller.getCategoryById)
  .post('/', controller.createCategory)
  .put('/:id', controller.updateCategory)
  .delete('/:id', controller.deleteCategory);
