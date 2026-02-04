// src/imgbb/imgbb.module.ts
import { Module } from '@nestjs/common';
import { ImgbbService } from './imgBB.service';

@Module({
  providers: [ImgbbService],
  exports: [ImgbbService],
})
export class ImgbbModule {}
