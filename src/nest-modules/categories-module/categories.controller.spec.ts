import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesModule } from './categories.module';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config-module/config.module';
import { DatabaseModule } from '../database-module/database.module';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    console.log(module.get(ConfigService).get('DB_VENDOR'));
    console.log(module.get(ConfigService).get('DB_HOST'));
  });

  test('should be defined', () => {
    console.log(controller);
    expect(controller).toBeDefined();
  });
});
