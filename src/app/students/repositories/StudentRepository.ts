import type { BaseRepository } from '@shared/repository/BaseRepository.js';
import type { Student } from '@students/models/Student.js';

export interface StudentRepository extends BaseRepository<string, Student> {}
