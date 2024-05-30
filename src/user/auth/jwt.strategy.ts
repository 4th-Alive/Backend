import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
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


