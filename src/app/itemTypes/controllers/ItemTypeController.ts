import type { Request, Response } from 'express';

import type { ItemTypeService } from '@itemTypes/services/ItemTypeService.js';
import type { ResponseItemTypeDto } from '@itemTypes/dtos/ResponseItemTypeDto.js';
import type { ItemType } from '@itemTypes/models/ItemType.js';
import type { itemTypeParams } from '@itemTypes/types/itemTypeParams.js';
import type { ItemTypeBody } from '@itemTypes/types/itemTypeBody.js';
import { CreateItemTypeDto } from '@itemTypes/dtos/CreateItemTypeDto.js';
import { ItemTypeMapper } from '@itemTypes/mappers/ItemTypeMapper.js';
import { UpdateItemTypeDto } from '@itemTypes/dtos/UpdateItemTypeDto.js';

export class ItemTypeController {
  constructor(private readonly itemTypeService: ItemTypeService) {}

  createType = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name }: ItemTypeBody = req.body;

      const createDto: CreateItemTypeDto = new CreateItemTypeDto(name);

      const itemType: ItemType =
        ItemTypeMapper.fromCreateDtoToItemType(createDto);

      await this.itemTypeService.createType(itemType);

      res.status(201).json({ message: 'Tipo de item creado con exito' });
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getAllTypes = async (_: Request, res: Response): Promise<void> => {
    try {
      const itemTypes: ResponseItemTypeDto[] = (
        await this.itemTypeService.getAllTypes()
      ).map(ItemTypeMapper.fromItemTypeToResponseDto);

      res.status(200).json(itemTypes);
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getTypeById = async (
    req: Request<itemTypeParams>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const itemType: ItemType = await this.itemTypeService.getTypeById(id);

      const responseDto: ResponseItemTypeDto =
        ItemTypeMapper.fromItemTypeToResponseDto(itemType);

      res.status(200).json(responseDto);
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };

  public updateType = async (req: Request<itemTypeParams>, res: Response) => {
    try {
      const { name }: ItemTypeBody = req.body;
      const { id }: itemTypeParams = req.params;

      const updateDto = new UpdateItemTypeDto(name);

      await this.itemTypeService.updateType(id, updateDto);

      res.status(200).json({ message: 'Tipo de item actualizado con exito' });
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };

  public deleteType = async (req: Request<itemTypeParams>, res: Response) => {
    try {
      const { id }: itemTypeParams = req.params;

      await this.itemTypeService.deleteType(id);

      res.status(200).json({ message: 'Tipo de item eliminado con exito' });
    } catch (error: Error | any) {
      res.status(404).json({ error: error.message });
    }
  };
}
