import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";

describe('Uuid Unit Tests', () => {
    const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

    test('should throw error when uuid is invalid', () => {
        expect(() => {
            new Uuid('invalid-uuid');
        }).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
    });

    test('should accept valid uuid', () => {
        const uuid = new Uuid('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
        expect(uuid.id).toBe('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');

        expect(validateSpy).toHaveBeenCalled();
    });

    test('should generate a new uuid', () => {
        const uuid = new Uuid();
        expect(uuid.id).toBeDefined();
        expect(uuidValidate(uuid.id)).toBeTruthy();

        expect(validateSpy).toHaveBeenCalled();
    });
});