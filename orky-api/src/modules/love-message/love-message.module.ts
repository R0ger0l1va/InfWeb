import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoveMessage } from '../../entities/specialEventsEntityes/loveMessage';
import { LoveMessageService } from './love-message.service';
import { LoveMessageController } from './love-message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LoveMessage])],
  providers: [LoveMessageService],
  controllers: [LoveMessageController],
  exports: [LoveMessageService],
})
export class LoveMessageModule {}
