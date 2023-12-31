import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Category } from "./cateory.entity";
import { ClassValidatorFields } from "../../shared/domain/validators/class-validator-fields";

class CategoryRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string | null;

    constructor({ name, description }: Category) {
        Object.assign(this, { name, description });
    }
}

class CategoryValidator extends ClassValidatorFields<CategoryRules> {
    validate(entity: Category) {
        return super.validate(new CategoryRules(entity));
    }
}

export class CategoryValidatorFactory {
    static create() {
        return new CategoryValidator();
    }
}