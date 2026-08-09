import type { StudentRepository } from '@students/repositories/StudentRepository.js';
import { Student } from '@students/models/Student.js';
import { StudentNotFoundException } from '@students/exceptions/StudentNotFoundException.js';
import { StudentAlreadyExistsException } from '@students/exceptions/StudentAlreadyExists.js';
import type { UpdateStudentDto } from '@students/dtos/UpdateStudentDto.js';

export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  public async createStudent(student: Student): Promise<void> {
    const students: Student[] = await this.studentRepository.findAll();

    const studentExists: boolean = students.some(
      (_student) =>
        _student.getDocumentNumber() === student.getDocumentNumber(),
    );

    if (studentExists) {
      throw new StudentAlreadyExistsException();
    }

    await this.studentRepository.create(student);
  }

  public async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.findAll();
  }

  public async getStudentById(id: string): Promise<Student> {
    const foundStudent: Student | null =
      await this.studentRepository.findById(id);

    if (!foundStudent) {
      throw new StudentNotFoundException();
    }

    return foundStudent;
  }

  public async updateStudent(id: string, dto: UpdateStudentDto): Promise<void> {
    const foundStudent: Student | null =
      await this.studentRepository.findById(id);

    if (!foundStudent) {
      throw new StudentNotFoundException();
    }

    const documentNumber = dto.getDocumentNumber();

    if (documentNumber !== undefined) {
      const students: Student[] = await this.studentRepository.findAll();

      const studentExists: boolean = students.some(
        (_student) =>
          _student.getDocumentNumber() === documentNumber &&
          _student.getId() !== id,
      );

      if (studentExists) {
        throw new StudentAlreadyExistsException();
      }

      foundStudent.setDocumentNumber(documentNumber);
    }

    const fullname = dto.getFullname();

    if (fullname !== undefined) {
      foundStudent.setFullname(fullname);
    }

    await this.studentRepository.update(id, foundStudent);
  }

  public async deleteStudent(id: string): Promise<void> {
    const foundStudent: Student | null =
      await this.studentRepository.findById(id);

    if (!foundStudent) {
      throw new StudentNotFoundException();
    }

    await this.studentRepository.delete(id);
  }
}
