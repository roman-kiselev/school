import { ErrorEvent } from "../helpers/index.js";

export default (err, res) => {
    if (err instanceof ErrorEvent) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.json(ErrorEvent.internal());
};
