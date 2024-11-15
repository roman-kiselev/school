class ErrorEvent extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message) {
        return new ErrorEvent(400, message || "Bad request");
    }

    static internal(message) {
        return new ErrorEvent(500, "Internal server error" || message);
    }
}

export default ErrorEvent;
