import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    await this.userService.createSuperAdminIfNotExists();
  }
}
