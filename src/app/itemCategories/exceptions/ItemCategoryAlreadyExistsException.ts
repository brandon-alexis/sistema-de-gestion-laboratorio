export class ItemCategoryAlreadyExistsException extends Error {
  constructor() {
    super('La categoria ya existe en el sistema');
  }
}
