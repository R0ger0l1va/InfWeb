// src/modules/album/album.controller.ts
import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlbumService } from './album.service';
import { Album } from '../../entities/album.entity';

// 👇 Importaciones para Swagger
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Media') // Agrupa los endpoints en Swagger bajo "Media"
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Subir un archivo a Cloudinary' })
  @ApiConsumes('multipart/form-data') // Indica que espera form-data
  @ApiBody({
    description: 'Archivo a subir',
    type: 'multipart/form-data', // Especial para archivos
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // Esto habilita el botón "Browse" en Swagger
        },
      },
    },
  })
  @ApiQuery({
    name: 'folder',
    required: true,
    description: 'Carpeta en Cloudinary (ej. noticias, eventos)',
  })
  @ApiQuery({
    name: 'uploadedBy',
    required: false,
    description: 'Usuario que sube el archivo',
  })
  @ApiResponse({
    status: 201,
    description: 'Archivo subido exitosamente',
    type: Album,
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder: string = 'subidaRapida',
    @Body('uploadedBy') uploadedBy?: string,
  ) {
    if (!file) {
      throw new BadRequestException('Debe proporcionar un archivo');
    }
    if (!folder) {
      throw new BadRequestException('Debe especificar una carpeta');
    }

    return this.albumService.uploadFile(file, folder, uploadedBy);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los archivos' })
  @ApiResponse({ status: 200, description: 'Lista de archivos', type: [Album] })
  findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un archivo por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del archivo' })
  @ApiResponse({ status: 200, description: 'Archivo encontrado', type: Album })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Album> {
    return this.albumService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un archivo por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del archivo' })
  @ApiResponse({ status: 200, description: 'Archivo eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.albumService.remove(id);
  }
}
