import type { ItemTypeRepository } from '@itemTypes/repositories/ItemTypeRepository.js';
import { ItemType } from '@itemTypes/models/ItemType.js';
import { ItemTypeAlreadyExistsException } from '@itemTypes/exceptions/ItemTypeAlreadyExistsException.js';
import { ItemTypeNotFoundException } from '@itemTypes/exceptions/ItemTypeNotFoundException.js';
import type { UpdateItemTypeDto } from '@itemTypes/dtos/UpdateItemTypeDto.js';

export class ItemTypeService {
  constructor(private readonly itemTypeRepository: ItemTypeRepository) {}

  public async createType(itemType: ItemType): Promise<void> {
    const itemTypes: ItemType[] = await this.itemTypeRepository.findAll();

    const itemTypeExists: boolean = itemTypes.some(
      (_itemType) => _itemType.getName() === itemType.getName(),
    );

    if (itemTypeExists) {
      throw new ItemTypeAlreadyExistsException();
    }

    await this.itemTypeRepository.create(itemType);
  }

  public async getAllTypes(): Promise<ItemType[]> {
    return this.itemTypeRepository.findAll();
  }

  public async getTypeById(id: string): Promise<ItemType> {
    const foundType: ItemType | null =
      await this.itemTypeRepository.findById(id);

    if (!foundType) {
      throw new ItemTypeNotFoundException();
    }

    return foundType;
  }

  public async updateType(id: string, dto: UpdateItemTypeDto): Promise<void> {
    const foundType: ItemType | null =
      await this.itemTypeRepository.findById(id);

    if (!foundType) {
      throw new ItemTypeNotFoundException();
    }

    const name = dto.getName();

    if (name !== undefined) {
      const itemTypes: ItemType[] = await this.itemTypeRepository.findAll();

      const itemTypeExists: boolean = itemTypes.some(
        (_itemType) => _itemType.getName() === name && _itemType.getId() !== id,
      );

      if (itemTypeExists) {
        throw new ItemTypeAlreadyExistsException();
      }

      foundType.setName(name);
      foundType.setUpdatedAt(new Date());
    }

    await this.itemTypeRepository.update(id, foundType);
  }

  public async deleteType(id: string): Promise<void> {
    const foundType: ItemType | null =
      await this.itemTypeRepository.findById(id);

    if (!foundType) {
      throw new ItemTypeNotFoundException();
    }

    await this.itemTypeRepository.delete(id);
  }
}
