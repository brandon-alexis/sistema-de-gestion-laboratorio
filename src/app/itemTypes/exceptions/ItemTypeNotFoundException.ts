export class ItemTypeNotFoundException extends Error {
  constructor() {
    super('Tipo de item no encontrado');
  }
}
