import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary } from './entities/diary.entity';
import { User } from 'src/user/entities/user.entity';
import { Family } from 'src/family/entities/family.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Diary]), 
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Family]),
    ],
    controllers: [DiaryController],
    providers: [DiaryService],
})
export class DiaryModule { }
