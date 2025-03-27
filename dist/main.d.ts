export declare class TypeValidationError extends Error {
}
export type TypeStringMap = {
    "number": number;
    "string": string;
    "boolean": boolean;
    "symbol": symbol;
    "bigint": bigint;
    "function": (...args: any[]) => any;
    "class": new (...args: any[]) => any;
    "undefined": undefined;
};
export declare class Validator<T> {
    private value;
    /**
     * Creates a new validator wrapper object for checking for type validity.
     * @param value Value.
     */
    constructor(value: unknown);
    /**
     * Checks if the value is a number.
     * @throws { TypeValidationError } If value is not a number.
     * @returns A new wrapper containing a number.
     */
    number(): Validator<number>;
    /**
     * Checks if the value is a string.
     * @throws { TypeValidationError } If value is not a string.
     * @returns A new wrapper containing a string.
     */
    string(): Validator<string>;
    /**
     * Checks if the value is a boolean.
     * @throws { TypeValidationError } If value is not a boolean.
     * @returns A new wrapper containing a boolean.
     */
    boolean(): Validator<boolean>;
    /**
     * Checks if the value is a symbol.
     * @throws { TypeValidationError } If value is not a symbol.
     * @returns A new wrapper containing a symbol.
     */
    symbol(): Validator<symbol>;
    /**
     * Checks if the value is a BigInt.
     * @throws { TypeValidationError } If value is not a BigInt.
     * @returns A new wrapper containing a BigInt.
     */
    bigint(): Validator<bigint>;
    /**
     * Checks if the value is a function and not a class constructor.
     * @throws { TypeValidationError } If value is not a function, or is a constructor.
     * @returns A new wrapper containing a function.
     */
    function(): Validator<TypeStringMap["function"]>;
    /**
     * Checks if the value is a constructor.
     * @throws { TypeValidationError } If value is not a constructor.
     * @returns A new wrapper containing a constructor.
     */
    class(): Validator<TypeStringMap["class"]>;
    /**
     * Checks if the value is undefined.
     * @throws { TypeValidationError } If value is not undefined.
     * @returns A new wrapper containing undefined.
     */
    undefined(): Validator<undefined>;
    /**
     * Checks if the value is null.
     * @throws { TypeValidationError } If value is not null.
     * @returns A new wrapper containing null.
     */
    null(): Validator<null>;
    get(): T;
}
//# sourceMappingURL=main.d.ts.map