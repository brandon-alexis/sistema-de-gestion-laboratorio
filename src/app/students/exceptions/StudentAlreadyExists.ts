export class StudentAlreadyExistsException extends Error {
  constructor() {
    super('El estudiante ya existe en el sistema');
  }
}
