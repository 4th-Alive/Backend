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
        const userEmail = await this.userService.findEmail(user.email);
        if (!userEmail) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
        }

        const isCorrectPassword = await bcrypt.compare(user.password, userEmail.password);
        if (!isCorrectPassword) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
        }

        const payload = { username: userEmail.email, sub: userEmail.id };
        return { token: this.jwtService.sign(payload) };
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
