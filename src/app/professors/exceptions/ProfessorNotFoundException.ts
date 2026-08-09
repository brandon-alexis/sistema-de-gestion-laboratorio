export class ProfessorNotFoundException extends Error {
  constructor() {
    super('Profesor no encontrado');
  }
}
