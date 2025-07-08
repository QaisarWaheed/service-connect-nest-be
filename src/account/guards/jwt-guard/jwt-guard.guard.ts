import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from 'src/account/constants/constant';
import { AuthUser } from 'src/account/entities/user/user';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not valid');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
      request['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException('Token is not valid');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

declare global {
  namespace Express {
    interface Request {
      user: AuthUser;
    }
  }
}
