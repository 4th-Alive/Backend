import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest, User } from './user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'friox.dev',
      port: 3361,
      username: 'root',
      password: '4thalive3134',
      database: 'with',
      entities: [User, Guest],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
