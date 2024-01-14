import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../../domain/cateory.entity";
import { CategoryModel } from "./category.model";

export class CategoryModelMapper {
    static toModel(entity: Category): CategoryModel {

        return CategoryModel.build({
            categoryId: entity.categoryId.id,
            name: entity.name,
            description: entity.description,
            createdAt: entity.createdAt,
        });

    }

    static toEntity(model: CategoryModel): Category {

        const category = new Category({
            categoryId: new Uuid(model.categoryId),
            name: model.name,
            description: model.description,
            createdAt: model.createdAt,
        });

        Category.validate(category);

        return category;
    }
}