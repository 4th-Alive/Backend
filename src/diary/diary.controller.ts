import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { diaryDTO } from './dto/diray.dto';
import { JwtAuthGuard } from 'src/user/auth/jwt.access.guard';
import { Request } from 'express';

@Controller('diary')
export class DiaryController {
    constructor(private readonly diaryService: DiaryService) { }

    @Post('/upload')
    @UseGuards(JwtAuthGuard)
    upload(@Body() data:diaryDTO, @Req() req: Request): any {
        const user: any = req.user;
        return this.diaryService.upload(data, user);
    }

    @Get('/myPost')
    @UseGuards(JwtAuthGuard)
    importMyPost(@Req() req: Request): any{
        const user: any = req.user;
        const userEmail: any = user.email;
        
        return this.diaryService.importMyPost(userEmail);
    }

    @Get('/familyPost')
    @UseGuards(JwtAuthGuard)
    importFamilyPost(@Req() req: Request){
        const user: any = req.user;
        const userEmail: any = user.email;

        return this.diaryService.importFamliyPost(userEmail);
    }
}
