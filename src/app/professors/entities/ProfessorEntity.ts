import { Column, Entity } from 'typeorm';

@Entity('professors')
export class ProfessorEntity {
  @Column({ type: 'uuid', primary: true })
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  fullname: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  constructor(id: string, fullname: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.fullname = fullname;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
