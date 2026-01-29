import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/entities/album.entity';

//TODO Forma alternativa de configurar la conexion a BD

// const databaseConfig1 = TypeOrmModule.forRoot({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT ?? '5433', 10),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   autoLoadEntities: true,
//   entities: [Album],
// });

//TODO Forma de configurar la conexion a BD usada en otros projectos

const databaseConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [Album],
    autoLoadEntities: true,
    synchronize: true,
  }),
  inject: [ConfigService],
});

export default databaseConfig;
