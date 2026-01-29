import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('album')
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @Column()
  url: string; //URL de cloudinary para el frontend

  @Column()
  publicId: string; //ID unico de Cloudinary para editar/borrar despues

  @Column() //Carpeta en Cloudinary
  folder?: string;

  @Column({ default: false })
  isImage: boolean;

  //Usuario que subio el archivo en caso de tener Auth
  @Column({ nullable: true })
  uploadedBy?: string; // o relacion con User

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
