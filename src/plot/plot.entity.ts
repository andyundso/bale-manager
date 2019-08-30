import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export default class Plot extends BaseEntity {

  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;
}
