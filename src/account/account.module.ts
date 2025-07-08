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
  providers: [UserService, UserTokenService, PasswordResetService],
  controllers: [AuthController, ProfileController]
})
export class AccountModule {}
