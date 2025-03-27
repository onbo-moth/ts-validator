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
    array() {
        if (!Array.isArray(this.value))
            throw new TypeValidationError(`Expected array, got ${typeof this.value}`);
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
        if (this.value.prototype && this.value.prototype.constructor === this.value)
            throw new TypeValidationError(`Expected function, got class constructor ${this.value}`);
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
        if (this.value !== undefined)
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
    // #region Checking methods
    isNumber() {
        return typeof this.value === "number";
    }
    isString() {
        return typeof this.value === "string";
    }
    isBoolean() {
        return typeof this.value === "boolean";
    }
    isArray() {
        return Array.isArray(this.value);
    }
    isSymbol() {
        return typeof this.value === "symbol";
    }
    isBigInt() {
        return typeof this.value === "bigint";
    }
    isFunction() {
        return typeof this.value === "function" &&
            !(this.value.prototype &&
                this.value.prototype.constructor === this.value);
    }
    isClass() {
        return typeof this.value === "function" &&
            this.value.prototype &&
            this.value.prototype.constructor === this.value;
    }
    isUndefined() {
        return typeof this.value === "undefined";
    }
    isNull() {
        return this.value === null;
    }
    // #endregion
    // #region Access methods
    has(key) {
        if (typeof this.value === "undefined" ||
            this.value === null)
            throw new TypeValidationError("Value is undefined or null.");
        if (typeof this.value === "object" || typeof this.value === "function") {
            if (key in this.value)
                return true;
            if (Object.getPrototypeOf(this.value) &&
                Object.getPrototypeOf(this.value)[key])
                return true;
        }
        return false;
    }
    at(key) {
        if (typeof this.value === "undefined" ||
            this.value === null)
            throw new TypeValidationError("Value is undefined or null.");
        if (typeof this.value === "object" || typeof this.value === "function") {
            if (key in this.value)
                return new Validator(this.value[key]);
            if (Object.getPrototypeOf(this.value) &&
                Object.getPrototypeOf(this.value)[key])
                return new Validator(Object.getPrototypeOf(this.value)[key]);
        }
        throw new TypeValidationError(`Key "${String(key)}" does not exist in ${this.value}`);
    }
    // #endregion
    get() {
        return this.value;
    }
}
exports.Validator = Validator;
