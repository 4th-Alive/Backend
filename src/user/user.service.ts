import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Guest } from './entities/user.entity';
import { Repository } from 'typeorm';
import { signUpDTO, guestSignupDTO } from './dto/auth.dto';
import * as  bcrypt from 'bcrypt';
import { uid } from 'uid';
import { v1 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor( 
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    async create(user: signUpDTO){ // 회원가입 수정 끝
        const existId = await this.findId(user.id)
        if(existId){ throw new ConflictException({
                success : false,
                desc : "existId"
            }); 
        }
        
        const existNickname = await this.findNickname(user.nickname)
        if(existNickname) { throw new ConflictException({
                success : false,
                desc : "existNickname"
            }); 
        }

        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        
        const uid = uuidv4().replace(/-/g, '').substring(0, 16)
        const profile_uid = uuidv4().replace(/-/g, '').substring(0, 16)
        const signup_date = Date();

        user.uid = uid;
        user.profile_uid = profile_uid;
        user.signup_date = signup_date;
        user.exp = 0;

        await this.userRepository.save(user);

        return {success : true}
    }

    async findId(id : string){
        return await this.userRepository.findOne({
            where: {
                id,
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

    async findNickname(nickname : string){
        return await this.userRepository.findOne({
            where : { 
                nickname 
            }
        })
    }

    async findByPk(pk : number){
        return await this.userRepository.findOne({
            where : {
                pk,
            }
        })
    }

    async findUserByUid(uid : string){
        return await this.userRepository.findOne({
            where : {
                uid,
            }
        })
    }

    async setCurrentRefreshToken(refreshToken : string, pk : number){
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userRepository.update(pk, {currentHashedRefreshToken});
    }

    async getRefreshTokenMatches(refreshToken : string, pk : number){
        const user = await this.findByPk(pk);
        const isCorrectRefreshToken = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);

        if(isCorrectRefreshToken) return user;
    }

    async removeRefreshToken(uid:string){
        const user = await this.userRepository.findOne({ where : { uid }});
        console.log(user);
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

