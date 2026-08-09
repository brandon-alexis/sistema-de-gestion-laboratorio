import { Router } from 'express';

import type { ItemRepository } from '@items/repositories/ItemRepository.js';
import { ItemService } from '@items/services/ItemService.js';
import { ItemController } from '@items/controllers/ItemController.js';
import { TypeOrmItemRepository } from '@items/repositories/TypeOrmItemRepository.js';
import { ItemEntity } from '@items/entities/ItemEntity.js';
import { dataSource } from '@config/loadDatabase.js';

export const router: Router = Router();

const repository: ItemRepository = new TypeOrmItemRepository(
  dataSource.getRepository(ItemEntity),
);
const service: ItemService = new ItemService(repository);
const controller: ItemController = new ItemController(service);

router
  .get('/', controller.getAllItems)
  .get('/:id', controller.getItemById)
  .post('/', controller.createItem)
  .put('/:id', controller.updateItem)
  .delete('/:id', controller.deleteItem);
