import type { CreateStudentDto } from '@students/dtos/CreateStudentDto.js';
import { ResponseStudentDto } from '@students/dtos/ResponseStudentDto.js';
import type { StudentEntity } from '@students/entities/StudentEntity.js';
import { Student } from '@students/models/Student.js';

export class StudentMapper {
  public static fromCreateDtoToStudent(dto: CreateStudentDto): Student {
    return new Student(
      crypto.randomUUID(),
      dto.getFullname(),
      dto.getDocumentNumber(),
      new Date(),
      new Date(),
    );
  }

  public static fromStudentToResponseStudentDto(
    student: Student,
  ): ResponseStudentDto {
    return new ResponseStudentDto(
      student.getId(),
      student.getFullname(),
      student.getDocumentNumber(),
    );
  }

  public static fromStudentToStudentEntity(student: Student): StudentEntity {
    return {
      id: student.getId(),
      fullname: student.getFullname(),
      documentNumber: student.getDocumentNumber(),
      createdAt: student.getCreatedAt(),
      updatedAt: student.getUpdatedAt(),
    };
  }

  public static fromStudentEntityToStudent(entity: StudentEntity): Student {
    return new Student(
      entity.id,
      entity.fullname,
      entity.documentNumber,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
