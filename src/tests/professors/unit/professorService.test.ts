import { Professor } from '@professors/models/Professor.js';
import type { ProfessorRepository } from '@professors/repositories/ProfessorRepository.js';
import { UpdateProfessorDto } from '@professors/dtos/UpdateProfessorDto.js';
import { ProfessorService } from '@professors/services/ProfessorService.js';
import { ProfessorAlreadyExistsException } from '@professors/exceptions/ProfessorAlreadyExistsException.js';
import { ProfessorNotFoundException } from '@src/app/professors/exceptions/ProfessorNotFoundException.js';

function createProfessorRepositoryMock(): jest.Mocked<ProfessorRepository> {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

describe('ProfessorService', () => {
  describe('getAllProfessors', () => {
    it('deberia devolver todos los profesores', async () => {
      const professors: Professor[] = [];

      const professorRepository = createProfessorRepositoryMock();

      professorRepository.findAll.mockResolvedValue(professors);

      const professorService = new ProfessorService(professorRepository);

      const result = await professorService.getAllProfessors();

      expect(result).toEqual(professors);
      expect(professorRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('createProfessor', () => {
    it('deberia crear un profesor', async () => {
      const professorId = crypto.randomUUID().toString();
      const professorCreatedAt = new Date();
      const professorUpdatedAt = new Date();

      const newProfessor = new Professor(
        professorId,
        'manolo castilla',
        professorCreatedAt,
        professorUpdatedAt,
      );

      const professorRepository = createProfessorRepositoryMock();

      professorRepository.findAll.mockResolvedValue([]);
      professorRepository.create.mockResolvedValue();

      const professorService = new ProfessorService(professorRepository);

      await professorService.createProfessor(newProfessor);

      expect(professorRepository.create).toHaveBeenCalledTimes(1);
      expect(professorRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: professorId,
          fullname: 'manolo castilla',
          createdAt: professorCreatedAt,
          updatedAt: professorUpdatedAt,
        }),
      );
    });

    it('deberia lanzar error si el profesor a registrar ya existe', async () => {
      const professorId = crypto.randomUUID().toString();
      const newProfessor = new Professor(
        professorId,
        'pepe muñoz',
        new Date(),
        new Date(),
      );
      const professors: Professor[] = [newProfessor];

      const professorRepository = createProfessorRepositoryMock();

      professorRepository.findAll.mockResolvedValue(professors);
      professorRepository.create.mockResolvedValue();

      const professorService = new ProfessorService(professorRepository);

      await expect(
        professorService.createProfessor(newProfessor),
      ).rejects.toThrow(ProfessorAlreadyExistsException);
    });
  });

  describe('getProfessorById', () => {
    it('deberia obtener un profesor', async () => {
      const professorId = crypto.randomUUID().toString();
      const newProfessor = new Professor(
        professorId,
        'manolo guzman',
        new Date(),
        new Date(),
      );

      const professorRepository = createProfessorRepositoryMock();

      professorRepository.findById.mockResolvedValue(newProfessor);

      const professorService = new ProfessorService(professorRepository);

      const result = await professorService.getProfessorById(professorId);

      expect(result).toEqual(newProfessor);
      expect(professorRepository.findById).toHaveBeenCalledTimes(1);
      expect(professorRepository.findById).toHaveBeenCalledWith(professorId);
    });
  });

  describe('updateProfessor', () => {
    it('deberia actualizar un profesor', async () => {
      const professorId = crypto.randomUUID().toString();
      const newProfessor = new Professor(
        professorId,
        'manolo guzman',
        new Date(),
        new Date(),
      );

      const professorRepository = createProfessorRepositoryMock();

      professorRepository.findAll.mockResolvedValue([]);
      professorRepository.findById.mockResolvedValue(newProfessor);
      professorRepository.update.mockResolvedValue();

      const professorService = new ProfessorService(professorRepository);

      const updateProfessorDto = new UpdateProfessorDto('fernando cantillo');

      await professorService.updateProfessor(professorId, updateProfessorDto);

      expect(professorRepository.findAll).toHaveBeenCalledTimes(1);
      expect(professorRepository.findById).toHaveBeenCalledTimes(1);
      expect(professorRepository.findById).toHaveBeenCalledWith(professorId);
      expect(professorRepository.update).toHaveBeenCalledTimes(1);
      expect(professorRepository.update).toHaveBeenCalledWith(
        professorId,
        newProfessor,
      );
    });

    it('deberia lanzar error al actualizar un profesor que no existe', async () => {
      const professorId = crypto.randomUUID().toString();

      const professorRepository = createProfessorRepositoryMock();

      professorRepository.findById.mockResolvedValue(null);
      professorRepository.update.mockResolvedValue();

      const professorService = new ProfessorService(professorRepository);

      const updateProfessorDto = new UpdateProfessorDto('pepe');

      await expect(
        professorService.updateProfessor(professorId, updateProfessorDto),
      ).rejects.toThrow(ProfessorNotFoundException);
    });
  });

  describe('deleteProfessor', () => {
    it('deberia eliminar un profesor', async () => {
      const professorId = crypto.randomUUID().toString();
      const newProfessor = new Professor(
        professorId,
        'pepe gonzalez',
        new Date(),
        new Date(),
      );

      const professorRepository = createProfessorRepositoryMock();

      professorRepository.findById.mockResolvedValue(newProfessor);
      professorRepository.delete.mockResolvedValue();

      const professorService = new ProfessorService(professorRepository);

      await professorService.deleteProfessor(professorId);

      expect(professorRepository.findById).toHaveBeenCalledTimes(1);
      expect(professorRepository.findById).toHaveBeenCalledWith(professorId);
      expect(professorRepository.delete).toHaveBeenCalledTimes(1);
      expect(professorRepository.delete).toHaveBeenCalledWith(professorId);
    });

    it('deberia lanzar error al eliminar un profesor que no existe', async () => {
      const professorId = crypto.randomUUID().toString();

      const professorRepository = createProfessorRepositoryMock();

      professorRepository.findById.mockResolvedValue(null);
      professorRepository.delete.mockResolvedValue();

      const professorService = new ProfessorService(professorRepository);

      await expect(
        professorService.getProfessorById(professorId),
      ).rejects.toThrow(ProfessorNotFoundException);
    });
  });
});
