/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, UseGuards, Res,  Req } from '@nestjs/common';
import { GuestService, UserService } from './user.service';
import { signUpDTO, signInDTO, guestSigninDTO, guestSignupDTO } from './dto/auth.dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './auth/jwt.access.guard';
import { JwtRefreshAuthGuard } from './auth/jwt.refresh.guard';
import { AuthService } from './auth/auth.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @Post('/signup')
    async signUp(@Body() user:signUpDTO){
        return await this.userService.create(user);
    }
    
    @Post('/signin')
    async signIn(@Body() user: signInDTO, @Res() res: Response){
        const jwt = await this.authService.validateUser(user);
        const userId = await this.userService.findEmail(user.email);

        const refreshToken = await this.authService.getRefreshJwtToken(userId.id)
        // res.setHeader('Authorization', 'Bearer ' + jwt.token);  
        res.cookie('Authentication', jwt.token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1000, //1h
        });
        res.cookie('Refresh', refreshToken.token,{
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        });
        
        await this.userService.setCurrentRefreshToken(refreshToken.token, userId.id);
        // res.cookie('Refresh');
        // 나중에 클라이언트에서 cookies에 저장하고 코드 확인하기
        return res.json(jwt);
    }

    @Get('/logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() req: Request, @Res() res: Response){
        const user: any = req.user;
        res.cookie('Authentication', '',{
            maxAge: 0
        })
        res.cookie('Refresh', '',{
            maxAge: 0
        })

        await this.userService.removeRefreshToken(user.email);

        return res.json({message: "success"});
    }

    @Get('/auth')
    @UseGuards(JwtAuthGuard)
    isAuthenticated(@Req() req: Request): any{
        const user: any = req.user;
        return user;
    }

    @Get('/refresh')
    @UseGuards(JwtRefreshAuthGuard)
    isAuthenticatedRefresh(@Req() req:Request){
        const token = req.user;
        req.res.cookie('Authentication', token)
        return { token : token }
    }
}

@Controller('guest')
export class GuestController{
    constructor(
        private readonly guestService: GuestService,
        private readonly authService: AuthService
    ) {}
    
    @Post('/signup')
    async guestSignup(@Body() guest : guestSignupDTO){
        return await this.guestService.create(guest)
    }

    @Post('/signin')
    async guestSignin(@Body() guest : guestSigninDTO){
        return await this.authService.validateGuest(guest);
    }
}


