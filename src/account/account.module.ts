import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user/user';
import { UserService } from './services/user/user.service';
import { AuthController } from './controllers/auth/auth.controller';
import { CommonModule } from 'src/common/common.module';
import { ProfileController } from './controllers/profile/profile.controller';
import { UserTokenService } from './services/user-token/user-token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { UserToken, UserTokenSchema } from './entities/user-token/user-token';
import { jwtConstants } from './constants/constant';
import { MailerModule } from 'src/mailer/mailer.module';
import { TasksController } from '../task/controllers/tasks/tasks.controller';
import { TasksService } from '../task/services/tasks/tasks.service';
import TasksSchema, { Tasks } from 'src/task/entity/tasks.entity';
import { AuthGuard } from './guards/jwt-guard/jwt-guard.guard';

@Module({
  imports: [
    MailerModule,

    JwtModule.register({
      global: true,
      secret: jwtConstants.secret
    }),
    CommonModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: UserToken.name,
        schema: UserTokenSchema
      },
      { name: Tasks.name, schema: TasksSchema }
    ])
  ],
  providers: [UserService, UserTokenService, AuthGuard, JwtService],
  controllers: [AuthController, ProfileController],
  exports: [AuthGuard, JwtService]
})
export class AccountModule {}
