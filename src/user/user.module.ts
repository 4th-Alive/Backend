import { Module } from '@nestjs/common';
import { GuestController, UserController } from './user.controller';
import { UserService, GuestService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Guest } from './entities/user.entity';
import { JwtAccessStrategy } from './auth/jwt.access.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { JwtRefreshStrategy } from './auth/jwt.refresh.strategy';
import { FamilyService } from 'src/family/family.service';
import { Family } from 'src/family/entities/family.entity';
import { FamilyMember } from 'src/family/entities/family-member.entitiy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Guest, FamilyMember, Family]), 
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_ACCESS_SECRET,
                signOptions: {
                    expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
                }
            })
        }),
    ],
    exports: [TypeOrmModule, AuthService],
    controllers : [UserController, GuestController],
    providers: [UserService, GuestService, JwtAccessStrategy, AuthService , JwtRefreshStrategy, FamilyService]
})

export class UserModule {}
