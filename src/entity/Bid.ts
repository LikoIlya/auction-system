import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Auction } from './Auction';
import { User } from './User';

@Entity()
export class Bid {
  @PrimaryGeneratedColumn() public id: number;

  @Column() public amount: number;

  // @Column() public createdBy: number;

  // @Column() public updatedBy: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: string;

  @Column() public auctionId: number;

  // Relations

  @ManyToOne(() => Auction, (auction: Auction) => auction.bids)
  public auction: Auction;

  @ManyToOne(() => User, (user: User) => user.updatedBids)
  public updatedBy: User;

  @ManyToOne(() => User, (user: User) => user.createdBids)
  public createdBy: User;
}
