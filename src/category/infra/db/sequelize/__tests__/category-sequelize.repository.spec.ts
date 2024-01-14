import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../category.model";
import { CategorySequelizeRepository } from "../category-sequelize.repository";
import { Category } from "../../../../domain/cateory.entity";
import { Uuid } from "../../../../../shared/domain/value-objects/uuid.vo";
import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";

describe('CategorySequelizeRepository Integration Test', () => {
    let sequelize;
    let repository: CategorySequelizeRepository;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            models: [CategoryModel],
            logging: false,
        });

        await sequelize.sync({ force: true });
        repository = new CategorySequelizeRepository(CategoryModel);
    });

    test('should insert a category', async () => {
        const category = Category.fake().aCategory().build();
        await repository.insert(category);

        const model = await CategoryModel.findByPk(category.categoryId.id)

        expect(model.toJSON()).toMatchObject({
            categoryId: category.categoryId.id,
            name: category.name,
            description: category.description,
            createdAt: category.createdAt,
        });
    });

    test("should finds a entity by id", async () => {
        let entityFound = await repository.findById(new Uuid());
        expect(entityFound).toBeNull();

        const entity = Category.fake().aCategory().build();
        await repository.insert(entity);

        entityFound = await repository.findById(entity.categoryId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });

    test("should return all categories", async () => {
        const entity = Category.fake().aCategory().build();
        await repository.insert(entity);

        const entities = await repository.findAll();
        expect(entities).toHaveLength(1);
        expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
    });

    test("should throw error on update when a entity not found", async () => {
        const entity = Category.fake().aCategory().build();
        await expect(repository.update(entity)).rejects.toThrow(
            new NotFoundError(entity.categoryId.id, Category)
        );
    });

    test("should update a entity", async () => {
        const entity = Category.fake().aCategory().build();
        await repository.insert(entity);
    
        entity.changeName("Movie updated");
        await repository.update(entity);
    
        const entityFound = await repository.findById(entity.categoryId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
      });

      test("should throw error on delete when a entity not found", async () => {
        const categoryId = new Uuid();
        await expect(repository.delete(categoryId)).rejects.toThrow(
          new NotFoundError(categoryId.id, Category)
        );
      });
    
      test("should delete a entity", async () => {
        const entity = new Category({ name: "Movie" });
        await repository.insert(entity);
    
        await repository.delete(entity.categoryId);
        await expect(repository.findById(entity.categoryId)).resolves.toBeNull();
      });   
});


