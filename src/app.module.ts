import { Module } from '@nestjs/common';

import { AccountModule } from './account/account.module';
import { MailerModule } from './mailer/mailer.module';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from './common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './account/constants/constant';

@Module({
  imports: [
    AccountModule,
    MailerModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/service'),
    CommonModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
