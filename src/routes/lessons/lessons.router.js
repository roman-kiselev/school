import express from "express";
import { LessonController } from "../../controllers/index.js";
import { ValidationLessonsQuery } from "../../middleware/index.js";
const lessonsRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный идентификатор события
 *         date:
 *           type: string
 *           format: date
 *           description: Дата события
 *         title:
 *           type: string
 *           description: Заголовок события
 *         status:
 *           type: integer
 *           description: Статус события (например, 1 — активен)
 *         visitCount:
 *           type: integer
 *           description: Количество посещений события
 *         students:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Student'
 *           description: Список студентов, которые посещают событие
 *         teachers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Teacher'
 *           description: Список преподавателей события
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный идентификатор студента
 *         name:
 *           type: string
 *           description: Имя студента
 *         visit:
 *           type: boolean
 *           description: Статус посещения студентом события
 *     Teacher:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный идентификатор преподавателя
 *         name:
 *           type: string
 *           description: Имя преподавателя
 * paths:
 *   /lessons:
 *     get:
 *       summary: Получить список всех событий
 *       responses:
 *         '200':
 *           description: Успешный ответ
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Event'
 */

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Получение уроков по API
 * /lessons:
 *   get:
 *     summary: Список всех уроков.
 *     tags: [Lessons]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: false
 *         description: Дата в формате YYYY-MM-DD(YYYY-MM-DD, YYYY-MM-DD). Не более 2 значений.
 *         schema:
 *           type: string
 *           example: "2023-01-01"
 *       - in: query
 *         name: status
 *         required: false
 *         description: Статус урока (Одно значение)
 *         schema:
 *           type: string
 *           example: 0
 *       - in: query
 *         name: teacherIds
 *         required: false
 *         description: Идентификаторы преподавателей (через запятую)
 *         schema:
 *           type: string
 *           example: 1, 2
 *       - in: query
 *         name: studentsCount
 *         required: false
 *         description: Количество учеников (через запятую). Не более 2 значений.
 *         schema:
 *           type: string
 *           example: 1
 *       - in: query
 *         name: page
 *         required: false
 *         description: Страница списка(Одно значение)
 *         schema:
 *           type: string
 *           example: 1
 *       - in: query
 *         name: lessonsPerPage
 *         required: false
 *         description: Количество уроков на странице (Одно значение)
 *         schema:
 *           type: string
 *           example: 10
 *     responses:
 *       200:
 *         description: The list of the lessons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lesson'
 */
lessonsRouter.get("/", ValidationLessonsQuery, LessonController.getAll);

export default lessonsRouter;
