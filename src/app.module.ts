import { Module } from '@nestjs/common';

import { AccountModule } from './account/account.module';

import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from './common/common.module';
import { TaskModule } from './task/task.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './account/constants/constant';
import { OfferModule } from './offer/offer.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    AccountModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/service'),
    CommonModule,
    TaskModule,
    OfferModule,
    ReviewModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
