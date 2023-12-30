import { Module, OnModuleInit, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { appDataSource } from './db';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes ConfigModule globally available
    }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule implements OnModuleInit {
  private dataSource: DataSource;

  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  async onModuleInit() {
    console.log({
      host: this.configService.get('DATABASE_HOST'),
      port: this.configService.get('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USER'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_NAME'),
      synchronize: this.configService.get('DATABASE_SYNCHRONIZE'),
    });
    this.dataSource = appDataSource(this.configService);
    try {
      await this.dataSource.initialize();
      console.log('Data Source has been initialized!');
    } catch (error) {
      console.error('Error during Data Source initialization', error);
    }
  }

  // ... (implement onModuleDestroy to close the connection)
}
