// src/modules/album/album.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../../entities/album.entity';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Album])],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService], // por si lo usas en otros módulos
})
export class AlbumModule {}
