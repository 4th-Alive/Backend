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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (request) => {
      //     return request?.cookies?.Refresh;
      //   },
      // ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: { cookies: { Refresh: any; }; }, payload:any) {
    const refreshToken = req.cookies?.Refresh;
    const decodingUserData = await this.userService.getRefreshTokenMatches(refreshToken, payload.id);
    const newPayload = { email: decodingUserData.email, sub : decodingUserData.id} 
    const newAccessToken = await this.authService.getAccessJwtToken(newPayload)
    // console.log(newAccessToken);
    return newAccessToken.token;
  }
}