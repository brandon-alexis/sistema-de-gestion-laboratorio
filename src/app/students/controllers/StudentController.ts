import type { Request, Response } from 'express';

import type { StudentService } from '@students/services/StudentService.js';
import type { ResponseStudentDto } from '@students/dtos/ResponseStudentDto.js';
import type { Student } from '@students/models/Student.js';
import type { studentParams } from '@students/types/studentParams.js';
import type { StudentBody } from '@students/types/studentBody.js';
import { CreateStudentDto } from '@students/dtos/CreateStudentDto.js';
import { StudentMapper } from '@students/mappers/StudentMapper.js';
import { UpdateStudentDto } from '@students/dtos/UpdateStudentDto.js';

export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  createStudent = async (req: Request, res: Response): Promise<void> => {
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

  public updateStudent = async (req: Request<studentParams>, res: Response) => {
    try {
      const { fullname, documentNumber }: StudentBody = req.body;
      const { id }: studentParams = req.params;

      const updateStudentDto = new UpdateStudentDto(fullname, documentNumber);

      await this.studentService.updateStudent(id, updateStudentDto);

      res.status(200).json({ message: 'Estudiante actualizado con exito' });
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };

  public deleteStudent = async (req: Request<studentParams>, res: Response) => {
    try {
      const { id }: studentParams = req.params;

      await this.studentService.deleteStudent(id);

      res.status(200).json({ message: 'Estudiante eliminado con exito' });
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };
}
