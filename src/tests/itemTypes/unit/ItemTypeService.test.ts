import type { ItemTypeRepository } from '@itemTypes/repositories/ItemTypeRepository.js';
import { ItemType } from '@itemTypes/models/ItemType.js';
import { ItemTypeService } from '@itemTypes/services/ItemTypeService.js';
import { ItemTypeAlreadyExistsException } from '@itemTypes/exceptions/ItemTypeAlreadyExistsException.js';
import { ItemTypeNotFoundException } from '@itemTypes/exceptions/ItemTypeNotFoundException.js';
import { UpdateItemTypeDto } from '@itemTypes/dtos/UpdateItemTypeDto.js';

function createItemTypeRepositoryMock(): jest.Mocked<ItemTypeRepository> {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

describe('ItemTypeService', () => {
  describe('getAllItemTypes', () => {
    it('deberia devolver todo los tipos de items', async () => {
      const itemTypes: ItemType[] = [];

      const itemTypeRepository = createItemTypeRepositoryMock();

      itemTypeRepository.findAll.mockResolvedValue(itemTypes);

      const itemTypeService = new ItemTypeService(itemTypeRepository);

      const result = await itemTypeService.getAllTypes();

      expect(result).toBe(itemTypes);
      expect(itemTypeRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('createItemType', () => {
    it('deberia crear un nuevo tipo de item', async () => {
      const itemTypeId = crypto.randomUUID().toString();
      const itemTypeCreatedAt = new Date();
      const itemTypeUpdatedAt = new Date();

      const newItemType = new ItemType(
        itemTypeId,
        'Multimetro',
        itemTypeCreatedAt,
        itemTypeUpdatedAt,
      );

      const itemTypes: ItemType[] = [];

      const itemTypeRepository = createItemTypeRepositoryMock();

      itemTypeRepository.findAll.mockResolvedValue(itemTypes);
      itemTypeRepository.create.mockResolvedValue();

      const itemTypeService = new ItemTypeService(itemTypeRepository);

      await itemTypeService.createType(newItemType);

      expect(itemTypeRepository.create).toHaveBeenCalledTimes(1);
      expect(itemTypeRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: itemTypeId,
          name: 'Multimetro',
          createdAt: itemTypeCreatedAt,
          updatedAt: itemTypeUpdatedAt,
        }),
      );
    });

    it('deberia lanzar error si el tipo de item a registrar ya existe', async () => {
      const itemTypeId = crypto.randomUUID().toString();
      const newItemType = new ItemType(
        itemTypeId,
        'Fuente de poder',
        new Date(),
        new Date(),
      );

      const itemTypes: ItemType[] = [newItemType];

      const itemTypeRepository = createItemTypeRepositoryMock();

      itemTypeRepository.findAll.mockResolvedValue(itemTypes);
      itemTypeRepository.create.mockResolvedValue();

      const itemTypeService = new ItemTypeService(itemTypeRepository);

      await expect(itemTypeService.createType(newItemType)).rejects.toThrow(
        ItemTypeAlreadyExistsException,
      );
    });
  });

  describe('getItemTypeById', () => {
    it('deberia obtener un tipo de item', async () => {
      const itemTypeId = crypto.randomUUID().toString();
      const newItemType = new ItemType(
        itemTypeId,
        'Multimetro',
        new Date(),
        new Date(),
      );

      const itemTypeRepository = createItemTypeRepositoryMock();

      itemTypeRepository.findById.mockResolvedValue(newItemType);

      const itemTypeService = new ItemTypeService(itemTypeRepository);

      const result = await itemTypeService.getTypeById(itemTypeId);

      expect(result).toEqual(newItemType);
      expect(itemTypeRepository.findById).toHaveBeenCalledTimes(1);
      expect(itemTypeRepository.findById).toHaveBeenCalledWith(itemTypeId);
    });

    it('deberia lanzar error si el tipo de item a buscar no existe', async () => {
      const itemTypeId = crypto.randomUUID().toString();
      const itemTypeRepository = createItemTypeRepositoryMock();

      itemTypeRepository.findById.mockResolvedValue(null);

      const itemTypeService = new ItemTypeService(itemTypeRepository);

      await expect(itemTypeService.getTypeById(itemTypeId)).rejects.toThrow(
        ItemTypeNotFoundException,
      );
    });
  });

  describe('updateItemType', () => {
    it('deberia actualizar tipo de item', async () => {
      const itemTypeId = crypto.randomUUID().toString();
      const newItemType = new ItemType(
        itemTypeId,
        'Fuente de poder',
        new Date(),
        new Date(),
      );
      const itemTypes: ItemType[] = [];

      const itemTypeRepository = createItemTypeRepositoryMock();

      itemTypeRepository.findById.mockResolvedValue(newItemType);
      itemTypeRepository.findAll.mockResolvedValue(itemTypes);
      itemTypeRepository.update.mockResolvedValue();

      const itemTypeService = new ItemTypeService(itemTypeRepository);

      const updateItemType = new UpdateItemTypeDto('Multimetro');

      await itemTypeService.updateType(itemTypeId, updateItemType);

      expect(itemTypeRepository.update).toHaveBeenCalledTimes(1);
      expect(itemTypeRepository.update).toHaveBeenCalledWith(
        itemTypeId,
        newItemType,
      );
      expect(itemTypeRepository.findAll).toHaveBeenCalledTimes(1);
      expect(itemTypeRepository.findById).toHaveBeenCalledWith(itemTypeId);
    });

    it('deberia lanzan un error al actualizar un tipo de item que no exite', async () => {
      const itemTypeId = crypto.randomUUID().toString();

      const itemTypeRepository = createItemTypeRepositoryMock();

      itemTypeRepository.findById.mockResolvedValue(null);
      itemTypeRepository.update.mockResolvedValue();

      const itemTypeService = new ItemTypeService(itemTypeRepository);

      const updateItemTypeDto = new UpdateItemTypeDto('Oscoloscopio');

      await expect(
        itemTypeService.updateType(itemTypeId, updateItemTypeDto),
      ).rejects.toThrow(ItemTypeNotFoundException);
    });
  });

  describe('deleteItemType', () => {
    it('deberia eliminar tipo de item', async () => {
      const itemTypeId = crypto.randomUUID().toString();
      const newItemType = new ItemType(
        itemTypeId,
        'Multimetro',
        new Date(),
        new Date(),
      );

      const itemTypeRepository = createItemTypeRepositoryMock();

      itemTypeRepository.findById.mockResolvedValue(newItemType);
      itemTypeRepository.delete.mockResolvedValue();

      const itemTypeService = new ItemTypeService(itemTypeRepository);

      await itemTypeService.deleteType(itemTypeId);

      expect(itemTypeRepository.findById).toHaveBeenCalledTimes(1);
      expect(itemTypeRepository.findById).toHaveBeenCalledWith(itemTypeId);
      expect(itemTypeRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('deberia lanzar error al eliminar un tipo de item que no existe', async () => {
      const itemTypeId = crypto.randomUUID().toString();

      const itemTypeRepository = createItemTypeRepositoryMock();

      itemTypeRepository.findById.mockResolvedValue(null);
      itemTypeRepository.delete.mockResolvedValue();

      const itemTypeService = new ItemTypeService(itemTypeRepository);

      await expect(itemTypeService.deleteType(itemTypeId)).rejects.toThrow(
        ItemTypeNotFoundException,
      );
    });
  });
});
