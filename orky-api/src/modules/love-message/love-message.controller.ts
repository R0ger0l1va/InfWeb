import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LoveMessageService } from './love-message.service';
import { LoveMessage } from '../../entities/specialEventsEntityes/loveMessage';

@Controller('love-message')
export class LoveMessageController {
  constructor(private readonly loveMessageService: LoveMessageService) {}

  @Get()
  async findAll(): Promise<LoveMessage[]> {
    return this.loveMessageService.findAll();
  }

  @Patch(':id/like')
  async incrementLikes(@Param('id') id: string): Promise<LoveMessage> {
    return this.loveMessageService.incrementLikes(+id);
  }

  @Post('seed')
  async seed() {
    await this.loveMessageService.seed();
    return { message: 'Seeding completed' };
  }
}
