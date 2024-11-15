import { DataTypes, Model } from "sequelize";
import { sequelize } from "./connection.js";
import { Lessons } from "./lessons.model.js";
import { Teachers } from "./teachers.model.js";

class LessonTeachers extends Model {}
LessonTeachers.init(
    {
        lesson_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Lessons,
                key: "id",
            },
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Teachers,
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "lesson_teachers",
        createdAt: false,
        updatedAt: false,
    }
);

Lessons.belongsToMany(Teachers, {
    through: LessonTeachers,
    foreignKey: "lesson_id",
});
Teachers.belongsToMany(Lessons, {
    through: LessonTeachers,
    foreignKey: "teacher_id",
});

export { LessonTeachers };
