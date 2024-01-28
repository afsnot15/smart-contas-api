import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { CategoriesController } from './categories.controller';
import { CategoriesModule } from './categories.module';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  test('should be defined', () => {
    console.log(controller);
    expect(controller).toBeDefined();
  });
});
