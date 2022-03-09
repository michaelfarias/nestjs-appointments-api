import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { CommitmentsModule } from './commitments/commitments.module';
import { FriendsModules } from './friends/friends.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    CommitmentsModule,
    FriendsModules
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
