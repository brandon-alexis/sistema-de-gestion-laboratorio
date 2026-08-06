import { Entity, Column } from 'typeorm';

@Entity('students')
export class StudentEntity {
  @Column({ type: 'uuid', primary: true })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  fullname: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  documentNumber: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  constructor(
    id: string,
    fullname: string,
    documentNumber: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.fullname = fullname;
    this.documentNumber = documentNumber;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
