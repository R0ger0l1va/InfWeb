import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { LoveMessageService } from '../love-message/love-message.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly loveMessageService: LoveMessageService,
  ) {}

  async onModuleInit() {
    await this.userService.createSuperAdminIfNotExists();
    await this.loveMessageService.seed();
  }
}
