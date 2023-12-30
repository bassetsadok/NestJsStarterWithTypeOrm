import { Repository, DeepPartial, FindOneOptions, FindOptionsWhere, ObjectLiteral, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Entity()
export class BaseEntity implements ObjectLiteral {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
  }
  
  
  @Injectable()
  export abstract class BaseDao<T extends BaseEntity> {
    private repository: Repository<T>;
  
    constructor(repository: Repository<T>) {
      this.repository = repository;
    }
  
    findAll(): Promise<T[]> {
      return this.repository.find();
    }
  
    findOne(id: number, options?: FindOneOptions<T>): Promise<T | undefined> {
      return this.repository.findOne({ where: { id } as FindOptionsWhere<T>, ...options });
    }
  

  findOneBy(conditions: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOne({ where: conditions });
  }

  create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: number, data: QueryDeepPartialEntity<T>): Promise<T | null> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }
  

  delete(id: number): Promise<void> {
    return this.repository.delete(id).then(() => undefined);
  }
}
