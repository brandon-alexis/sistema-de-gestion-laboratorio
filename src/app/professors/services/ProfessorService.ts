import type { ProfessorRepository } from '@professors/repositories/ProfessorRepository.js';
import { Professor } from '@professors/models/Professor.js';
import { ProfessorNotFoundException } from '@professors/exceptions/ProfessorNotFoundException.js';
import { ProfessorAlreadyExistsException } from '@professors/exceptions/ProfessorAlreadyExistsException.js';
import type { UpdateProfessorDto } from '@professors/dtos/UpdateProfessorDto.js';

export class ProfessorService {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  public async createProfessor(professor: Professor): Promise<void> {
    const professors: Professor[] = await this.professorRepository.findAll();

    const professorExists: boolean = professors.some(
      (_professor) => _professor.getFullname() === professor.getFullname(),
    );

    if (professorExists) {
      throw new ProfessorAlreadyExistsException();
    }

    await this.professorRepository.create(professor);
  }

  public async getAllProfessors(): Promise<Professor[]> {
    return this.professorRepository.findAll();
  }

  public async getProfessorById(id: string): Promise<Professor> {
    const foundProfessor: Professor | null =
      await this.professorRepository.findById(id);

    if (!foundProfessor) {
      throw new ProfessorNotFoundException();
    }

    return foundProfessor;
  }

  public async updateProfessor(
    id: string,
    dto: UpdateProfessorDto,
  ): Promise<void> {
    const foundProfessor: Professor | null =
      await this.professorRepository.findById(id);

    if (!foundProfessor) {
      throw new ProfessorNotFoundException();
    }

    const fullname = dto.getFullname();

    if (fullname !== undefined) {
      const professors: Professor[] = await this.professorRepository.findAll();

      const professorExists: boolean = professors.some(
        (_professor) =>
          _professor.getFullname() === fullname && _professor.getId() !== id,
      );

      if (professorExists) {
        throw new ProfessorAlreadyExistsException();
      }

      foundProfessor.setFullname(fullname);
      foundProfessor.setUpdatedAt(new Date());
    }

    await this.professorRepository.update(id, foundProfessor);
  }

  public async deleteProfessor(id: string): Promise<void> {
    const foundProfessor: Professor | null =
      await this.professorRepository.findById(id);

    if (!foundProfessor) {
      throw new ProfessorNotFoundException();
    }

    await this.professorRepository.delete(id);
  }
}
