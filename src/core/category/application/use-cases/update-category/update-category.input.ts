import { IsNotEmpty, IsOptional, IsString, validateSync } from "class-validator";
import { Is } from "sequelize-typescript";

export type UpdateCategoryInputConstructorProps = {
    id: string;
    name: string;
    description?: string | null;
};

export class UpdateCategoryInput {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string | null;

    constructor(props?: UpdateCategoryInputConstructorProps) {
        if (!props) return;

        this.id = props.id;
        props.name && (this.name = props.name);
        props.description && (this.description = props.description);
    }
}

export class ValidateUpdateCategoryInput {
    static validate(input: UpdateCategoryInput) {
        return validateSync(input);
    }
}
