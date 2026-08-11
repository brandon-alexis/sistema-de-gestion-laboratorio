export class ItemCategoryNotFoundException extends Error {
  constructor() {
    super('Categoria no encontrada');
  }
}
