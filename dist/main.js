"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = exports.TypeValidationError = void 0;
class TypeValidationError extends Error {
}
exports.TypeValidationError = TypeValidationError;
;
// #endregion
class Validator {
    value;
    /**
     * Creates a new validator wrapper object for checking for type validity.
     * @param value Value.
     */
    constructor(value) {
        this.value = value;
    }
    // #region Basic type checks
    /**
     * Checks if the value is a number.
     * @throws { TypeValidationError } If value is not a number.
     * @returns A new wrapper containing a number.
     */
    number() {
        if (typeof this.value !== "number")
            throw new TypeValidationError(`Expected number, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a string.
     * @throws { TypeValidationError } If value is not a string.
     * @returns A new wrapper containing a string.
     */
    string() {
        if (typeof this.value !== "string")
            throw new TypeValidationError(`Expected string, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a boolean.
     * @throws { TypeValidationError } If value is not a boolean.
     * @returns A new wrapper containing a boolean.
     */
    boolean() {
        if (typeof this.value !== "boolean")
            throw new TypeValidationError(`Expected boolean, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a symbol.
     * @throws { TypeValidationError } If value is not a symbol.
     * @returns A new wrapper containing a symbol.
     */
    symbol() {
        if (typeof this.value !== "symbol")
            throw new TypeValidationError(`Expected symbol, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a BigInt.
     * @throws { TypeValidationError } If value is not a BigInt.
     * @returns A new wrapper containing a BigInt.
     */
    bigint() {
        if (typeof this.value !== "bigint")
            throw new TypeValidationError(`Expected bigint, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a function and not a class constructor.
     * @throws { TypeValidationError } If value is not a function, or is a constructor.
     * @returns A new wrapper containing a function.
     */
    function() {
        if (typeof this.value !== "function")
            throw new TypeValidationError(`Expected function, got ${typeof this.value}`);
        if (this.value.prototype &&
            this.value.prototype.constructor === this.value)
            throw new TypeValidationError(`Expected function, got class constructor ( ${this.value} )`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a constructor.
     * @throws { TypeValidationError } If value is not a constructor.
     * @returns A new wrapper containing a constructor.
     */
    class() {
        if (typeof this.value !== "function" ||
            !this.value.prototype ||
            this.value.prototype.constructor !== this.value)
            throw new TypeValidationError(`Expected class, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is undefined.
     * @throws { TypeValidationError } If value is not undefined.
     * @returns A new wrapper containing undefined.
     */
    undefined() {
        if (typeof this.value !== "undefined")
            throw new TypeValidationError(`Expected undefined, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is null.
     * @throws { TypeValidationError } If value is not null.
     * @returns A new wrapper containing null.
     */
    null() {
        if (this.value !== null)
            throw new TypeValidationError(`Expected null, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    // #endregion
    get() {
        return this.value;
    }
}
exports.Validator = Validator;
