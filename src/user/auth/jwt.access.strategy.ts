import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
    Strategy, 
    'jwt-access-token',
) {
    constructor(
        private readonly userService: UserService
    ) {
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request) => {
                  return request?.cookies?.Authentication;
                },
              ]),
            secretOrKey: process.env.JWT_ACCESS_SECRET,
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        console.log('JWT Payload:', payload); // 디버깅을 위한 로그
        const user = await this.userService.findEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException({ message: '회원 존재하지 않음.' });
        }
        return { email : user.email, userId : user.id};
    }
    
}


