export class ItemNotFoundException extends Error {
  constructor() {
    super('Item no encontrado');
  }
}
