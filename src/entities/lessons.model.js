import { DataTypes, Model } from "sequelize";
import { sequelize } from "./connection.js";

class Lessons extends Model {}
Lessons.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: "lessons",
        createdAt: false,
        updatedAt: false,
    }
);

export { Lessons };
