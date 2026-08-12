import { Column, Entity, OneToMany } from 'typeorm';
import { ItemEntity } from '@items/entities/ItemEntity.js';

@Entity('item_types')
export class ItemTypeEntity {
  @Column({ type: 'uuid', primary: true })
  id: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  name: string;

  @OneToMany(() => ItemEntity, (item) => item.type)
  items: ItemEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    items: ItemEntity[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.items = items;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
