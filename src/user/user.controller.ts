import { Body, Controller, Post,  } from '@nestjs/common';
import { GuestService, UserService } from './user.service';
import { signUpDTO, signInDTO, guestSigninDTO, guestSignupDTO } from './dto/auth.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    async signUp(@Body() user:signUpDTO){
        return await this.userService.create(user);
    }
    
    @Post('/signin')
    async signIn(@Body() user: signInDTO){
        return await this.userService.validateUser(user);
    }

}

@Controller('guest')
export class GuestController{
    constructor(private readonly guestService: GuestService){}
    
    @Post('/signup')
    async guestSignup(@Body() guest : guestSignupDTO){
        return await this.guestService.create(guest)
    }

    @Post('/signin')
    async guestSignin(@Body() guest : guestSigninDTO){
        return await this.guestService.validateUser(guest);
    }
}

