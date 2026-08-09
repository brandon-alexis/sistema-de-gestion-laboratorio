import type { Request, Response } from 'express';

import type { ProfessorService } from '@professors/services/ProfessorService.js';
import type { ResponseProfessorDto } from '@professors/dtos/ResponseProfessorDto.js';
import type { Professor } from '@professors/models/Professor.js';
import type { professorParams } from '@professors/types/professorParams.js';
import type { ProfessorBody } from '@professors/types/professorBody.js';
import { CreateProfessorDto } from '@professors/dtos/CreateProfessorDto.js';
import { ProfessorMapper } from '@professors/mappers/ProfessorMapper.js';
import { UpdateProfessorDto } from '@professors/dtos/UpdateProfessorDto.js';

export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  public createProfessor = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { fullname }: ProfessorBody = req.body;

      const createProfessorDto: CreateProfessorDto = new CreateProfessorDto(
        fullname,
      );

      const professor: Professor =
        ProfessorMapper.fromCreateDtoToProfessor(createProfessorDto);

      await this.professorService.createProfessor(professor);

      res.status(201).json({ message: 'Profesor creado con exito' });
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getAllProfessors = async (
    _: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const professors: ResponseProfessorDto[] = (
        await this.professorService.getAllProfessors()
      ).map(ProfessorMapper.fromProfessorToResponseProfessorDto);

      res.status(200).json(professors);
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getProfessorById = async (
    req: Request<professorParams>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const professor: Professor =
        await this.professorService.getProfessorById(id);

      const responseProfessorDto: ResponseProfessorDto =
        ProfessorMapper.fromProfessorToResponseProfessorDto(professor);

      res.status(200).json(responseProfessorDto);
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };

  public updateProfessor = async (
    req: Request<professorParams>,
    res: Response,
  ): Promise<void> => {
    try {
      const { fullname }: ProfessorBody = req.body;
      const { id }: professorParams = req.params;

      const updateProfessorDto = new UpdateProfessorDto(fullname);

      await this.professorService.updateProfessor(id, updateProfessorDto);

      res.status(200).json({ message: 'Profesor actualizado con exito' });
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };

  public deleteProfessor = async (
    req: Request<professorParams>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id }: professorParams = req.params;

      await this.professorService.deleteProfessor(id);

      res.status(200).json({ message: 'Profesor eliminado con exito' });
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };
}
