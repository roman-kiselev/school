import { LessonsService } from "../../index.js";
import("../../types/index.js").Type;
class LessonControler {
    /**
     * @param {{
     *  validatedQuery: GetAllDtoTransform
     * }} request
     * @param {response} response
     */
    async getAll(request, response) {
        const { validatedQuery } = request;
        const data = await LessonsService.getAll({ ...validatedQuery });
        return response.json(data);
    }
}

export default new LessonControler();
