import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';
import { FamilyService } from 'src/family/family.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly familyService: FamilyService
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
    // console.log(decodingUserData);
    //refresh 토큰도 추후 family uid로 변경
    const family = await this.familyService.findFamilyUid(decodingUserData);
    // console.log(family);
    if(family == null) var newPayload = {u_uid: decodingUserData.uid, f_uid: "null"}
    else var newPayload = { u_uid: decodingUserData.uid, f_uid: family.uid };
    // console.log(newPayload);
    const newAccessToken = await this.authService.getAccessJwtToken(newPayload)
    
    return newAccessToken.token;
  }
}