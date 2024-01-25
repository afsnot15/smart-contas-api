import { IsOptional, IsString, MaxLength } from "class-validator";
import { ClassValidatorFields } from "../../shared/domain/validators/class-validator-fields";
import { Category } from "./category.entity";
import { Notification } from "../../shared/domain/validators/notification";


class CategoryRules {
    @MaxLength(255, {groups: ['name']})
    name: string;

    @IsString()
    @IsOptional()
    description: string | null;

    constructor({ name, description }: Category) {
        Object.assign(this, { name, description });
    }
}

export class CategoryValidator extends ClassValidatorFields {
    validate(notification: Notification, data: any, fields?: string[]): boolean {
      const newFields = fields?.length ? fields : ['name'];
      return super.validate(notification, new CategoryRules(data), newFields);
}
}

export class CategoryValidatorFactory {
    static create() {
        return new CategoryValidator();
    }
}