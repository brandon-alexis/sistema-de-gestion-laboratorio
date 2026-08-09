import type { Request, Response } from 'express';

import type { ItemService } from '@items/services/ItemService.js';
import type { ResponseItemDto } from '@items/dtos/ResponseItemDto.js';
import type { Item } from '@items/models/Item.js';
import type { itemParams } from '@items/types/itemParams.js';
import type { ItemBody } from '@items/types/itemBody.js';
import { CreateItemDto } from '@items/dtos/CreateItemDto.js';
import { ItemMapper } from '@items/mappers/ItemMapper.js';
import { UpdateItemDto } from '@items/dtos/UpdateItemDto.js';

export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  public createItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, category, type }: ItemBody = req.body;

      const createItemDto: CreateItemDto = new CreateItemDto(
        name,
        category,
        type,
      );

      const item: Item = ItemMapper.fromCreateDtoToItem(createItemDto);

      await this.itemService.createItem(item);

      res.status(201).json({ message: 'Item creado con exito' });
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getAllItems = async (_: Request, res: Response): Promise<void> => {
    try {
      const items: ResponseItemDto[] = (
        await this.itemService.getAllItems()
      ).map(ItemMapper.fromItemToResponseItemDto);

      res.status(200).json(items);
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getItemById = async (
    req: Request<itemParams>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const item: Item = await this.itemService.getItemById(id);

      const responseItemDto: ResponseItemDto =
        ItemMapper.fromItemToResponseItemDto(item);

      res.status(200).json(responseItemDto);
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };

  public updateItem = async (
    req: Request<itemParams>,
    res: Response,
  ): Promise<void> => {
    try {
      const { name, category, type }: ItemBody = req.body;
      const { id }: itemParams = req.params;

      const updateItemDto = new UpdateItemDto(name, category, type);

      await this.itemService.updateItem(id, updateItemDto);

      res.status(200).json({ message: 'Item actualizado con exito' });
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };

  public deleteItem = async (
    req: Request<itemParams>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id }: itemParams = req.params;

      await this.itemService.deleteItem(id);

      res.status(200).json({ message: 'Item eliminado con exito' });
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };
}
