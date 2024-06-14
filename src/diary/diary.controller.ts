import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { diaryDTO } from './dto/diray.dto';
import { JwtAuthGuard } from 'src/user/auth/jwt.access.guard';
import { Request } from 'express';

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

    // @Get('/myPost')
    // @UseGuards(JwtAuthGuard)
    // importMyPost(@Req() req: Request): any{
    //     const user: any = req.user;
    //     const userEmail: any = user.email;
        
    //     return this.diaryService.importMyPost(userEmail);
    // }

    // @Get('/familyPost')
    // @UseGuards(JwtAuthGuard)
    // importFamilyPost(@Req() req: Request){
    //     const user: any = req.user;
    //     const userEmail: any = user.email;

    //     return this.diaryService.importFamliyPost(userEmail);
    // }
}
