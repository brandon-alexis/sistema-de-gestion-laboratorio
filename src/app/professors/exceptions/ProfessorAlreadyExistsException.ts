export class ProfessorAlreadyExistsException extends Error {
  constructor() {
    super('El profesor ya existe en el sistema');
  }
}
