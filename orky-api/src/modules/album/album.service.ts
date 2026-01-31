// src/modules/album/album.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Readable } from 'stream';
import { Album } from '../../entities/album.entity';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  /**
   * Sube un archivo a Cloudinary y guarda sus metadatos en la BD
   */
  async uploadFile(
    file:
      | {
          buffer: Buffer;
          originalname: string;
          mimetype: string;
          size: number;
        }
      | undefined,
    folder: string,
    uploadedBy?: string,
  ): Promise<Album> {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    try {
      // Subir a Cloudinary
      const uploadResult = await new Promise<{
        secure_url: string;
        public_id: string;
      }>((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'auto',
            timeout: 60000,
          },
          (error, result) => {
            if (error) {
              reject(
                new Error(
                  error instanceof Error
                    ? error.message
                    : JSON.stringify(error),
                ),
              );
            } else if (result) {
              resolve(result);
            } else {
              reject(new Error('No result from upload'));
            }
          },
        );

        if (!file.buffer) {
          reject(new Error('File buffer is not available'));
          return;
        }
        const readable: Readable = Readable.from([file.buffer]);
        readable.pipe(upload);
      });

      // Criar registro en BD
      const album = this.albumRepository.create({
        originalName: file.originalname ?? '',
        mimeType: file.mimetype,
        size: file.size,
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        folder,
        isImage: file.mimetype.startsWith('image/'),
        uploadedBy,
      });

      return await this.albumRepository.save(album);
    } catch (error) {
      console.error('Error al subir archivo:', error);
      throw new InternalServerErrorException('Error al procesar el archivo');
    }
  }

  /**
   * Obtiene todos los archivos
   */
  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  /**
   * Obtiene un archivo por ID
   */
  async findOne(id: number): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Archivo con ID ${id} no encontrado`);
    }
    return album;
  }

  /**
   * Elimina un archivo (de Cloudinary y de la BD)
   */
  async remove(id: number): Promise<void> {
    const album = await this.findOne(id);

    try {
      // Eliminar de Cloudinary
      await cloudinary.uploader.destroy(album.publicId);

      // Eliminar de la BD
      await this.albumRepository.remove(album);
    } catch (error) {
      console.error('Error al eliminar archivo:', error);
      throw new InternalServerErrorException('Error al eliminar el archivo');
    }
  }
}
