import type { Repository } from 'typeorm';

import type { StudentRepository } from '@students/repositories/StudentRepository.js';
import { Student } from '@students/models/Student.js';
import type { StudentEntity } from '@students/entities/StudentEntity.js';
import { StudentMapper } from '@students/mappers/StudentMapper.js';

export class TypeOrmStudentRepository implements StudentRepository {
  constructor(private readonly repository: Repository<StudentEntity>) {}

  async create(student: Student): Promise<void> {
    const _student = StudentMapper.fromStudentToStudentEntity(student);

    await this.repository.save(_student);
  }

  async findAll(): Promise<Student[]> {
    const students = await this.repository.find();

    return students.map(StudentMapper.fromStudentEntityToStudent);
  }

  async findById(id: string): Promise<Student | null> {
    const foundstudent = await this.repository.findOneBy({ id });

    if (foundstudent == null) return null;

    return StudentMapper.fromStudentEntityToStudent(foundstudent);
  }

  async update(id: string, student: Student): Promise<void> {
    const foundStudent = await this.repository.findOneBy({ id });

    if (!foundStudent) {
      return Promise.reject();
    }

    const _student = StudentMapper.fromStudentToStudentEntity(student);

    await this.repository.save(_student);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
