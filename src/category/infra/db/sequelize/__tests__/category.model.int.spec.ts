
import { CategoryModel } from "../category.model";
import { CategoryFakeBuilder } from "../../../../domain/category-fake.builder";
import { Sequelize } from "sequelize-typescript";
import { Category } from "../../../../domain/cateory.entity";

describe("CategoryModel Integration Test", () => {
    test("should create a category", async () => {
        const sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            models: [CategoryModel],
        });

        await sequelize.sync({ force: true });
        const category = Category.fake().aCategory().build();

        CategoryModel.create({
            categoryId: category.categoryId.id,
            name: category.name,
            description: category.description,
            createdAt: category.createdAt,
        });
    });
});