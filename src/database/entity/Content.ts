import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Game } from './Game';
import { ContentServer } from './ContentServer';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(type => ContentServer, cs => cs.content, {eager: true})
  contentServer?: ContentServer;

  @Column({ nullable: true })
  gameId?: string;

  @ManyToOne(type => Game, game => game.content, { nullable: true })
  game?: Game;

  @Column()
  downloadPath: string;

  @Column()
  size: string;

  @Column()
  hash: string;
}