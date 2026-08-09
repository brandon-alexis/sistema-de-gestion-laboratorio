import type { Repository } from 'typeorm';

import type { ProfessorRepository } from '@professors/repositories/ProfessorRepository.js';
import { Professor } from '@professors/models/Professor.js';
import type { ProfessorEntity } from '@professors/entities/ProfessorEntity.js';
import { ProfessorMapper } from '@professors/mappers/ProfessorMapper.js';

export class TypeOrmProfessorRepository implements ProfessorRepository {
  constructor(private readonly repository: Repository<ProfessorEntity>) {}

  async create(professor: Professor): Promise<void> {
    const _professor =
      ProfessorMapper.fromProfessorToProfessorEntity(professor);

    await this.repository.save(_professor);
  }

  async findAll(): Promise<Professor[]> {
    const professors = await this.repository.find();

    return professors.map(ProfessorMapper.fromProfessorEntityToProfessor);
  }

  async findById(id: string): Promise<Professor | null> {
    const foundProfessor = await this.repository.findOneBy({ id });

    if (foundProfessor == null) return null;

    return ProfessorMapper.fromProfessorEntityToProfessor(foundProfessor);
  }

  async update(id: string, professor: Professor): Promise<void> {
    const foundProfessor = await this.repository.findOneBy({ id });

    if (!foundProfessor) {
      return;
    }

    const _professor =
      ProfessorMapper.fromProfessorToProfessorEntity(professor);

    await this.repository.save(_professor);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
