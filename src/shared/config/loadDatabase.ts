import { DataSource } from 'typeorm';
import {
  postgresHost,
  postgresPort,
  postgresUser,
  postgresPassword,
} from '@config/loadEnvironment.js';
import { StudentEntity } from '@students/entities/StudentEntity.js';
import { ProfessorEntity } from '@professors/entities/ProfessorEntity.js';
import { ItemEntity } from '@items/entities/ItemEntity.js';
import { ItemCategoryEntity } from '@itemCategories/entities/ItemCategoryEntity.js';
import { ItemTypeEntity } from '@itemTypes/entities/ItemTypeEntity.js';

export const dataSource = new DataSource({
  type: 'postgres',
  host: postgresHost,
  port: Number(postgresPort),
  username: postgresUser,
  password: postgresPassword,
  database: 'postgres',
  entities: [
    StudentEntity,
    ProfessorEntity,
    ItemEntity,
    ItemCategoryEntity,
    ItemTypeEntity,
  ],
  synchronize: true,
});
