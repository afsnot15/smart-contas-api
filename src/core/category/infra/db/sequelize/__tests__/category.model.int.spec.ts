
import { CategoryModel } from "../category.model";
import { DataType, Sequelize } from "sequelize-typescript";
import { Category } from "../../../../domain/category.entity";
import { setupSequelize } from "../../../../../shared/infra/testing/helpers";

describe("CategoryModel Integration Test", () => {
    setupSequelize({ models: [CategoryModel] });

    test("should create a category", async () => {
        const category = Category.fake().aCategory().build();

        CategoryModel.create({
            categoryId: category.categoryId.id,
            name: category.name,
            description: category.description,
            createdAt: category.createdAt,
        });
    });

    test("mapping props", () => {
        const attributesMap = CategoryModel.getAttributes();
        const attributes = Object.keys(CategoryModel.getAttributes());
        expect(attributes).toStrictEqual([
            "categoryId",
            "name",
            "description",
            "createdAt",
        ]);

        const categoryIdAttr = attributesMap.categoryId;
        expect(categoryIdAttr).toMatchObject({
            field: "categoryId",
            fieldName: "categoryId",
            primaryKey: true,
            type: DataType.UUID(),
        });

        const nameAttr = attributesMap.name;
        expect(nameAttr).toMatchObject({
            field: "name",
            fieldName: "name",
            allowNull: false,
            type: DataType.STRING(255),
        });

        const descriptionAttr = attributesMap.description;
        expect(descriptionAttr).toMatchObject({
            field: "description",
            fieldName: "description",
            allowNull: true,
            type: DataType.TEXT(),
        });
    });

    test("create", async () => {
        const arrange = {
            categoryId: "9366b7dc-2d71-4799-b91c-c64adb205104",
            name: "Category 1",
            description: "Category 1 description",
            createdAt: new Date(),
        };

        const category = await CategoryModel.create(arrange);

        expect(category.toJSON()).toStrictEqual(arrange);
    });
});