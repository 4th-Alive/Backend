import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Guest } from './entities/user.entity';
import { Repository } from 'typeorm';
import { signUpDTO, signInDTO, guestSigninDTO, guestSignupDTO } from './dto/auth.dto';
import * as  bcrypt from 'bcrypt';
import { uid } from 'uid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor( 
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ){}

    async create(user: signUpDTO){
        const existEmail = await this.findEmail(user.email)
        if(existEmail){ throw new ConflictException("이미 사용중인 이메일"); }
        
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        
        await this.userRepository.save(user);
        return "success signup"
    }

    async findEmail(email : string){
        return await this.userRepository.findOne({
            where: {
                email,
            },
        });
    }

    async findPassword(password : string){
        return await this.userRepository.findOne({
            where : {
                password,
            },
        })
    }

    async findById(id : number){
        return await this.userRepository.findOne({
            where : {
                id,
            }
        })
    }

    async setCurrentRefreshToken(refreshToken : string, id : number){
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userRepository.update(id, {currentHashedRefreshToken});
    }

    async getRefreshTokenMatches(refreshToken : string, id : number){
        const user = await this.findById(id);
        const isCorrectRefreshToken = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);

        if(isCorrectRefreshToken) return user;

    }

    async removeRefreshToken(email:string){
        const user = await this.userRepository.findOne({ where : { email }});
        if(user){
            user.currentHashedRefreshToken = null;
            await this.userRepository.save(user);
        }
    }
}

@Injectable()
export class GuestService{
    constructor( @InjectRepository(Guest) private guestRepository: Repository<Guest> ){}

    async create(guest: guestSignupDTO){
        guest.uid = uid(16);
        
        const hash = await bcrypt.hash(guest.password, 10);
        guest.password = hash;
        
        await this.guestRepository.save(guest);
        return "success signup(Guest)"
    }

    async findUid(uid : string){
        return await this.guestRepository.findOne({
            where: {
                uid,
            },
        });
    }

    async findPassword(password : string){
        return await this.guestRepository.findOne({
            where : {
                password,
            },
        })
    }
}