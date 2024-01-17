import { setupSequelize } from "../../../../../shared/infra/testing/helpers";
import { CategorySequelizeRepository } from "../../../../infra/db/sequelize/category-sequelize.repository";
import { CategoryModel } from "../../../../infra/db/sequelize/category.model";
import { ListCategoriesUseCase } from "../../list-categories.use-case";

describe("", () => {
    let useCase: ListCategoriesUseCase;
    let repository: CategorySequelizeRepository;

    setupSequelize({ models: [CategoryModel] });

    beforeEach(() => {
        repository = new CategorySequelizeRepository(CategoryModel);
        useCase = new ListCategoriesUseCase(repository);
    });

});