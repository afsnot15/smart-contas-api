import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { setupSequelize } from "../../../../shared/infra/testing/helpers";
import { CategorySequelizeRepository } from "../../../infra/db/sequelize/category-sequelize.repository";
import { CategoryModel } from "../../../infra/db/sequelize/category.model";
import { CreateCategoryUseCase } from "../../create-category.use-case";

describe("CreateCategoryUseCase Integration Tests", () => {
    let useCase: CreateCategoryUseCase;
    let repository: CategorySequelizeRepository;

    setupSequelize({ models: [CategoryModel] });

    beforeEach(() => {
        repository = new CategorySequelizeRepository(CategoryModel);
        useCase = new CreateCategoryUseCase(repository);
    });

    test("should create a category", async () => {
        let output = await useCase.execute({ name: "test" });
        let entity = await repository.findById(new Uuid(output.categoryId));
      
        expect(output).toStrictEqual({
            categoryId: entity.categoryId.id,
            name: "test",
            description: null,
            createdAt: entity.createdAt,
        });

        output = await useCase.execute({
            name: "test",
            description: "some description",
        });

        entity = await repository.findById(new Uuid(output.categoryId));
        
        expect(output).toStrictEqual({
            categoryId: entity.categoryId.id,
            name: "test",
            description: "some description",
            createdAt: entity.createdAt,
        });

        output = await useCase.execute({
            name: "test",
            description: "some description",
        });
     
        entity = await repository.findById(new Uuid(output.categoryId));
        expect(output).toStrictEqual({
            categoryId: entity.categoryId.id,
            name: "test",
            description: "some description",
            createdAt: entity.createdAt,
        });

        output = await useCase.execute({
            name: "test",
            description: "some description",
        });

        entity = await repository.findById(new Uuid(output.categoryId));
        expect(output).toStrictEqual({
            categoryId: entity.categoryId.id,
            name: "test",
            description: "some description",
            createdAt: entity.createdAt,
        });
    });
});
