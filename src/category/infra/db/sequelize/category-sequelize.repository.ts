import { Op } from "sequelize";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
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

    async update(entity: Category): Promise<void> {
        const id = entity.categoryId.id;
        const model = await this._get(id);

        if (!model) {
            throw new NotFoundError(id, this.getEntity());
        }

        await this.categoryModel.update(
            {
                categoryId: entity.categoryId.id,
                name: entity.name,
                description: entity.description,
                createdAt: entity.createdAt,
            },
            { where: { categoryId: id } }
        );
    }

    async delete(category_id: Uuid): Promise<void> {
        const id = category_id.id;
        const model = await this._get(id);

        if (!model) {
            throw new NotFoundError(id, this.getEntity());
        }

        await this.categoryModel.destroy({ where: { categoryId: id } });
    }

    async findById(entity_id: Uuid): Promise<Category> | null {
        const model = await this._get(entity_id.id);

        if (!model) {
            return null
        }

        return new Category({
            categoryId: new Uuid(model.categoryId),
            name: model.name,
            description: model.description,
            createdAt: model.createdAt,
        })
    }

    private async _get(pId: string) {
        return await this.categoryModel.findByPk(pId);
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

    async search(props: CategorySearchParams): Promise<CategorySearchResult> {
        const offset = (props.page - 1) * props.per_page;
        const limit = props.per_page;

        const { rows: models, count } = await this.categoryModel.findAndCountAll({
            ...(props.filter && {
                where: {
                    name: { [Op.like]: `%${props.filter}%` },
                }
            }),
            ...(props.sort && this.sortableFields.includes(props.sort)
                ? { order: [[props.sort, props.sort_dir]] }
                : { order: [["createdAt", "desc"]] }),
            offset,
            limit,
        });

        return new CategorySearchResult({
            items: models.map((model) => new Category({
                categoryId: new Uuid(model.categoryId),
                name: model.name,
                description: model.description,
                createdAt: model.createdAt,
            })),
            total: count,
            current_page: props.page,
            per_page: props.per_page,
        });
    }

    getEntity(): new (...args: any[]) => Category {
        return Category;
    }
}