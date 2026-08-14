import type { StudentRepository } from '@students/repositories/StudentRepository.js';
import { StudentService } from '@students/services/StudentService.js';
import { Student } from '@students/models/Student.js';
import { UpdateStudentDto } from '@students/dtos/UpdateStudentDto.js';
import { StudentNotFoundException } from '@students/exceptions/StudentNotFoundException.js';
import { StudentAlreadyExistsException } from '@students/exceptions/StudentAlreadyExists.js';

function createdStudentRepositoryMock(): jest.Mocked<StudentRepository> {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

describe('StudentService', () => {
  describe('getAllStudents', () => {
    it('deberia devolver todos los estudiantes', async () => {
      const students: Student[] = [];

      const studentRepository = createdStudentRepositoryMock();

      studentRepository.findAll.mockResolvedValue(students);

      const studentService = new StudentService(studentRepository);

      const result = await studentService.getAllStudents();

      expect(result).toEqual(students);
      expect(studentRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('deberia lanzar error si el estudiante no existe', async () => {
      const studentId = crypto.randomUUID().toString();

      const studentRepository = createdStudentRepositoryMock();

      studentRepository.findById.mockResolvedValue(null);

      const studentService = new StudentService(studentRepository);

      await expect(studentService.getStudentById(studentId)).rejects.toThrow(
        StudentNotFoundException,
      );

      expect(studentRepository.findById).toHaveBeenCalledTimes(1);
      expect(studentRepository.findById).toHaveBeenCalledWith(studentId);
    });
  });

  describe('createStudent', () => {
    it('deberia crear un estudiante', async () => {
      const studentId = crypto.randomUUID().toString();
      const studentCreatedAt = new Date();
      const studentUpdatedAt = new Date();

      const newStudent = new Student(
        studentId,
        'pepe gonzales',
        '123456789',
        studentCreatedAt,
        studentUpdatedAt,
      );

      const studentRepository = createdStudentRepositoryMock();

      studentRepository.findAll.mockResolvedValue([]);
      studentRepository.create.mockResolvedValue();

      const studentService = new StudentService(studentRepository);

      await studentService.createStudent(newStudent);

      expect(studentRepository.create).toHaveBeenCalledTimes(1);
      expect(studentRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: studentId,
          fullname: 'pepe gonzales',
          createdAt: studentCreatedAt,
          updatedAt: studentUpdatedAt,
        }),
      );
    });

    it('deberia lanzar error si el estudiante a registrar ya existe', async () => {
      const studentId = crypto.randomUUID().toString();
      const newStudent = new Student(
        studentId,
        'pepe',
        '123456789',
        new Date(),
        new Date(),
      );

      const students: Student[] = [newStudent];

      const studentRepository = createdStudentRepositoryMock();

      studentRepository.findAll.mockResolvedValue(students);
      studentRepository.create.mockResolvedValue();

      const studentService = new StudentService(studentRepository);

      const createdStudent = new Student(
        crypto.randomUUID().toString(),
        'maria',
        '123456789',
        new Date(),
        new Date(),
      );

      await expect(
        studentService.createStudent(createdStudent),
      ).rejects.toThrow(StudentAlreadyExistsException);

      expect(studentRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('getStudentById', () => {
    it('deberia obtener un estudiante', async () => {
      const studentId = crypto.randomUUID().toString();
      const newStudent = new Student(
        studentId,
        'pepe gonzales',
        '123456789',
        new Date(),
        new Date(),
      );
      const students: Student[] = [newStudent];

      const studentRepository = createdStudentRepositoryMock();

      studentRepository.findAll.mockResolvedValue(students);
      studentRepository.findById.mockResolvedValue(newStudent);

      const studentService = new StudentService(studentRepository);

      const result = await studentService.getStudentById(studentId);

      expect(result).toEqual(newStudent);
      expect(studentRepository.findById).toHaveBeenCalledWith(studentId);
      expect(studentRepository.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateStudent', () => {
    it('deberia actualizar el estudiante', async () => {
      const studentId = crypto.randomUUID().toString();
      const newStudent = new Student(
        studentId,
        'maria sanches',
        '12345678999',
        new Date(),
        new Date(),
      );
      const students: Student[] = [newStudent];

      const studentRepository = createdStudentRepositoryMock();

      studentRepository.findAll.mockResolvedValue(students);
      studentRepository.findById.mockResolvedValue(newStudent);
      studentRepository.update.mockResolvedValue();

      const studentService = new StudentService(studentRepository);

      const updateStudentDto = new UpdateStudentDto('luis felipe', '12345');

      await studentService.updateStudent(studentId, updateStudentDto);

      expect(studentRepository.findAll).toHaveBeenCalledTimes(1);
      expect(studentRepository.findById).toHaveBeenCalledWith(studentId);
      expect(studentRepository.findById).toHaveBeenCalledTimes(1);

      expect(studentRepository.update).toHaveBeenCalledWith(
        studentId,
        newStudent,
      );
      expect(studentRepository.update).toHaveBeenCalledTimes(1);
    });

    it('deberia lanzar error al actualizar un estudiante que no existe', async () => {
      const studentId = crypto.randomUUID();
      const studentRepository = createdStudentRepositoryMock();

      studentRepository.findById.mockResolvedValue(null);

      const studentService = new StudentService(studentRepository);

      const updateStudentDto = new UpdateStudentDto('luis felipe', '12345');

      await expect(
        studentService.updateStudent(studentId, updateStudentDto),
      ).rejects.toThrow(StudentNotFoundException);

      expect(studentRepository.findById).toHaveBeenCalledWith(studentId);
      expect(studentRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteStudent', () => {
    it('deberia eliminar un estudiante', async () => {
      const studentId = crypto.randomUUID().toString();
      const newStudent = new Student(
        studentId,
        'laura sanchez',
        '1010101010',
        new Date(),
        new Date(),
      );

      const studentRepository = createdStudentRepositoryMock();

      studentRepository.findById.mockResolvedValue(newStudent);
      studentRepository.delete.mockResolvedValue();

      const studentService = new StudentService(studentRepository);

      await studentService.deleteStudent(studentId);

      expect(studentRepository.findById).toHaveBeenCalledTimes(1);
      expect(studentRepository.findById).toHaveBeenCalledWith(studentId);

      expect(studentRepository.delete).toHaveBeenCalledTimes(1);
      expect(studentRepository.delete).toHaveBeenCalledWith(studentId);
    });

    it('deberia lanzar error al eliminar un estudiante que no existe', async () => {
      const studentId = crypto.randomUUID();
      const studentRepository = createdStudentRepositoryMock();

      studentRepository.findById.mockResolvedValue(null);

      const studentService = new StudentService(studentRepository);

      await expect(studentService.deleteStudent(studentId)).rejects.toThrow(
        StudentNotFoundException,
      );

      expect(studentRepository.findById).toHaveBeenCalledWith(studentId);
      expect(studentRepository.delete).not.toHaveBeenCalled();
    });
  });
});
