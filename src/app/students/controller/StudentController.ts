import type { Request, Response } from 'express';

import type { StudentService } from '@students/service/StudentService.js';
import { CreateStudentDto } from '@students/dto/CreateStudentDto.js';
import { StudentMapper } from '@students/mapper/StudentMapper.js';
import type { Student } from '@students/model/Student.js';
import type { ResponseStudentDto } from '@students/dto/ResponseStudentDto.js';
import type { studentParams } from '@students/types/studentParams.js';
import type { StudentBody } from '../types/studentBody.js';

export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  createStudent = async (
    req: Request<StudentBody>,
    res: Response,
  ): Promise<void> => {
    try {
      const { fullname, documentNumber }: StudentBody = req.body;

      const createStudentDto: CreateStudentDto = new CreateStudentDto(
        fullname,
        documentNumber,
      );

      const student: Student =
        StudentMapper.fromCreateDtoToStudent(createStudentDto);

      await this.studentService.createStudent(student);

      res.status(201).json({ message: 'Estudiante creado con exito' });
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getAllStudents = async (_: Request, res: Response): Promise<void> => {
    try {
      const students: ResponseStudentDto[] = (
        await this.studentService.getAllStudents()
      ).map(StudentMapper.fromStudentToResponseStudentDto);

      res.status(200).json(students);
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getStudentById = async (
    req: Request<studentParams>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const student: Student = await this.studentService.getStudentById(id);

      const responseStudentDto: ResponseStudentDto =
        StudentMapper.fromStudentToResponseStudentDto(student);

      res.status(200).json(responseStudentDto);
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };
}
