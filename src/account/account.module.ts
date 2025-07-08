import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user/user';
import { UserService } from './services/user/user.service';
import { AuthController } from './controllers/auth/auth.controller';
import { CommonModule } from 'src/common/common.module';
import { ProfileController } from './controllers/profile/profile.controller';
import { UserTokenService } from './services/user-token/user-token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/common/services/bcrypt/bcrypt.service';
import { UserToken, UserTokenSchema } from './entities/user-token/user-token';
import { jwtConstants } from './constants/constant';

@Module({
  imports: [
    JwtModule.register({
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
      }
    ])
  ],
  providers: [UserService, UserTokenService],
  controllers: [AuthController, ProfileController]
})
export class AccountModule {}
