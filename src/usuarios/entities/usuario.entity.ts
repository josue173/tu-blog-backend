// Se define como será la información en la tabla

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
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
  })
  user_password: string;
  @Column({
    type: 'date', // yyyy-MM-dd
  })
  user_date_of_birthday: Date;
}
