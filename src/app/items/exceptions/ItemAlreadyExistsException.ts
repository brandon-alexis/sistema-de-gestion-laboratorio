export class ItemAlreadyExistsException extends Error {
  constructor() {
    super('El item ya existe en el sistema');
  }
}
