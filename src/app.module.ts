import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { CommitmentsModule } from './commitments/commitments.module';
import { FriendsModules } from './friends/friends.module';
import { TaskModule } from './task/task.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    CommitmentsModule,
    FriendsModules,
    TaskModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client'),

    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
