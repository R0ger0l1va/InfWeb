// src/entities/media.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  // Nombre original del archivo (ej. "foto_facultad.jpg")
  @Column()
  originalName: string;

  // Extensión o tipo MIME (útil para filtrar)
  @Column()
  mimeType: string; // ej. "image/jpeg", "application/pdf"

  // Tamaño en bytes (para estadísticas o límites)
  @Column({ type: 'int' })
  size: number;

  // URL pública de Cloudinary (la que usas en el frontend)
  @Column()
  url: string;

  // ID único de Cloudinary (necesario para borrar/editar después)
  @Column()
  publicId: string;

  // Carpeta en Cloudinary (ej. "facultad/noticias", "facultad/eventos")
  @Column({ nullable: true })
  folder?: string;

  // ¿Es una imagen? Útil para mostrar previsualizaciones
  @Column({ default: false })
  isImage: boolean;

  // Usuario que subió el archivo (opcional, si tienes autenticación)
  @Column({ nullable: true })
  uploadedBy?: string; // o relación con User

  // Fecha de subida
  @CreateDateColumn()
  createdAt: Date;

  // Última modificación (por si actualizas metadatos)
  @UpdateDateColumn()
  updatedAt: Date;
}
