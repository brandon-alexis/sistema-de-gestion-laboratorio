import type { Student } from '@students/models/Student.js';

export interface StudentRepository {
  create(student: Student): Promise<void>;
  update(id: string, student: Student): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Student | null>;
  findAll(): Promise<Student[]>;
}
