import { Router } from 'express';

import type { StudentRepository } from '@students/repositories/StudentRepository.js';
import { StudentService } from '@students/services/StudentService.js';
import { StudentController } from '@students/controllers/StudentController.js';
import { TypeOrmStudentRepository } from '@students/repositories/TypeOrmStudentRepository.js';
import { StudentEntity } from '@students/entities/StudentEntity.js';
import { dataSource } from '@config/loadDatabase.js';

export const router: Router = Router();

const repository: StudentRepository = new TypeOrmStudentRepository(
  dataSource.getRepository(StudentEntity),
);
const service: StudentService = new StudentService(repository);
const controller: StudentController = new StudentController(service);

router
  .get('/', controller.getAllStudents)
  .get('/:id', controller.getStudentById)
  .post('/', controller.createStudent)
  .put('/:id', controller.updateStudent)
  .delete('/:id', controller.deleteStudent);
