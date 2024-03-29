import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import { InvalidUuidError, Uuid } from "../../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../../../domain/category.entity";
import { CategoryInMemoryRepository } from "../../../../infra/db/in-memory/category-in-memory.repository";
import { UpdateCategoryUseCase } from "../update-category.use-case";

describe("UpdateCategoryUseCase Unit Tests", () => {

    let useCase: UpdateCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new UpdateCategoryUseCase(repository);
    });

    test("should throws error when entity not found", async () => {
        await expect(() =>
            useCase.execute({ id: "fake id", name: "fake" })
        ).rejects.toThrow(new InvalidUuidError());

        const uuid = new Uuid();

        await expect(() =>
            useCase.execute({ id: uuid.id, name: "fake" })
        ).rejects.toThrow(new NotFoundError(uuid.id, Category));
    });

    it("should update a category", async () => {
        const spyUpdate = jest.spyOn(repository, "update");
        const entity = new Category({ name: "Movie" });
        repository.items = [entity];

        let output = await useCase.execute({
            id: entity.categoryId.id,
            name: "test",
        });

        expect(spyUpdate).toHaveBeenCalledTimes(1);
        
        expect(output).toStrictEqual({
            id: entity.categoryId.id,
            name: "test",
            description: null,
            createdAt: entity.createdAt,
        });

        type Arrange = {
            input: {
                id: string;
                name: string;
                description?: null | string;
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
                    name: "test",
                    description: "some description",
                },
                expected: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                    createdAt: entity.createdAt,
                },
            },
            {
                input: {
                    id: entity.categoryId.id,
                    name: "test",
                },
                expected: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                    createdAt: entity.createdAt,
                },
            },
            {
                input: {
                    id: entity.categoryId.id,
                    name: "test",
                },
                expected: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                    createdAt: entity.createdAt,
                },
            },
            {
                input: {
                    id: entity.categoryId.id,
                    name: "test",
                },
                expected: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                    createdAt: entity.createdAt,
                },
            },
            {
                input: {
                    id: entity.categoryId.id,
                    name: "test",
                },
                expected: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                    createdAt: entity.createdAt,
                },
            },
            {
                input: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                },
                expected: {
                    id: entity.categoryId.id,
                    name: "test",
                    description: "some description",
                    createdAt: entity.createdAt,
                },
            },
        ];

        for (const i of arrange) {
            output = await useCase.execute({
                id: i.input.id,
                ...("name" in i.input && { name: i.input.name }),
                ...("description" in i.input && { description: i.input.description }),
            });
            
            expect(output).toStrictEqual({
                id: entity.categoryId.id,
                name: i.expected.name,
                description: i.expected.description,
                createdAt: i.expected.createdAt,
            });
        }
    });
});