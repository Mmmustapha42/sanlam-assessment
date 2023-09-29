import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';


@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({type: "bigint"})
  id: string;

  @Column({type:"varchar"})
  customer_name: string

  @Column({type:"varchar"})
  date_of_birth: string

  @Column({type:"varchar"})
  telephone_number: string

  @Column({type:"varchar"})
  username:string

  @Column({type: "varchar"})
  password: string

  @OneToMany(() => Product, product => product.user)
  products: Product[]


  @Column({type:"varchar"})
  amount_paid: string

  @Column({type:"varchar"})
  date_of_payment: string

  @CreateDateColumn()
  created_at: Date;

}