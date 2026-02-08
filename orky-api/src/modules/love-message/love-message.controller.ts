import { Controller, Get, Post } from '@nestjs/common';
import { LoveMessageService } from './love-message.service';
import { LoveMessage } from '../../entities/specialEventsEntityes/loveMessage';

@Controller('love-message')
export class LoveMessageController {
  constructor(private readonly loveMessageService: LoveMessageService) {}

  @Get()
  async findAll(): Promise<LoveMessage[]> {
    return this.loveMessageService.findAll();
  }

  @Post('seed')
  async seed() {
    await this.loveMessageService.seed();
    return { message: 'Seeding completed' };
  }
}
