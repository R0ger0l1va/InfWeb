import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { ImgbbModule } from 'src/apis/imgBB/imgBB.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ImgbbModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
