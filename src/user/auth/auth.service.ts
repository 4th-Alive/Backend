import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService, GuestService } from '../user.service';
import { signInDTO, guestSigninDTO } from '../dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly guestService: GuestService,
    ) {}

    async validateUser(user: signInDTO) {
        const userId = await this.userService.findId(user.id);
        if (!userId) {
            throw new UnauthorizedException('아이디 또는 비밀번호가 일치하지 않습니다.');
        }

        const isCorrectPassword = await bcrypt.compare(user.password, userId.password);
        if (!isCorrectPassword) {
            throw new UnauthorizedException('아이디 또는 비밀번호가 일치하지 않습니다.');
        }

        // 토큰에 uid와 family uid 사용, sub 추후 제거
        const payload = { uid: userId.uid, sub: userId.pk };

        return this.getAccessJwtToken(payload);
    }

    async getAccessJwtToken(payload : any){
        console.log(payload);
        return { token : this.jwtService.sign(payload) }
    }

    async getRefreshJwtToken(pk: number){
        const payload = { pk };
        return { token : this.jwtService.sign(payload,{
                secret : process.env.JWT_REFRESH_SECRET,
                expiresIn : process.env.JWT_REFRESH_EXPIRATION_TIME
            })
        }
    }

    async validateGuest(guest: guestSigninDTO) {
        const uid = await this.guestService.findUid(guest.uid);
        if (!uid) {
            throw new UnauthorizedException('UID 또는 비밀번호가 일치하지 않습니다.');
        }

        const isCorrectPassword = await bcrypt.compare(guest.password, uid.password);
        if (!isCorrectPassword) {
            throw new UnauthorizedException('UID 또는 비밀번호가 일치하지 않습니다.');
        }

        return "success signin(Guest)";
    }
}
