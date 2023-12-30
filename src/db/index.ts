import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const appDataSource = (config: ConfigService) => new DataSource({
  type: 'postgres', // or other database type
  host: config.get('DATABASE_HOST'),
  port: config.get('DATABASE_PORT'),
  username: config.get('DATABASE_USER'),
  password: config.get('DATABASE_PASSWORD'),
  database: config.get('DATABASE_NAME'),
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: config.get('DATABASE_SYNCHRONIZE') === 'true',
});










// import { DataSource } from 'typeorm';

// export const appDataSource = new DataSource({
//     type: 'postgres', // or your database type
//     host: 'localhost',
//     port: 5432,
//     username: 'your_username',
//     password: 'your_password',
//     database: 'your_database',
//     entities: [__dirname + '/**/*.entity{.ts,.js}'],
//     synchronize: true,
// });


// data-source.ts