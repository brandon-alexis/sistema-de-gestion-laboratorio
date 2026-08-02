import type { CreateStudentDto } from '@students/dto/CreateStudentDto.js';
import { Student } from '@students/model/Student.js';
import { ResponseStudentDto } from '@students/dto/ResponseStudentDto.js';

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
}
