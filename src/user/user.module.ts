import { Module } from '@nestjs/common';
import { GuestController, UserController } from './user.controller';
import { UserService, GuestService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Guest } from './entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Guest])],
    exports: [TypeOrmModule],
    controllers : [UserController, GuestController],
    providers: [UserService, GuestService]
})

export class UserModule {}
