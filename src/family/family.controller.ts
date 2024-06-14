import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { FamilyService } from './family.service';
import { JwtAuthGuard } from 'src/user/auth/jwt.access.guard';
import { familyDTO } from './dto/family.dto';


@Controller('family')
export class FamilyController {
    constructor(private readonly familyService: FamilyService) { }

    @Get('/create')
    @UseGuards(JwtAuthGuard)
    async createCode(@Body() familyDTO:familyDTO, @Req() req: Request): Promise<any>{
        const user: any = req.user;
        const token =  this.familyService.create(familyDTO, user.u_uid)
        req.res.cookie('Authentication', (await token).token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1000, //1h
        });
        return {success : true};
    }

    // @Post('/join')
    // @UseGuards(JwtAuthGuard)
    // join(@Body() familyDTO:familyDTO, @Req() req:Request): any{
    //     const user: any = req.user;
    //     // console.log(user);
    //     return this.familyService.join(familyDTO, user.email)
    // }
    

}
