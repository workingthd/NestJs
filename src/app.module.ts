import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { LibraryModule } from './library/library.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'library',
    autoLoadModels: true,
    synchronize: true
  }), LibraryModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
