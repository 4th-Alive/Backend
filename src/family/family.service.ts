import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from './entities/family.entity';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import { User } from 'src/user/entities/user.entity';
import { familyDTO } from './dto/family.dto';

@Injectable()
export class FamilyService {
    constructor(
        @InjectRepository(Family) private familyRepository: Repository<Family>,
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    async create(email:string) {
        const family = new Family();
        const familyCode = nanoid(10);
        family.familyCode = familyCode;
        
        await this.familyRepository.save(family);

        const user = await this.userRepository.findOne({
            where: { 
                email
            },
            relations: ['familyCode']
        })

        if(user.familyCode.familyCode != null) return "you already have a family"
        
        user.familyCode = family;
        await this.userRepository.save(user);
        
        return familyCode;
    }

    async join(family:familyDTO, email:string){

        const familyCode = family.familyCode
        const existFamilyCode = await this.familyRepository.findOne({
            where:{
                familyCode
            }
        })

        if(existFamilyCode != null){            
            const user = await this.userRepository.findOne({
                where: { 
                    email
                },
                relations:['familyCode']
            })
            
            if(user.familyCode != null) return "you already have a family"
        
            user.familyCode = family;
            await this.userRepository.save(user);
    
            return user.familyCode;
        }

        return "this is wrong familyCode "
    }
}
