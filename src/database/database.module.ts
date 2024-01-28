import { CategoryModel } from '@core/category/infra/db/sequelize/category.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

const models = [CategoryModel];

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'sqlite' as any,
            storage: ':memory:',
            logging: false,
            models,
      
          }),
    ],
})
export class DatabaseModule {}