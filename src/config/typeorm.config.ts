import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 6000,
  username: 'postgres',
  password: 'Pratik@work123',
  database: 'taskmanagement',
  autoLoadEntities: true,
  synchronize: true,
};
