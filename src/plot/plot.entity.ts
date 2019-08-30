import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Plot {

  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;
}
