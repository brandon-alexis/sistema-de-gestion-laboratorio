import { Router } from 'express';
import type { StudentRepository } from '../repository/StudentRepository.js';
import { LocalStudentRepository } from '../repository/LocalStudentRepository.js';
import { StudentService } from '../service/StudentService.js';
import { StudentController } from '../controller/StudentController.js';

export const router: Router = Router();

const repository: StudentRepository = new LocalStudentRepository();
const service: StudentService = new StudentService(repository);
const controller: StudentController = new StudentController(service);

router.post('/', controller.createStudent);
router.get('/', controller.getAllStudents);
router.get('/:id', controller.getStudentById);
