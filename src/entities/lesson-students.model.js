import { DataTypes, Model } from "sequelize";
import { sequelize } from "./connection.js";
import { Lessons } from "./lessons.model.js";
import { Students } from "./students.model.js";

class LessonStudents extends Model {}
LessonStudents.init(
    {
        visit: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        lesson_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Lessons,
                key: "id",
            },
        },
        student_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Students,
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "lesson_students",
        createdAt: false,
        updatedAt: false,
    }
);

Lessons.belongsToMany(Students, {
    through: LessonStudents,
    foreignKey: "lesson_id",
});
Students.belongsToMany(Lessons, {
    through: LessonStudents,
    foreignKey: "student_id",
});

export { LessonStudents };
