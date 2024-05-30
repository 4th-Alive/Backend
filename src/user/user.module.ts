import { Module } from '@nestjs/common';
import { GuestController, UserController } from './user.controller';
import { UserService, GuestService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Guest } from './entities/user.entity';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), 
        TypeOrmModule.forFeature([Guest]), 
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: '1h',
                }
            })
        }),
    ],
    exports: [TypeOrmModule],
    controllers : [UserController, GuestController],
    providers: [UserService, GuestService, JwtStrategy, AuthService]
})

export class UserModule {}
