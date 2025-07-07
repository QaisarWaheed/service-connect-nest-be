import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user/user';
import { UserService } from './services/user/user.service';
import { AuthController } from './controllers/auth/auth.controller';
import { CommonModule } from 'src/common/common.module';
import { ProfileController } from './controllers/profile/profile.controller';
import { UserTokenService } from './services/user-token/user-token.service';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  providers: [UserService, UserTokenService],
  controllers: [AuthController, ProfileController]
})
export class AccountModule {}
