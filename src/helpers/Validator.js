import ErrorEvent from "./ErrorEvent.js";

class Validator {
    constructor(value, fieldName) {
        this._value = value;
        this.fieldName = fieldName;
        this.isOptionalMode = false;
    }

    get value() {
        this.__checkOptionalMode();
        return this._value;
    }

    __checkOptionalMode() {
        if (this.isOptionalMode && this._value === undefined) {
            return undefined;
        } else if (!this.isOptionalMode && this._value === undefined) {
            throw ErrorEvent.badRequest(
                `Field '${this.fieldName}' is required.`
            );
        }
    }

    isOptional() {
        this.isOptionalMode = true;
        return this;
    }

    isDate() {
        this.__checkOptionalMode();
        if (this.isOptionalMode && this._value === undefined) {
            return undefined;
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (!dateRegex.test(this._value)) {
            throw ErrorEvent.badRequest(
                `Field '${this.fieldName}' must be a valid date.`
            );
        }

        return this;
    }

    toArray() {
        this.__checkOptionalMode();
        if (this.isOptionalMode && this._value === undefined) {
            return undefined;
        }
        if (!Array.isArray(this._value)) {
            this._value = this._value.split(",").map((item) => item.trim());
        } else {
            this._value = this._value;
        }

        return this;
    }

    toArrayNumber() {
        this.__checkOptionalMode();
        if (this.isOptionalMode && this._value === undefined) {
            return undefined;
        }
        if (!Array.isArray(this._value)) {
            this._value = this._value.split(",").map((item) => Number(item));
        } else {
            this._value = this._value;
        }
        return this;
    }

    isString() {
        this.__checkOptionalMode();
        if (this.isOptionalMode && this._value === undefined) {
            return undefined;
        }
        if (typeof this._value !== "string") {
            throw ErrorEvent.badRequest(
                `Field '${this.fieldName}' must be a string.`
            );
        }
        return this;
    }

    isNumber() {
        this.__checkOptionalMode();
        if (this.isOptionalMode && this._value === undefined) {
            return undefined;
        }

        if (isNaN(this._value)) {
            throw ErrorEvent.badRequest(
                `Field "${this.fieldName}" must be a number.`
            );
        }
        this._value = Number(this._value);

        return this;
    }

    isMaxLength(length) {
        this.__checkOptionalMode();
        if (this.isOptionalMode && this._value === undefined) {
            return undefined;
        }
        if (Array.isArray(this._value)) {
            if (this._value.length > length) {
                throw ErrorEvent.badRequest(
                    `Field "${this.fieldName}" must have at most ${length} characters.`
                );
            }
        } else {
            if (this._value.length > length) {
                throw ErrorEvent.badRequest(
                    `Field "${this.fieldName}" must have at most ${length} characters.`
                );
            }
        }

        return this;
    }

    isValues(...values) {
        this.__checkOptionalMode();
        if (this.isOptionalMode && this._value === undefined) {
            return undefined;
        }
        if (!values.includes(this._value)) {
            throw ErrorEvent.badRequest(
                `Field "${
                    this.fieldName
                }" must be one of the following values: ${values.join(", ")}.`
            );
        }
        return this;
    }
}

export default Validator;
