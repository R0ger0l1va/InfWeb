import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Role {
  ADMIN = 'ADMIN',
  MEDIAMANAGER = 'MEDIAMANAGER',
  CONFIGMANAGER = 'CONFIGMANAGER',
}

@Entity('user')
export class User {
  @ApiProperty({ example: 1, description: 'ID único del usuario' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Nombre del usuario' })
  @Column()
  name: string;

  @ApiProperty({
    example: ['correo@gmail.com'],
    description: 'Correo electrónico del usuario',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  @Column()
  password: string;

  @ApiProperty({ example: 'ADMIN', description: 'Rol del usuario' })
  @Column()
  role: Role;

  @ApiProperty({
    example: 'https://i.ibb.co/abc123/avatar.jpg',
    required: false,
  })
  @Column({ nullable: true })
  avatarUrl: string;
}
