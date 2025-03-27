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
    /**
     * Checks if the value is a instance of a given class.
     * @param constructor Class constructor.
     * @throws { TypeValidationError } If value is not a instance of the class.
     * @returns A new wrapper containing a value known to be an instance.
     */
    instance(constructor) {
        if (!(this.value instanceof constructor))
            throw new TypeValidationError(`Expected value to be an instance of ${constructor}, got ${this.value}`);
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
    /**
     * Checks if value contains a valid key.
     * @param key Key of the value.
     * @throws { TypeValidationError } If value is undefined or null.
     * @returns Boolean indicating presence of given key.
     */
    has(key) {
        if (typeof this.value === "undefined" ||
            this.value === null)
            throw new TypeValidationError("Value is undefined or null.");
        const obj = Object(this.value);
        return key in obj;
    }
    /**
     * Checks if value contains a key and creates a new validator wrapper of the property.
     * @param key Key of the value.
     * @throws { TypeValidationError } If value is undefined or null, or if the key doesn't exist.
     * @returns A new validator wrapper for the value contained in the key.
     */
    at(key) {
        if (typeof this.value === "undefined" ||
            this.value === null)
            throw new TypeValidationError("Value is undefined or null.");
        const obj = Object(this.value);
        if (!(key in obj))
            throw new TypeValidationError(`Key ${String(key)} does not exist in ${this.value}`);
        return new Validator(obj[key]);
    }
    // #endregion
    // #region Static checking methods
    static number(value) {
        if (typeof value !== "number")
            throw new TypeValidationError(`Expected number, got ${typeof value}`);
    }
    static string(value) {
        if (typeof value !== "string")
            throw new TypeValidationError(`Expected string, got ${typeof value}`);
    }
    static boolean(value) {
        if (typeof value !== "boolean")
            throw new TypeValidationError(`Expected boolean, got ${typeof value}`);
    }
    static array(value) {
        if (!Array.isArray(value))
            throw new TypeValidationError(`Expected array, got ${typeof value}`);
    }
    static symbol(value) {
        if (typeof value !== "symbol")
            throw new TypeValidationError(`Expected symbol, got ${typeof value}`);
    }
    static bigint(value) {
        if (typeof value !== "bigint")
            throw new TypeValidationError(`Expected BigInt, got ${typeof value}`);
    }
    static function(value) {
        if (typeof value !== "function")
            throw new TypeValidationError(`Expected function, got ${typeof value}`);
        if (value.prototype && value.prototype.constructor === value)
            throw new TypeValidationError(`Expected function, got class constructor ${value}`);
    }
    static class(value) {
        if (typeof value !== "function" ||
            !value.prototype ||
            value.prototype.constructor !== value)
            throw new TypeValidationError(`Expected class, got ${typeof value}`);
    }
    static undefined(value) {
        if (value !== undefined)
            throw new TypeValidationError(`Expected undefined, got ${typeof value}`);
    }
    static null(value) {
        if (value !== null)
            throw new TypeValidationError(`Expected null, got ${typeof value}`);
    }
    static instance(value, constructor) {
        if (!(value instanceof constructor))
            throw new TypeValidationError(`Expected value to be an instance of ${constructor}, got ${value}`);
    }
    // #endregion
    // #region Array checks
    /**
     * Checks each element of array for type validity.
     * @param checker Checker function that throws if array value doesn't satisfy type validation.
     * @throws { TypeValidationError } If value is not an array or if checker throws.
     */
    arrayOf(checker) {
        if (!Array.isArray(this.value))
            throw new TypeValidationError(`Expected array, got ${typeof this.value}`);
        this.value.forEach(element => {
            checker(element);
        });
        return new Validator(this.value);
    }
    // #endregion
    get() {
        return this.value;
    }
}
exports.Validator = Validator;
