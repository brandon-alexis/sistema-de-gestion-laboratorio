import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ItemCategoryEntity } from '@itemCategories/entities/ItemCategoryEntity.js';
import { ItemTypeEntity } from '@itemTypes/entities/ItemTypeEntity.js';

@Entity('items')
export class ItemEntity {
  @Column({ type: 'uuid', primary: true })
  id: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  name: string;

  @ManyToOne(() => ItemCategoryEntity, (category) => category.items, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'categoryId' })
  category: ItemCategoryEntity;

  @ManyToOne(() => ItemTypeEntity, (type) => type.items, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'typeId' })
  type: ItemTypeEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    category: ItemCategoryEntity,
    type: ItemTypeEntity,
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
