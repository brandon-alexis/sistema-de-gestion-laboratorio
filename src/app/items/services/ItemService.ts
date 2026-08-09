import type { ItemRepository } from '@items/repositories/ItemRepository.js';
import { Item } from '@items/models/Item.js';
import { ItemNotFoundException } from '@items/exceptions/ItemNotFoundException.js';
import { ItemAlreadyExistsException } from '@items/exceptions/ItemAlreadyExistsException.js';
import type { UpdateItemDto } from '@items/dtos/UpdateItemDto.js';

export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  public async createItem(item: Item): Promise<void> {
    const items: Item[] = await this.itemRepository.findAll();

    const itemExists: boolean = items.some(
      (_item) => _item.getName() === item.getName(),
    );

    if (itemExists) {
      throw new ItemAlreadyExistsException();
    }

    await this.itemRepository.create(item);
  }

  public async getAllItems(): Promise<Item[]> {
    return this.itemRepository.findAll();
  }

  public async getItemById(id: string): Promise<Item> {
    const foundItem: Item | null = await this.itemRepository.findById(id);

    if (!foundItem) {
      throw new ItemNotFoundException();
    }

    return foundItem;
  }

  public async updateItem(id: string, dto: UpdateItemDto): Promise<void> {
    const foundItem: Item | null = await this.itemRepository.findById(id);

    if (!foundItem) {
      throw new ItemNotFoundException();
    }

    const name = dto.getName();

    if (name !== undefined) {
      const items: Item[] = await this.itemRepository.findAll();

      const itemExists: boolean = items.some(
        (_item) => _item.getName() === name && _item.getId() !== id,
      );

      if (itemExists) {
        throw new ItemAlreadyExistsException();
      }

      foundItem.setName(name);
    }

    const category = dto.getCategory();

    if (category !== undefined) {
      foundItem.setCategory(category);
    }

    const type = dto.getType();

    if (type !== undefined) {
      foundItem.setType(type);
    }

    foundItem.setUpdatedAt(new Date());

    await this.itemRepository.update(id, foundItem);
  }

  public async deleteItem(id: string): Promise<void> {
    const foundItem: Item | null = await this.itemRepository.findById(id);

    if (!foundItem) {
      throw new ItemNotFoundException();
    }

    await this.itemRepository.delete(id);
  }
}
