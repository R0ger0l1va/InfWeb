// app.module.ts
import { Module } from '@nestjs/common';
import { AlbumModule } from './modules/album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeedService } from './modules/user/seed.service';
import { WebsocketModule } from './modules/websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // opcional, pero útil
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: configService.get('DATABASE_URL') ? { rejectUnauthorized: false } : false,
      }),
      inject: [ConfigService],
    }),
    AlbumModule,
    UserModule,
    AuthModule,
    WebsocketModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
