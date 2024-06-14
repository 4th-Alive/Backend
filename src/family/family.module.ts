import { Module, forwardRef } from '@nestjs/common';
import { FamilyService } from './family.service';
import { FamilyController } from './family.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from './entities/family.entity';
import { User } from 'src/user/entities/user.entity';
import { FamilyMember } from './entities/family-member.entitiy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Family, FamilyMember, User]), 
    ],
  controllers: [FamilyController],
  providers: [FamilyService],
})
export class FamilyModule {}
