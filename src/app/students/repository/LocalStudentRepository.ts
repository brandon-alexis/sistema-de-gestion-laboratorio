import { Student } from '@students/model/Student.js';
import type { StudentRepository } from '@students/repository/StudentRepository.js';

export class LocalStudentRepository implements StudentRepository {
  private students: Map<string, Student> = new Map();

  async create(student: Student): Promise<void> {
    this.students.set(student.getId(), student);
  }

  findAll(): Promise<Student[]> {
    return Promise.resolve(Array.from(this.students.values()));
  }

  findById(id: string): Promise<Student | null> {
    const foundStudent = this.students.get(id) || null;
    return Promise.resolve(foundStudent);
  }

  update(id: string, student: Student): Promise<void> {
    const foundStudent = this.students.get(id);

    if (!foundStudent) {
      return Promise.reject(new Error(`Student with id ${id} not found`));
    }

    if (student.getFullname()) {
      foundStudent.setFullname(student.getFullname()!);
    }

    if (student.getDocumentNumber()) {
      foundStudent.setDocumentNumber(student.getDocumentNumber()!);
    }

    foundStudent.setUpdatedAt(new Date());

    this.students.set(id, foundStudent);

    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    const foundStudent = this.students.get(id);

    if (!foundStudent) return Promise.reject();

    this.students.delete(id);
    return Promise.resolve();
  }
}
