import { Router } from 'express';

import type { ProfessorRepository } from '@professors/repositories/ProfessorRepository.js';
import { ProfessorService } from '@professors/services/ProfessorService.js';
import { ProfessorController } from '@professors/controllers/ProfessorController.js';
import { TypeOrmProfessorRepository } from '@professors/repositories/TypeOrmProfessorRepository.js';
import { ProfessorEntity } from '@professors/entities/ProfessorEntity.js';
import { dataSource } from '@config/loadDatabase.js';

export const router: Router = Router();

const repository: ProfessorRepository = new TypeOrmProfessorRepository(
  dataSource.getRepository(ProfessorEntity),
);
const service: ProfessorService = new ProfessorService(repository);
const controller: ProfessorController = new ProfessorController(service);

router
  .get('/', controller.getAllProfessors)
  .get('/:id', controller.getProfessorById)
  .post('/', controller.createProfessor)
  .put('/:id', controller.updateProfessor)
  .delete('/:id', controller.deleteProfessor);
