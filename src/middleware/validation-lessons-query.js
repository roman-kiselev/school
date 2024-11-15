import { ErrorEvent, Validator } from "../helpers/index.js";

/**
 * @param {{
 *  query: GetAllDtoQuery
 * }} request
 */
export default (request, response, next) => {
    try {
        const { query } = request;

        const data = {
            date: new Validator(query.date, "date")
                .isOptional()
                .toArray()
                .isMaxLength(2).value,
            status: new Validator(query.status, "status")
                .isOptional()
                .isNumber()
                .isValues(0, 1).value,
            teacherIds: new Validator(query.teacherIds, "teacherIds")
                .isOptional()
                .toArrayNumber().value,
            studentsCount: new Validator(query.studentsCount, "studentsCount")
                .isOptional()
                .toArrayNumber()
                .isMaxLength(2).value,
            page: new Validator(query.page, "page").isOptional().isNumber()
                .value,
            lessonsPerPage: new Validator(
                query.lessonsPerPage,
                "lessonsPerPage"
            )
                .isOptional()
                .isNumber().value,
        };

        const mapData = new Map(Object.entries(data));
        mapData.forEach((value, key) => {
            if (value === undefined) {
                delete data[key];
            }
        });

        request.validatedQuery = data || {};

        next();
    } catch (e) {
        if (e instanceof ErrorEvent) {
            return response.json(e);
        } else {
            console.error(e);
            return response.json(ErrorEvent.internal());
        }
    }
};
