import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  onModuleInit() {
    const url = process.env.SELF_PING_URL;
    if (url) {
      this.logger.log(`Starting self-ping for: ${url}`);
      // Ping cada 10 minutos (600,000 ms) para evitar que Render se duerma
      setInterval(() => {
        axios
          .get(url)
          .then(() => this.logger.log('Self-ping successful'))
          .catch((error: Error) =>
            this.logger.error(`Self-ping failed: ${error.message}`),
          );
      }, 600000);
    }
  }

  getHello(): string {
    return 'OrkY API is running!';
  }
}
