import("../../types/index.js").Type;
import { Op } from "sequelize";
import { Lessons, Teachers } from "../../index.js";

class LessonsService {
    prepareGetAllDto(dto) {
        const { date, status, teacherIds, studentsCount } = dto;
        const whereConditions = {};

        const addCondition = (key, value) => {
            if (Array.isArray(value)) {
                if (key === "date" && value.length === 2) {
                    whereConditions[key] = {
                        [Op.between]: value.map((dateStr) => new Date(dateStr)),
                    };
                } else {
                    whereConditions[key] = {
                        [Op.in]: value,
                    };
                }
                if (key === "studentsCount") {
                    if (
                        Array.isArray(studentsCount) &&
                        studentsCount.length === 1
                    ) {
                        whereConditions[key] = {
                            limit: studentsCount[0],
                        };
                    } else if (studentsCount.length > 1) {
                        whereConditions[key] = {
                            limit:
                                Math.max(...studentsCount) -
                                Math.min(...studentsCount) +
                                1,
                            offset: Math.min(...studentsCount),
                        };
                    }
                }
            } else if (value !== undefined) {
                whereConditions[key] = value;
            }
        };

        addCondition("date", date);
        addCondition("status", status);
        addCondition("teacherIds", teacherIds);
        addCondition("studentsCount", studentsCount);

        return whereConditions;
    }

    /**
       @param {GetAllDtoTransform} dto 
       @returns {Promise<Lessons[]> | Error} 
     */
    async getAll({
        date,
        status,
        teacherIds,
        studentsCount,
        page = 1,
        lessonsPerPage = 10,
    }) {
        const whereConditions = this.prepareGetAllDto({
            date,
            status,
            teacherIds,
            studentsCount,
        });
        const {
            studentsCount: studentsCountLimit,
            teacherIds: whereTeacherIds,
            ...mainWhere
        } = whereConditions;

        try {
            const lessons = await Lessons.findAll({
                attributes: ["id", "date", "title", "status"],
                include: [
                    {
                        model: Teachers,
                        attributes: ["id", "name"],
                        through: {
                            attributes: [],
                        },
                        where: whereTeacherIds ? { id: whereTeacherIds } : null,
                    },
                ],
                limit: lessonsPerPage,
                offset: (page - 1) * lessonsPerPage,
                where: mainWhere,
            });

            const formattedLessons = await Promise.all(
                lessons.map(async (lesson) => {
                    const students = await lesson.getStudents({
                        attributes: ["id", "name"],
                        through: {
                            attributes: ["visit"],
                            as: "lesson_students",
                        },
                        ...studentsCountLimit,
                    });

                    return {
                        id: lesson.id,
                        date: lesson.date,
                        title: lesson.title,
                        status: lesson.status,
                        visitCount: students.filter(
                            (student) => student.lesson_students.visit
                        ).length,
                        students: students.map((student) => ({
                            id: student.id,
                            name: student.name,
                            visit: student.lesson_students.visit,
                        })),
                        teachers: lesson.teachers.map((teacher) => ({
                            id: teacher.id,
                            name: teacher.name,
                        })),
                    };
                })
            );

            return formattedLessons;
        } catch (error) {
            if (error instanceof ErrorEvent) {
                return ErrorEvent.internal();
            }
        }
    }
}

export default new LessonsService();
