import { DataTypes, Model } from "sequelize";
import { sequelize } from "./connection.js";

class Students extends Model {}
Students.init(
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
        modelName: "students",
        createdAt: false,
        updatedAt: false,
    }
);
export { Students };
