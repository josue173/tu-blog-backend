import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'text',
    unique: true,
  })
  username: string;
  @Column({
    type: 'text',
  })
  first_name: string;
  @Column({
    type: 'text',
  })
  last_name: string;
  @Column({
    type: 'text',
    unique: true,
  })
  email: string;
  @Column({
    type: 'text',
    select: false,
  })
  password: string;
  @Column({
    type: 'date', // yyyy-MM-dd
  })
  date_of_birthday: Date;
  @Column({
    type: 'bool',
    default: true,
  })
  is_active: boolean;
  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }
  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
