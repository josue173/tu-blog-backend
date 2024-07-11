import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;
  @Column({
    type: 'text',
    unique: true,
  })
  username: string;
  @Column({
    type: 'text',
  })
  user_first_name: string;
  @Column({
    type: 'text',
  })
  user_last_name: string;
  @Column({
    type: 'text',
    unique: true,
  })
  user_email: string;
  @Column({
    type: 'text',
    select: false
  })
  user_password: string;
  @Column({
    type: 'date', // yyyy-MM-dd
  })
  user_date_of_birthday: Date;
  @Column({
    type: 'bool',
    default: true,
  })
  is_active: boolean;
}
