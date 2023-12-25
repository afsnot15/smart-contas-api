
import { Column, DataType, Model, Table } from "sequelize-typescript";


export type CategoryModelProps = {
    category_id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
  };

@Table({ tableName: "categories", timestamps: false })
export class CategoryModel extends Model {
    @Column({ type: DataType.UUID })
    declare categoryId: string;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    declare name: string;

    @Column({ allowNull: true, type: DataType.TEXT() })
    declare description: string | null;

    @Column({ allowNull: false, type: DataType.DATE(3) })
    declare createdAt: Date;
}