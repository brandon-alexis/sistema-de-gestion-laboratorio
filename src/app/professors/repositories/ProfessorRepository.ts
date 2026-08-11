import type { Professor } from '@professors/models/Professor.js';
import type { BaseRepository } from '@shared/repository/BaseRepository.js';

export interface ProfessorRepository extends BaseRepository<
  string,
  Professor
> {}
