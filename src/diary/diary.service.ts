import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from './entities/diary.entity';
import { DiaryComment } from './entities/diary_comment.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { diaryDTO } from './dto/diray.dto';
import { diaryCommentDTO } from './dto/diary_comment.dto';
import { v1 as uuidv4 } from 'uuid';

@Injectable()
export class DiaryService {
    constructor(
        @InjectRepository(Diary) private diaryRepository: Repository<Diary>,
        @InjectRepository(DiaryComment) private diaryCommentRepository : Repository<DiaryComment>
    ){}

    async createDiary(data: diaryDTO, user:any){
        const uid = uuidv4().replace(/-/g, '').substring(0, 16)

        data.uid = uid;
        data.family_uid = user.f_uid;
        data.user_uid = user.u_uid;
        data.create_date = Date();

        await this.diaryRepository.save(data);
        return {success : true};
    }
    
    async getMyDiaryList(user:any){
        const diaries = await this.diaryRepository.createQueryBuilder('d')
            .leftJoinAndSelect('d.user_uid', 'user')
            .where('user.uid = :uid', {uid : user.u_uid})
            .select([
                'd.uid',
                'd.title',
                'd.sentiment',
                'd.contents',
                'd.create_date',
                'user.nickname',
                'user.realname'
            ])
            .getMany();

        return diaries;
    }

    async getFamilyDiaryList(user:any){
        if(user.f_uid == null) return [];
        const diaries = await this.diaryRepository.createQueryBuilder('d')
        .leftJoin('d.user_uid', 'user')
        .leftJoin('family_member', 'fm', 'd.family_uid = fm.family_uid')
        .where('d.user_uid != :uid', {uid : user.u_uid})
        .andWhere('d.private = :private', { private: 1 }) 
        .select([
            'd.uid',
            'd.title',
            'd.sentiment',
            'd.contents',
            'd.create_date',
            'user.uid',
            'user.nickname',
            'user.realname',
            'fm.role'
        ])
        .getRawMany();

        return diaries;
    }

    async removeDiary(uid:string){
        const deleteResult = await this.diaryRepository.delete(uid);
        return deleteResult.affected > 0;
    }

    async replyDiary(diaryCommentDTO : diaryCommentDTO, user:any){
        const uid = uuidv4().replace(/-/g, '').substring(0, 16)

        diaryCommentDTO.uid = uid;
        diaryCommentDTO.user_uid = user.u_uid;
        diaryCommentDTO.create_date = Date();
        
        this.diaryCommentRepository.save(diaryCommentDTO);
        return { success : true }
    }
}
