import type { Professor } from '@professors/models/Professor.js';

export interface ProfessorRepository {
  create(professor: Professor): Promise<void>;
  update(id: string, professor: Professor): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Professor | null>;
  findAll(): Promise<Professor[]>;
}
