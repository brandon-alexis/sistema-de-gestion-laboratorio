export class ItemTypeAlreadyExistsException extends Error {
  constructor() {
    super('El tipo de item ya existe en el sistema');
  }
}
