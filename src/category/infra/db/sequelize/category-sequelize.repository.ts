import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { CategorySearchParams, CategorySearchResult, ICategoryRepository } from "../../../domain/category.repository";
import { Category } from "../../../domain/cateory.entity";
import { CategoryModel } from "./category.model";

export class CategorySequelizeRepository implements ICategoryRepository {
    sortableFields: string[] = ["name", "createdAt"];

    constructor(private categoryModel: typeof CategoryModel) {

    }

    async insert(entity: Category): Promise<void> {
        await this.categoryModel.create({
            categoryId: entity.categoryId.id,
            name: entity.name,
            description: entity.description,
            createdAt: entity.createdAt,
        });
    }

    async bulkInsert(entities: Category[]): Promise<void> {
        await this.categoryModel.bulkCreate(entities.map((entity) => ({
            categoryId: entity.categoryId.id,
            name: entity.name,
            description: entity.description,
            createdAt: entity.createdAt,
        })));
    }

    update(entity: Category): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(entity_id: Uuid): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findById(entity_id: Uuid): Promise<Category> | null {
        const model = await this.categoryModel.findByPk(entity_id.id);
        return new Category({
            categoryId: new Uuid(model.categoryId),
            name: model.name,
            description: model.description,
            createdAt: model.createdAt,
        })
    }

    async findAll(): Promise<Category[]> {
        const models = await this.categoryModel.findAll();
        return models.map((model) => new Category({
            categoryId: new Uuid(model.categoryId),
            name: model.name,
            description: model.description,
            createdAt: model.createdAt,
        }));
    }


    search(props: CategorySearchParams): Promise<CategorySearchResult> {
        throw new Error("Method not implemented.");
    }

    getEntity(): new (...args: any[]) => Category {
       return Category;
    }
}