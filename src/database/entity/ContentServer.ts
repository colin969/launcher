import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Game } from './Game';
import { Content } from './Content';

@Entity()
export class ContentServer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  host: string;

  @Column()
  gameCount: number;

  @OneToMany(type => Content, c => c.contentServer, {cascade: true})
  content: Content[];
}