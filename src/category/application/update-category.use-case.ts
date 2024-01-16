import { IUseCase } from "../../shared/application/use-case.interface";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { ICategoryRepository } from "../domain/category.repository";
import { Category } from "../domain/cateory.entity";
import { NotFoundError } from "../../shared/domain/errors/not-found.error";

export class UpdateCategoryUseCase implements IUseCase<UpdateCategoryInput, UpdateCategoryOutput>{

    constructor(private readonly categoryRepository: ICategoryRepository) { }

    async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
        const uuid = new Uuid(input.id);
        const category = await this.categoryRepository.findById(uuid);

        if (!category) {
            throw new NotFoundError(input.id, Category);
        }

        input.name && category.changeName(input.name);

        if ("description" in input) {
            category.changeDescription(input.description);
        }

        await this.categoryRepository.update(category);

        return {
            id: category.categoryId.id,
            name: category.name,
            description: category.description,
            createdAt: category.createdAt
        }
    }
}


export type UpdateCategoryInput = {
    id: string;
    name?: string;
    description?: string;
}

export type UpdateCategoryOutput = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
}

