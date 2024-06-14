import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from './entities/diary.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { diaryDTO } from './dto/diray.dto';
import { User } from 'src/user/entities/user.entity';
import { v1 as uuidv4 } from 'uuid';

@Injectable()
export class DiaryService {
    constructor(
        @InjectRepository(Diary) private diaryRepository: Repository<Diary>,
    ){}

    async createDiary(data: diaryDTO, user:any){
        const uid = uuidv4().replace(/-/g, '').substring(0, 16)

        data.uid = uid;
        data.family_uid = user.f_uid;
        data.user_uid = user.u_uid;
        data.create_date = Date();

        await this.diaryRepository.save(data);
        return "access";
    }
    
    async getMyDiaryList(user:any){
        console.log(user);
    }

    // async importMyPost(user: any){
    //     const diaries = await this.diaryRepository.find({
    //         where : { email : user },
    //     });
    //     console.log(diaries);
    // }

    // async importFamliyPost(user: any){
    //     const family = await this.userRepository.findOne({
    //         where : { email : user },
    //     })
        
    //     const familyCode = family.familyCode.familyCode
        
    //     const diaries = await this.diaryRepository.createQueryBuilder('d')
    //     .leftJoinAndSelect('d.familyCode', 'diary')
    //     .where('d.familyCode = :familyCode', {familyCode : familyCode}) // 패밀리 코드가 같은데
    //     .where('d.email != :email', {email : family.email}) // 나를 제외하면서
    //     .where('d.isPublic = :flag', {flag : true}) // 공개한것
    //     .getMany();

    //     console.log(diaries)
    // }
}
