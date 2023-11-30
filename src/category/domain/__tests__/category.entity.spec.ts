import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../cateory.entity";

describe('Category Unit Tests', () => {
    let validadeSpy: any;

    beforeEach(() => {
        validadeSpy = jest.spyOn(Category, 'validate');
    });

    describe('constructor', () => {

        test('should create a category with a name and description', () => {
            let category = new Category({ name: 'Test Category' });

            expect(category.categoryId).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Test Category');
            expect(category.description).toBeNull();
            expect(category.createdAt).toBeInstanceOf(Date);
        });

        test('should create a category with a name, description and createdAt', () => {
            const createdAt = new Date();
            const category = new Category({ name: 'Test Category', description: 'Test Description', createdAt });

            expect(category.categoryId).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Test Category');
            expect(category.description).toBe('Test Description');
            expect(category.createdAt).toBe(createdAt);
        });
    });

    describe('category_id field', () => {
        const arrange = [{ categoryId: null }, { categoryId: undefined }, { categoryId: new Uuid() }];
        test.each(arrange)('id = %j', ({ categoryId }) => {
            const category = new Category({
                name: 'Test Category', categoryId: categoryId as any,
            });

            expect(category.categoryId).toBeInstanceOf(Uuid);
            if (categoryId instanceof Uuid) {
                expect(category.categoryId).toBe(categoryId);
            }
        });
    });


    test('changeName should change the name of the category', () => {
        const category = new Category({ name: 'Test Category' });
        category.changeName('New Test Category');

        expect(category.name).toBe('New Test Category');
        expect(validadeSpy).toHaveBeenCalledTimes(1);
    });

    test('changeDescription should change the description of the category', () => {
        const category = new Category({ name: 'Test Category' });
        category.changeDescription('New Test Description');

        expect(category.description).toBe('New Test Description');
        expect(validadeSpy).toHaveBeenCalledTimes(1);
    });

    test('create should create a new category', () => {
        const category = Category.create({ name: 'Test Category' });

        expect(category.categoryId).toBeInstanceOf(Uuid);
        expect(category.name).toBe('Test Category');
        expect(category.description).toBeNull();
        expect(category.createdAt).toBeInstanceOf(Date);
        expect(validadeSpy).toHaveBeenCalledTimes(1);
    });
});

describe('Category Validation Tests', () => {

    describe("create command", () => {
        test('should an invalid category with name property', () => {

            expect(() => Category.create({ name: null })).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });


            expect(() => Category.create({ name: "" })).containsErrorMessages({
                name: ["name should not be empty"],
            });

            expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() =>
                Category.create({ name: "t".repeat(256) })
            ).containsErrorMessages({
                name: ["name must be shorter than or equal to 255 characters"],
            });


        });

        test("should a invalid category using description property", () => {
            expect(() =>
                Category.create({ description: 5 } as any)
            ).containsErrorMessages({
                description: ["description must be a string"],
            });
        });
    });


    describe("changeName method", () => {
        test("should a invalid category using name property", () => {
            const category = Category.create({ name: "Movie" });
            expect(() => category.changeName(null)).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => category.changeName("")).containsErrorMessages({
                name: ["name should not be empty"],
            });

            expect(() => category.changeName(5 as any)).containsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => category.changeName("t".repeat(256))).containsErrorMessages({
                name: ["name must be shorter than or equal to 255 characters"],
            });
        });
    });

    describe("changeDescription method", () => {
        test("should a invalid category using description property", () => {
            const category = Category.create({ name: "Movie" });
            expect(() => category.changeDescription(5 as any)).containsErrorMessages({
                description: ["description must be a string"],
            });
        });
    });
});