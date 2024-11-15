/**
    @typedef {{
        date?: string,
        status?: string,
        teacherIds?: string,
        studentsCount?: string,
        page?: string,
        lessonsPerPage?: string 
    }} GetAllDtoQuery
 */

/**
    @typedef {{
        date?: Date[],
        status?: number,
        teacherIds?: number[],
        studentsCount?: number[],
        page?: number,
        lessonsPerPage?: number 
    }} GetAllDtoTransform
 */

/**
    @typedef {{
        message: string,
        code: number
    }} Error
 */
