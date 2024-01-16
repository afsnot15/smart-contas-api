import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import { Uuid } from "../../../../../shared/domain/value-objects/uuid.vo";
import { setupSequelize } from "../../../../../shared/infra/testing/helpers";
import { Category } from "../../../../domain/cateory.entity";
import { CategorySequelizeRepository } from "../../../../infra/db/sequelize/category-sequelize.repository";
import { CategoryModel } from "../../../../infra/db/sequelize/category.model";
import { UpdateCategoryUseCase } from "../../update-category.use-case";

describe("UpdateCategoryUseCase Integration Tests", () => {
    let useCase: UpdateCategoryUseCase;
    let repository: CategorySequelizeRepository;

    setupSequelize({ models: [CategoryModel] });

    beforeEach(() => {
        repository = new CategorySequelizeRepository(CategoryModel);
        useCase = new UpdateCategoryUseCase(repository);

    });

    test('should throws error when entity not found', async () => {
        const uuid = new Uuid();

        await expect(() =>
            useCase.execute({ id: uuid.id, name: 'fake' }),
        ).rejects.toThrow(new NotFoundError(uuid.id, Category));
    });

    test('should update a category', async () => {
        const entity = Category.fake().aCategory().build();
        repository.insert(entity);
    
        let output = await useCase.execute({
          id: entity.categoryId.id,
          name: 'test',
        });
        expect(output).toStrictEqual({
          id: entity.categoryId.id,
          name: 'test',
          description: entity.description,
          createdAt: entity.createdAt,
        });
    
        type Arrange = {
          input: {
            id: string;
            name: string;
            description?: null | string;
            is_active?: boolean;
          };

          expected: {
            id: string;
            name: string;
            description: null | string;
            createdAt: Date;
          };
        };

        const arrange: Arrange[] = [
          {
            input: {
              id: entity.categoryId.id,
              name: 'test',
              description: 'some description',
            },
            expected: {
              id: entity.categoryId.id,
              name: 'test',
              description: 'some description',
              createdAt: entity.createdAt,
            },
          },
          {
            input: {
              id: entity.categoryId.id,
              name: 'test',
            },
            expected: {
              id: entity.categoryId.id,
              name: 'test',
              description: 'some description',
              createdAt: entity.createdAt,
            },
          },
          {
            input: {
              id: entity.categoryId.id,
              name: 'test',
            },
            expected: {
              id: entity.categoryId.id,
              name: 'test',
              description: 'some description',
              createdAt: entity.createdAt,
            },
          },
          {
            input: {
              id: entity.categoryId.id,
              name: 'test',
            },
            expected: {
              id: entity.categoryId.id,
              name: 'test',
              description: 'some description',
              createdAt: entity.createdAt,
            },
          },
          {
            input: {
              id: entity.categoryId.id,
              name: 'test',
              is_active: true,
            },
            expected: {
              id: entity.categoryId.id,
              name: 'test',
              description: 'some description',
              createdAt: entity.createdAt,
            },
          },
          {
            input: {
              id: entity.categoryId.id,
              name: 'test',
              description: null,
            },

            expected: {
              id: entity.categoryId.id,
              name: 'test',
              description: null,
              createdAt: entity.createdAt,
            },
          },
        ];
    
        for (const i of arrange) {
          output = await useCase.execute({
            id: i.input.id,
            ...(i.input.name && { name: i.input.name }),
            ...('description' in i.input && { description: i.input.description }),
            ...('is_active' in i.input && { is_active: i.input.is_active }),
          });
          const entityUpdated = await repository.findById(new Uuid(i.input.id));
          expect(output).toStrictEqual({
            id: entity.categoryId.id,
            name: i.expected.name,
            description: i.expected.description,
            createdAt: entityUpdated.createdAt,
          });
          expect(entityUpdated.toJSON()).toStrictEqual({
            categoryId: entity.categoryId.id,
            name: i.expected.name,
            description: i.expected.description,
            createdAt: entityUpdated.createdAt,
          });
        }
      });
    });    