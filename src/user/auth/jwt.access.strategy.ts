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
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            // 쿠키 쿠키에 저장하면 이거
            // jwtFromRequest: ExtractJwt.fromExtractors([
            //     (request) => {
            //       return request?.cookies?.Authentication;
            //     },
            //   ]),
            secretOrKey: process.env.JWT_ACCESS_SECRET,
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        console.log('JWT Payload:', payload); // 디버깅을 위한 로그
        const user = await this.userService.findEmail(payload.username);
        if (!user) {
            throw new UnauthorizedException({ message: '회원 존재하지 않음.' });
        }
        return { useremail : user.email, userId : user.id};
    }
    
}


