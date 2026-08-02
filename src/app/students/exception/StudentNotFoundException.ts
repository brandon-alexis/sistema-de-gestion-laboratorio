export class StudentNotFoundException extends Error {
  constructor() {
    super('Estudiante no encontrado');
  }
}
