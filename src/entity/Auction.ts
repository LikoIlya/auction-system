import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bid } from './Bid';
import { User } from './User';

@Entity()
export class Auction {
  // Auto Generated Columns

  @PrimaryGeneratedColumn() public id: number;

  @Column() public name: string;

  @Column() public description: string;

  @Column() public location: string;

  @Column({ type: 'timestamp with time zone' })
  public endTime: string;

  // @Column() public createdBy: number;

  // @Column() public updatedBy: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: string;

  // Relationships

  @OneToMany(() => Bid, (bid: Bid) => bid.auction)
  public bids: Bid[];

  @ManyToOne(() => User, (user: User) => user.updatedAuctions)
  public updatedBy: User;

  @ManyToOne(() => User, (user: User) => user.createdAuctions)
  public createdBy: User;
}
