import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: { cookies: { Refresh: any; }; }, payload:any) {
    const refreshToken = req.cookies?.Refresh;
    const decodingUserData = await this.userService.getRefreshTokenMatches(refreshToken, payload.pk);
    //refresh 토큰도 추후 family uid로 변경
    const newPayload = { uid: decodingUserData.uid, sub : decodingUserData.pk} 
    const newAccessToken = await this.authService.getAccessJwtToken(newPayload)
    
    return newAccessToken.token;
  }
}