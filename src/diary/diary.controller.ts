import { Controller, Post, Body, UseGuards, Req, Get, Delete } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { diaryDTO } from './dto/diray.dto';
import { JwtAuthGuard } from 'src/user/auth/jwt.access.guard';
import { Request } from 'express';
import { diaryCommentDTO } from './dto/diary_comment.dto';

@Controller('diary')
export class DiaryController {
    constructor(private readonly diaryService: DiaryService) { }

    @Post('/createDiary')
    @UseGuards(JwtAuthGuard)
    createDiary(@Body() data:diaryDTO, @Req() req: Request): any {
        const user: any = req.user;
        return this.diaryService.createDiary(data, user);
    }

    @Get("/getMyDiaryList")
    @UseGuards(JwtAuthGuard)
    getMyDiaryList(@Req() req: Request){
        const user = req.user;
        return this.diaryService.getMyDiaryList(user)
    }

    @Get("/getFamilyDiaryList")
    @UseGuards(JwtAuthGuard)
    getFamilyDiaryList(@Req() req: Request){
        const user = req.user;
        return this.diaryService.getFamilyDiaryList(user)
    }

    @Delete("/removeDiary")
    @UseGuards(JwtAuthGuard)
    removeDiary(@Body() uid:string){
        const result = this.diaryService.removeDiary(uid);
        if(!result){
            return {success : false, desc : "failed"}
        }
        return { success: true};
    }

    @Post('/replyDiary')
    @UseGuards(JwtAuthGuard)
    replyDiary(@Body() diaryCommentDTO : diaryCommentDTO, @Req() req:Request){
        const user = req.user;
        return this.diaryService.replyDiary(diaryCommentDTO, user)
    }

}
