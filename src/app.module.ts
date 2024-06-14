import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest, User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { FamilyModule } from './family/family.module';
import { Family } from './family/entities/family.entity';
import { FamilyMember } from './family/entities/family-member.entitiy';
import { DiaryModule } from './diary/diary.module';
import { Diary } from './diary/entities/diary.entity';
import { DiaryComment } from './diary/entities/diary_comment.entity';

@Module({
  imports: [
    UserModule,
    FamilyModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User, Guest, Family, FamilyMember, Diary, DiaryComment],
        synchronize: true,
      })
    }),
    DiaryModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
