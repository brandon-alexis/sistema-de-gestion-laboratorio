import type { CreateProfessorDto } from '@professors/dtos/CreateProfessorDto.js';
import { ResponseProfessorDto } from '@professors/dtos/ResponseProfessorDto.js';
import type { ProfessorEntity } from '@professors/entities/ProfessorEntity.js';
import { Professor } from '@professors/models/Professor.js';

export class ProfessorMapper {
  public static fromCreateDtoToProfessor(dto: CreateProfessorDto): Professor {
    return new Professor(
      crypto.randomUUID(),
      dto.getFullname(),
      new Date(),
      new Date(),
    );
  }

  public static fromProfessorToResponseProfessorDto(
    professor: Professor,
  ): ResponseProfessorDto {
    return new ResponseProfessorDto(professor.getId(), professor.getFullname());
  }

  public static fromProfessorToProfessorEntity(
    professor: Professor,
  ): ProfessorEntity {
    return {
      id: professor.getId(),
      fullname: professor.getFullname(),
      createdAt: professor.getCreatedAt(),
      updatedAt: professor.getUpdatedAt(),
    };
  }

  public static fromProfessorEntityToProfessor(
    entity: ProfessorEntity,
  ): Professor {
    return new Professor(
      entity.id,
      entity.fullname,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
