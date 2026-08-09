import { Column, Entity } from 'typeorm';
import { ItemCategory } from '@items/types/ItemCategory.js';
import { ItemType } from '../types/ItemType.js';

@Entity('items')
export class ItemEntity {
  @Column({ type: 'uuid', primary: true })
  id: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, enum: ItemCategory })
  category: string;

  @Column({ type: 'varchar', length: 255, enum: ItemType })
  type: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    category: string,
    type: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
