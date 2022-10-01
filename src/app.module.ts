import {Module} from '@nestjs/common';
// import { AppController } from './app.controller';
// import {AppService} from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import {ConfigModule} from '@nestjs/config';
import { User } from './users/users.model'
import { RolesModule } from './roles/roles.module';

// mark this class with a decorator @Module
// Декоратор - така обгортка класа або функції, яка додає йому функціонал

@Module({
	// We accept controllers in the form of an array:
	controllers: [],
	providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
			models: [User],
			autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
  ],
	
})
export class AppModule { }