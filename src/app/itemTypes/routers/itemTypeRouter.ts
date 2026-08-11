import { Router } from 'express';

import type { ItemTypeRepository } from '@itemTypes/repositories/ItemTypeRepository.js';
import { ItemTypeService } from '@itemTypes/services/ItemTypeService.js';
import { ItemTypeController } from '@itemTypes/controllers/ItemTypeController.js';
import { TypeOrmItemTypeRepository } from '@itemTypes/repositories/TypeOrmItemTypeRepository.js';
import { ItemTypeEntity } from '@itemTypes/entities/ItemTypeEntity.js';
import { dataSource } from '@config/loadDatabase.js';

export const router: Router = Router();

const repository: ItemTypeRepository = new TypeOrmItemTypeRepository(
  dataSource.getRepository(ItemTypeEntity),
);
const service: ItemTypeService = new ItemTypeService(repository);
const controller: ItemTypeController = new ItemTypeController(service);

router
  .get('/', controller.getAllTypes)
  .get('/:id', controller.getTypeById)
  .post('/', controller.createType)
  .put('/:id', controller.updateType)
  .delete('/:id', controller.deleteType);
