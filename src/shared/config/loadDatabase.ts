import { DataSource } from 'typeorm';
import {
  postgresHost,
  postgresPort,
  postgresUser,
  postgresPassword,
} from '@config/loadEnvironment.js';
import { StudentEntity } from '@students/entities/StudentEntity.js';

export const dataSource = new DataSource({
  type: 'postgres',
  host: postgresHost,
  port: Number(postgresPort),
  username: postgresUser,
  password: postgresPassword,
  database: 'postgres',
  entities: [StudentEntity],
  synchronize: true,
});
