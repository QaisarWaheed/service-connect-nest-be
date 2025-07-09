import { Module } from '@nestjs/common';

import { AccountModule } from './account/account.module';

import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from './common/common.module';

@Module({
  imports: [
    AccountModule,

    MongooseModule.forRoot('mongodb://127.0.0.1:27017/service'),
    CommonModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
