import { DataTypes, Model } from "sequelize";
import { sequelize } from "./connection.js";

class Teachers extends Model {}
Teachers.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "teachers",
        createdAt: false,
        updatedAt: false,
    }
);

export { Teachers };
