
import { Entity, PrimaryGeneratedColumn, Column,  } from 'typeorm';
import { BaseEntity } from 'src/base/daos/BaseDao';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: number;

}
