import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinTable,
    JoinColumn,
  } from 'typeorm';
  import { Users } from './user.entity';
  
  @Entity()
  export class Product {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar"})
    amount: string

    @Column({type: "varchar"})
    description: string;

    @ManyToOne( () => Users, (user) => user.products, {onDelete: "SET NULL"})
    @JoinColumn({name:"users"})
    user: Users;
  }
  