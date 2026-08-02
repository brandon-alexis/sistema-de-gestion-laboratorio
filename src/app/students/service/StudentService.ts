import type { StudentRepository } from '@students/repository/StudentRepository.js';
import { Student } from '@students/model/Student.js';
import { StudentNotFoundException } from '@students/exception/StudentNotFoundException.js';
import { StudentAlreadyExistsException } from '@students/exception/StudentAlreadyExists.js';

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

  public async updateStudent(id: string, student: Student): Promise<void> {
    const foundStudent: Student | null =
      await this.studentRepository.findById(id);

    if (!foundStudent) {
      throw new StudentNotFoundException();
    }

    await this.studentRepository.update(id, student);
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
