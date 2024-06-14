import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from './entities/family.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { familyDTO } from './dto/family.dto';
import { v1 as uuidv4 } from 'uuid';
import { FamilyMember } from './entities/family-member.entitiy';
import { AuthService } from 'src/user/auth/auth.service';

@Injectable()
export class FamilyService {
    constructor(
        @Inject(forwardRef(() => AuthService)) private readonly authService : AuthService,
        @InjectRepository(Family) private familyRepository: Repository<Family>,
        @InjectRepository(FamilyMember) private familyMemberRepository: Repository<FamilyMember>,
    ){}

    async create(familyDTO : familyDTO, user : User) {
        const uid = uuidv4().replace(/-/g, '').substring(0, 16)
        familyDTO.uid = uid;
        familyDTO.create_date = Date()

        const familyMember = new FamilyMember();
        familyMember.family_uid = uid;
        familyMember.role = familyDTO.role;
        familyMember.user_uid = user;

        await this.familyRepository.save(familyDTO);        
        await this.familyMemberRepository.save(familyMember);

        const payload = { u_uid : user, f_uid : uid}
        const token = await this.authService.getAccessJwtToken(payload);
        
        return {token} 
    }

    async findFamilyUid(userId : User){
        const family =  await this.familyMemberRepository.findOne({
            select : ['family_uid'],
            where : { user_uid : userId },
        })
        if(family == null) return null;
        return family.family_uid;
    }
    // async join(family:familyDTO, email:string){

    //     const familyCode = family.familyCode
    //     const existFamilyCode = await this.familyRepository.findOne({
    //         where:{
    //             familyCode
    //         }
    //     })

    //     if(existFamilyCode != null){            
    //         const user = await this.userRepository.findOne({
    //             where: { 
    //                 email
    //             },
    //             relations:['familyCode']
    //         })

    //         if(user.familyCode != null) return "you already have a family"
        
    //         user.familyCode = family;
    //         await this.userRepository.save(user);
    
    //         return user.familyCode;
    //     }

    //     return "this is wrong familyCode "
    // }
}
