import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user/user';
import { UserService } from './services/user/user.service';
import { AuthController } from './controllers/auth/auth.controller';
import { CommonModule } from 'src/common/common.module';
import { ProfileController } from './controllers/profile/profile.controller';
import { UserTokenService } from './services/user-token/user-token.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordResetService } from './services/password-reset/password-reset.service';
import { GuardController } from './controllers/guard/guard.controller';
import { GuardService } from './services/guard/guard.service';

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
  providers: [UserService, UserTokenService, PasswordResetService, GuardService],
  controllers: [AuthController, ProfileController, GuardController]
})
export class AccountModule {}
