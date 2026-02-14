import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoveMessage } from '../../entities/specialEventsEntityes/loveMessage';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoveMessageService {
  private readonly logger = new Logger(LoveMessageService.name);

  constructor(
    @InjectRepository(LoveMessage)
    private readonly loveMessageRepository: Repository<LoveMessage>,
  ) {}

  async findAll(): Promise<LoveMessage[]> {
    return this.loveMessageRepository.find({
      order: { messageDate: 'DESC' },
    });
  }

  async incrementLikes(id: number): Promise<LoveMessage> {
    const message = await this.loveMessageRepository.findOne({ where: { id } });
    if (!message) {
      throw new Error('Message not found');
    }
    message.likes = (message.likes || 0) + 1;
    return this.loveMessageRepository.save(message);
  }

  async seed() {
    const count = await this.loveMessageRepository.count();
    if (count > 0) {
      this.logger.log('Love messages already seeded.');
      return;
    }

    const filePath = path.join(
      process.cwd(),
      'src/mocks/25 cartas prueba.json',
    );
    if (!fs.existsSync(filePath)) {
      // Fallback for dist environment
      const distPath = path.join(
        __dirname,
        '../../mocks/25 cartas prueba.json',
      );
      if (fs.existsSync(distPath)) {
        await this.proceedWithSeed(distPath);
      } else {
        this.logger.error(`Mock file not found at ${filePath} or ${distPath}`);
      }
      return;
    }

    await this.proceedWithSeed(filePath);
  }

  private async proceedWithSeed(filePath: string) {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const mockData = JSON.parse(rawData);

    const messages = mockData.map((item: any) => {
      const message = new LoveMessage();
      message.destinator = item['to'];
      message.message = item['message'];
      message.messageDate = new Date(item['timestamp']);
      return message;
    });

    await this.loveMessageRepository.save(messages);
    this.logger.log(`Successfully seeded ${messages.length} love messages.`);
  }
}
