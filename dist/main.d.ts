export declare class TypeValidationError extends Error {
}
type AssertedType<T> = T extends (value: unknown) => asserts value is infer U ? U : never;
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
    constructor(value: T);
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
    array(): Validator<T & any[]>;
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
    /**
     * Checks if the value is a instance of a given class.
     * @param constructor Class constructor.
     * @throws { TypeValidationError } If value is not a instance of the class.
     * @returns A new wrapper containing a value known to be an instance.
     */
    instance<U extends TypeStringMap["class"]>(constructor: U): Validator<InstanceType<U>>;
    isNumber(): boolean;
    isString(): boolean;
    isBoolean(): boolean;
    isArray(): boolean;
    isSymbol(): boolean;
    isBigInt(): boolean;
    isFunction(): boolean;
    isClass(): any;
    isUndefined(): boolean;
    isNull(): boolean;
    /**
     * Checks if value contains a valid key.
     * @param key Key of the value.
     * @throws { TypeValidationError } If value is undefined or null.
     * @returns Boolean indicating presence of given key.
     */
    has<K extends keyof T>(key: K): boolean;
    /**
     * Checks if value contains a key and creates a new validator wrapper of the property.
     * @param key Key of the value.
     * @throws { TypeValidationError } If value is undefined or null, or if the key doesn't exist.
     * @returns A new validator wrapper for the value contained in the key.
     */
    at<K extends keyof T>(key: K): Validator<T[K]>;
    static number(value: unknown): asserts value is number;
    static string(value: unknown): asserts value is string;
    static boolean(value: unknown): asserts value is boolean;
    static array(value: unknown): asserts value is unknown[];
    static symbol(value: unknown): asserts value is symbol;
    static bigint(value: unknown): asserts value is BigInt;
    static function(value: unknown): asserts value is TypeStringMap["function"];
    static class(value: unknown): asserts value is TypeStringMap["class"];
    static undefined(value: unknown): asserts value is undefined;
    static null(value: unknown): asserts value is null;
    static instance<T, U extends TypeStringMap["class"]>(value: T, constructor: U): asserts value is InstanceType<U>;
    /**
     * Checks each element of array for type validity.
     * @param checker Checker function that throws if array value doesn't satisfy type validation.
     * @throws { TypeValidationError } If value is not an array or if checker throws.
     */
    arrayOf<U extends (value: unknown) => asserts value is any>(checker: U): Validator<AssertedType<U>[]>;
    get(): T;
}
export {};
//# sourceMappingURL=main.d.ts.map