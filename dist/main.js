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
    isObject() {
        return this.value !== null &&
            typeof this.value === "object";
    }
    isFunction() {
        return typeof this.value === "function" &&
            !(this.value.prototype &&
                this.value.prototype.constructor === this.value);
    }
    isConstructor() {
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
    // #region Basic type checks
    /**
     * Checks if the value is a number.
     * @throws { TypeValidationError } If value is not a number.
     * @returns A new wrapper containing a number.
     */
    assertToNumber() {
        if (typeof this.value !== "number")
            throw new TypeValidationError(`Expected number, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a string.
     * @throws { TypeValidationError } If value is not a string.
     * @returns A new wrapper containing a string.
     */
    assertToString() {
        if (typeof this.value !== "string")
            throw new TypeValidationError(`Expected string, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a boolean.
     * @throws { TypeValidationError } If value is not a boolean.
     * @returns A new wrapper containing a boolean.
     */
    assertToBoolean() {
        if (typeof this.value !== "boolean")
            throw new TypeValidationError(`Expected boolean, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is an array.
     * @throws { TypeValidationError } If value is not an array.
     * @returns A new wrapper containing an array.
     */
    assertToArray() {
        if (!Array.isArray(this.value))
            throw new TypeValidationError(`Expected array, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a symbol.
     * @throws { TypeValidationError } If value is not a symbol.
     * @returns A new wrapper containing a symbol.
     */
    assertToSymbol() {
        if (typeof this.value !== "symbol")
            throw new TypeValidationError(`Expected symbol, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a BigInt.
     * @throws { TypeValidationError } If value is not a BigInt.
     * @returns A new wrapper containing a BigInt.
     */
    assertToBigInt() {
        if (typeof this.value !== "bigint")
            throw new TypeValidationError(`Expected bigint, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a basic object (non-function)
     *
     */
    assertToObject() {
        if (this.value === null)
            throw new TypeValidationError(`Expected object, got null`);
        if (typeof this.value !== "object")
            throw new TypeValidationError(`Expected object, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a function and not a class constructor.
     * @throws { TypeValidationError } If value is not a function, or is a constructor.
     * @returns A new wrapper containing a function.
     */
    assertToFunction() {
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
    assertToConstructor() {
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
    assertToUndefined() {
        if (this.value !== undefined)
            throw new TypeValidationError(`Expected undefined, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is null.
     * @throws { TypeValidationError } If value is not null.
     * @returns A new wrapper containing null.
     */
    assertToNull() {
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
    assertInstanceOf(constructor) {
        if (!(this.value instanceof constructor))
            throw new TypeValidationError(`Expected value to be an instance of ${constructor}, got ${this.value}`);
        return new Validator(this.value);
    }
    // #endregion
    // #region Nullable checks
    /**
     * Checks if the value is a number or a null.
     * @throws { TypeValidationError } If value is not a number nor null.
     * @returns A new wrapper containing a number or a null.
     */
    assertToNumberOrNull() {
        if (this.value === null)
            return new Validator(null);
        if (typeof this.value !== "number")
            throw new TypeValidationError(`Expected number or null, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a string or a null.
     * @throws { TypeValidationError } If value is not a string nor null.
     * @returns A new wrapper containing a string or a null.
     */
    assertToStringOrNull() {
        if (this.value === null)
            return new Validator(null);
        if (typeof this.value !== "string")
            throw new TypeValidationError(`Expected string or null, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a boolean or a null.
     * @throws { TypeValidationError } If value is not a boolean nor null.
     * @returns A new wrapper containing a boolean or a null.
     */
    assertToBooleanOrNull() {
        if (this.value === null)
            return new Validator(null);
        if (typeof this.value !== "boolean")
            throw new TypeValidationError(`Expected boolean or null, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is an array or a null.
     * @throws { TypeValidationError } If value is not an array nor null.
     * @returns A new wrapper containing an array or a null.
     */
    assertToArrayOrNull() {
        if (this.value === null)
            return new Validator(null);
        if (!Array.isArray(this.value))
            throw new TypeValidationError(`Expected array or null, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a symbol or null.
     * @throws { TypeValidationError } If value is not a symbol nor null.
     * @returns A new wrapper containing a symbol or a null.
     */
    assertToSymbolOrNull() {
        if (this.value === null)
            return new Validator(null);
        if (typeof this.value !== "symbol")
            throw new TypeValidationError(`Expected symbol, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a BigInt or null.
     * @throws { TypeValidationError } If value is not a BigInt nor null.
     * @returns A new wrapper containing a BigInt or a null.
     */
    assertToBigIntOrNull() {
        if (this.value === null)
            return new Validator(null);
        if (typeof this.value !== "bigint")
            throw new TypeValidationError(`Expected bigint, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is an object or null.
     * @throws { TypeValidationError } If value is not an object nor null.
     * @returns A new wrapper containing an object or a null.
     */
    assertToObjectOrNull() {
        if (typeof this.value !== "object") // yes null is an object
            throw new TypeValidationError(`Expected object or null, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a function or null and not a class constructor.
     * @throws { TypeValidationError } If value is not a function nor null, or is a constructor.
     * @returns A new wrapper containing a function or a null.
     */
    assertToFunctionOrNull() {
        if (this.value === null)
            return new Validator(null);
        if (typeof this.value !== "function")
            throw new TypeValidationError(`Expected function or null, got ${typeof this.value}`);
        if (this.value.prototype && this.value.prototype.constructor === this.value)
            throw new TypeValidationError(`Expected function, got class constructor ${this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a constructor or null.
     * @throws { TypeValidationError } If value is not a constructor nor null.
     * @returns A new wrapper containing a constructor or null.
     */
    assertToConstructorOrNull() {
        if (this.value === null)
            return new Validator(null);
        if (typeof this.value !== "function" ||
            !this.value.prototype ||
            this.value.prototype.constructor !== this.value)
            throw new TypeValidationError(`Expected class or null, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is undefined or null.
     * @throws { TypeValidationError } If value is not undefined nor null.
     * @returns A new wrapper containing undefined or null.
     */
    assertToUndefinedOrNull() {
        if (this.value === null)
            return new Validator(null);
        if (this.value !== undefined)
            throw new TypeValidationError(`Expected undefined or null, got ${typeof this.value}`);
        return new Validator(this.value);
    }
    /**
     * Checks if the value is a instance of a given class.
     * @param constructor Class constructor.
     * @throws { TypeValidationError } If value is not a instance of the class.
     * @returns A new wrapper containing a value known to be an instance.
     */
    assertInstanceOfOrNull(constructor) {
        if (this.value === null)
            return new Validator(null);
        if (!(this.value instanceof constructor))
            throw new TypeValidationError(`Expected value to be an instance of ${constructor}, got ${this.value}`);
        return new Validator(this.value);
    }
    // #endregion
    // #region Access methods
    /**
     * Checks if value contains a valid key.
     * @param key Key of the value.
     * @throws { TypeValidationError } If value is undefined or null.
     * @returns Boolean indicating presence of given key.
     */
    containsProperty(key) {
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
    assertAndSelectProperty(key) {
        if (typeof this.value === "undefined" ||
            this.value === null)
            throw new TypeValidationError("Value is undefined or null.");
        const obj = Object(this.value);
        if (!(key in obj))
            throw new TypeValidationError(`Key ${String(key)} does not exist in ${this.value}`);
        return new Validator(obj[key]);
    }
    // #endregion
    // #region Array checks
    /**
     * Checks each element of array for type validity.
     * @param checker Checker function that throws if array value doesn't satisfy type validation.
     * @throws { TypeValidationError } If value is not an array or if checker throws.
     */
    assertArrayOf(checker) {
        if (!Array.isArray(this.value))
            throw new TypeValidationError(`Expected array, got ${typeof this.value}`);
        this.value.forEach(element => {
            checker(element);
        });
        return new Validator(this.value);
    }
    // #endregion
    // #region Object checks
    /**
     * Asserts each key in value by using assertion functions.
     * @param object Collection of assertion functions for given keys.
     * @throws { TypeValidationError } If value is undefined or null
     * @throws { TypeValidationError } If value lacks a key.
     * @throws { TypeValidationError } If value's property fails assertion function.
     * @returns
     */
    assertContains(object) {
        if (typeof this.value === "undefined" || this.value === null)
            throw new TypeValidationError(`Value is undefined or null.`);
        const val = Object(this.value);
        for (const key in object) {
            if (!(key in val))
                throw new TypeValidationError(`Value is missing a key: ${key}`);
            const assert = object[key];
            assert(val[key]);
        }
        // no throws, nice
        return new Validator(this.value);
    }
    // #endregion
    // #region Static assertion methods
    static assertToNumber(value) {
        if (typeof value !== "number")
            throw new TypeValidationError(`Expected number, got ${typeof value}`);
    }
    static assertToString(value) {
        if (typeof value !== "string")
            throw new TypeValidationError(`Expected string, got ${typeof value}`);
    }
    static assertToBoolean(value) {
        if (typeof value !== "boolean")
            throw new TypeValidationError(`Expected boolean, got ${typeof value}`);
    }
    static assertToArray(value) {
        if (!Array.isArray(value))
            throw new TypeValidationError(`Expected array, got ${typeof value}`);
    }
    static assertToSymbol(value) {
        if (typeof value !== "symbol")
            throw new TypeValidationError(`Expected symbol, got ${typeof value}`);
    }
    static assertToBigInt(value) {
        if (typeof value !== "bigint")
            throw new TypeValidationError(`Expected BigInt, got ${typeof value}`);
    }
    static assertToObject(value) {
        if (value === null)
            throw new TypeValidationError(`Expected object, got null`);
        if (typeof value !== "object")
            throw new TypeValidationError(`Expected object, got ${typeof value}`);
    }
    static assertToFunction(value) {
        if (typeof value !== "function")
            throw new TypeValidationError(`Expected function, got ${typeof value}`);
        if (value.prototype && value.prototype.constructor === value)
            throw new TypeValidationError(`Expected function, got class constructor ${value}`);
    }
    static assertToConstructor(value) {
        if (typeof value !== "function" ||
            !value.prototype ||
            value.prototype.constructor !== value)
            throw new TypeValidationError(`Expected class, got ${typeof value}`);
    }
    static assertToUndefined(value) {
        if (value !== undefined)
            throw new TypeValidationError(`Expected undefined, got ${typeof value}`);
    }
    static assertToNull(value) {
        if (value !== null)
            throw new TypeValidationError(`Expected null, got ${typeof value}`);
    }
    static assertInstanceOf(value, constructor) {
        if (!(value instanceof constructor))
            throw new TypeValidationError(`Expected value to be an instance of ${constructor}, got ${value}`);
    }
    // #endregion
    // #region Nullable static assertion methods
    static assertToNumberOrNull(value) {
        if (value === null)
            return;
        if (typeof value !== "number")
            throw new TypeValidationError(`Expected number or null, got ${typeof value}`);
    }
    static assertToStringOrNull(value) {
        if (value === null)
            return;
        if (typeof value !== "string")
            throw new TypeValidationError(`Expected string or null, got ${typeof value}`);
    }
    static assertToBooleanOrNull(value) {
        if (value === null)
            return;
        if (typeof value !== "boolean")
            throw new TypeValidationError(`Expected boolean or null, got ${typeof value}`);
    }
    static assertToArrayOrNull(value) {
        if (value === null)
            return;
        if (!Array.isArray(value))
            throw new TypeValidationError(`Expected array or null, got ${typeof value}`);
    }
    static assertToSymbolOrNull(value) {
        if (value === null)
            return;
        if (typeof value !== "symbol")
            throw new TypeValidationError(`Expected symbol or null, got ${typeof value}`);
    }
    static assertToBigIntOrNull(value) {
        if (value === null)
            return;
        if (typeof value !== "bigint")
            throw new TypeValidationError(`Expected BigInt or null, got ${typeof value}`);
    }
    static assertToObjectOrNull(value) {
        if (value === null)
            return;
        if (typeof value !== "object")
            throw new TypeValidationError(`Expected object or null, got ${typeof value}`);
    }
    static assertToFunctionOrNull(value) {
        if (value === null)
            return;
        if (typeof value !== "function")
            throw new TypeValidationError(`Expected function or null, got ${typeof value}`);
        if (value.prototype && value.prototype.constructor === value)
            throw new TypeValidationError(`Expected function, got class constructor ${value}`);
    }
    static assertToConstructorOrNull(value) {
        if (value === null)
            return;
        if (typeof value !== "function" ||
            !value.prototype ||
            value.prototype.constructor !== value)
            throw new TypeValidationError(`Expected constructor or null, got ${typeof value}`);
    }
    static assertToUndefinedOrNull(value) {
        if (value === null)
            return;
        if (value !== undefined)
            throw new TypeValidationError(`Expected undefined or null, got ${typeof value}`);
    }
    // #endregion
    /**
     * @deprecated use `assertToNumberOrNull()` and similar methods instead
     */
    static nullable = {
        number(value) {
            if (value === null)
                return;
            if (typeof value !== "number")
                throw new TypeValidationError(`Expected number, got ${typeof value}`);
        },
        string(value) {
            if (value === null)
                return;
            if (typeof value !== "string")
                throw new TypeValidationError(`Expected string, got ${typeof value}`);
        },
        boolean(value) {
            if (value === null)
                return;
            if (typeof value !== "boolean")
                throw new TypeValidationError(`Expected boolean, got ${typeof value}`);
        },
        array(value) {
            if (value === null)
                return;
            if (!Array.isArray(value))
                throw new TypeValidationError(`Expected array, got ${typeof value}`);
        },
        symbol(value) {
            if (value === null)
                return;
            if (typeof value !== "symbol")
                throw new TypeValidationError(`Expected symbol, got ${typeof value}`);
        },
        bigint(value) {
            if (value === null)
                return;
            if (typeof value !== "bigint")
                throw new TypeValidationError(`Expected BigInt, got ${typeof value}`);
        },
        object(value) {
            if (value === null)
                return;
            if (typeof value !== "object")
                throw new TypeValidationError(`Expected object, got ${typeof value}`);
        },
        function(value) {
            if (value === null)
                return;
            if (typeof value !== "function")
                throw new TypeValidationError(`Expected function, got ${typeof value}`);
            if (value.prototype && value.prototype.constructor === value)
                throw new TypeValidationError(`Expected function, got class constructor ${value}`);
        },
        class(value) {
            if (value === null)
                return;
            if (typeof value !== "function" ||
                !value.prototype ||
                value.prototype.constructor !== value)
                throw new TypeValidationError(`Expected class, got ${typeof value}`);
        },
        undefined(value) {
            if (value === null)
                return;
            if (value !== undefined)
                throw new TypeValidationError(`Expected undefined, got ${typeof value}`);
        },
        instance(value, constructor) {
            if (value === null)
                return;
            if (!(value instanceof constructor))
                throw new TypeValidationError(`Expected value to be an instance of ${constructor}, got ${value}`);
        }
    };
    assert(func) {
        func(this.value);
        // i guess it doesnt error out soo
        return new Validator(this.value);
    }
    /**
     * @deprecated use `nullable` instead. made in order to not break cuz making a typo here is fine but in a project that could be used by others it might be PAIN
     */
    static nullible = Validator.nullable;
    getValue() {
        return this.value;
    }
}
exports.Validator = Validator;
