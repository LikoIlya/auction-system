import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Auction } from './Auction';
import { Bid } from './Bid';

@Entity()
export class User {
  @PrimaryGeneratedColumn() public id: number;

  @Column({ unique: true })
  public email: string;

  @Column() public firstName: string;

  @Column() public lastName: string;

  @Column() public age: number;

  @Column() public createdBy: number;

  @Column() public updatedBy: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: string;

  @OneToMany(() => Auction, (auction: Auction) => auction.updatedBy)
  public updatedAuctions: Auction[];

  @OneToMany(() => Auction, (auction: Auction) => auction.createdBy)
  public createdAuctions: Auction[];

  @OneToMany(() => Bid, (bid: Bid) => bid.updatedBy)
  public updatedBids: Bid[];

  @OneToMany(() => Bid, (bid: Bid) => bid.createdBy)
  public createdBids: Bid[];
}
