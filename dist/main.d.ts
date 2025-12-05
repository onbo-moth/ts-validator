export declare class TypeValidationError extends Error {
}
export type ExtractAssertedType<T> = T extends (value: unknown) => asserts value is infer U ? U : never;
export type AssertionFunction<T> = (value: unknown) => asserts value is T;
/**
 * @deprecated Use `ExtractAssertedType< T >`.
 */
export type AssertedType<T> = ExtractAssertedType<T>;
/**
 * @deprecated Use `AssertionFunction< T >`
 */
export type ValidatorFunction<T> = AssertionFunction<T>;
export type TypeStringMap = {
    "number": number;
    "string": string;
    "boolean": boolean;
    "symbol": symbol;
    "bigint": bigint;
    "object": object;
    "function": (...args: any[]) => any;
    "constructor": new (...args: any[]) => any;
    "undefined": undefined;
};
export type IsNumber<T> = T extends number ? T : never;
export type IsString<T> = T extends string ? T : never;
export type IsBoolean<T> = T extends boolean ? T : never;
export type IsSymbol<T> = T extends symbol ? T : never;
export type IsBigint<T> = T extends bigint ? T : never;
export type IsObject<T> = T extends object ? T : never;
export type IsFunction<T> = T extends TypeStringMap["function"] ? T : never;
export type IsClass<T> = T extends TypeStringMap["constructor"] ? T : never;
export type IsUndefined<T> = T extends undefined ? T : never;
export type IsArray<T> = T extends unknown[] ? T : never;
export declare class Validator<T> {
    private value;
    /**
     * Creates a new validator wrapper object for checking for type validity.
     * @param value Value.
     */
    constructor(value: T);
    isNumber(): boolean;
    isString(): boolean;
    isBoolean(): boolean;
    isArray(): boolean;
    isSymbol(): boolean;
    isBigInt(): boolean;
    isObject(): boolean;
    isFunction(): boolean;
    isConstructor(): any;
    isUndefined(): boolean;
    isNull(): boolean;
    /**
     * Checks if the value is a number.
     * @throws { TypeValidationError } If value is not a number.
     * @returns A new wrapper containing a number.
     */
    assertToNumber(): Validator<number>;
    /**
     * Checks if the value is a string.
     * @throws { TypeValidationError } If value is not a string.
     * @returns A new wrapper containing a string.
     */
    assertToString(): Validator<string>;
    /**
     * Checks if the value is a boolean.
     * @throws { TypeValidationError } If value is not a boolean.
     * @returns A new wrapper containing a boolean.
     */
    assertToBoolean(): Validator<boolean>;
    /**
     * Checks if the value is an array.
     * @throws { TypeValidationError } If value is not an array.
     * @returns A new wrapper containing an array.
     */
    assertToArray(): Validator<T & unknown[]>;
    /**
     * Checks if the value is a symbol.
     * @throws { TypeValidationError } If value is not a symbol.
     * @returns A new wrapper containing a symbol.
     */
    assertToSymbol(): Validator<symbol>;
    /**
     * Checks if the value is a BigInt.
     * @throws { TypeValidationError } If value is not a BigInt.
     * @returns A new wrapper containing a BigInt.
     */
    assertToBigInt(): Validator<bigint>;
    /**
     * Checks if the value is a basic object (non-function)
     *
     */
    assertToObject(): Validator<object>;
    /**
     * Checks if the value is a function and not a class constructor.
     * @throws { TypeValidationError } If value is not a function, or is a constructor.
     * @returns A new wrapper containing a function.
     */
    assertToFunction(): Validator<TypeStringMap["function"]>;
    /**
     * Checks if the value is a constructor.
     * @throws { TypeValidationError } If value is not a constructor.
     * @returns A new wrapper containing a constructor.
     */
    assertToConstructor(): Validator<TypeStringMap["constructor"]>;
    /**
     * Checks if the value is undefined.
     * @throws { TypeValidationError } If value is not undefined.
     * @returns A new wrapper containing undefined.
     */
    assertToUndefined(): Validator<undefined>;
    /**
     * Checks if the value is null.
     * @throws { TypeValidationError } If value is not null.
     * @returns A new wrapper containing null.
     */
    assertToNull(): Validator<null>;
    /**
     * Checks if the value is a instance of a given class.
     * @param constructor Class constructor.
     * @throws { TypeValidationError } If value is not a instance of the class.
     * @returns A new wrapper containing a value known to be an instance.
     */
    assertInstanceOf<U extends TypeStringMap["constructor"]>(constructor: U): Validator<InstanceType<U>>;
    /**
     * Checks if the value is a number or a null.
     * @throws { TypeValidationError } If value is not a number nor null.
     * @returns A new wrapper containing a number or a null.
     */
    assertToNumberOrNull(): Validator<number | null>;
    /**
     * Checks if the value is a string or a null.
     * @throws { TypeValidationError } If value is not a string nor null.
     * @returns A new wrapper containing a string or a null.
     */
    assertToStringOrNull(): Validator<string | null>;
    /**
     * Checks if the value is a boolean or a null.
     * @throws { TypeValidationError } If value is not a boolean nor null.
     * @returns A new wrapper containing a boolean or a null.
     */
    assertToBooleanOrNull(): Validator<boolean | null>;
    /**
     * Checks if the value is an array or a null.
     * @throws { TypeValidationError } If value is not an array nor null.
     * @returns A new wrapper containing an array or a null.
     */
    assertToArrayOrNull(): Validator<(T & unknown[]) | null>;
    /**
     * Checks if the value is a symbol or null.
     * @throws { TypeValidationError } If value is not a symbol nor null.
     * @returns A new wrapper containing a symbol or a null.
     */
    assertToSymbolOrNull(): Validator<symbol | null>;
    /**
     * Checks if the value is a BigInt or null.
     * @throws { TypeValidationError } If value is not a BigInt nor null.
     * @returns A new wrapper containing a BigInt or a null.
     */
    assertToBigIntOrNull(): Validator<bigint | null>;
    /**
     * Checks if the value is an object or null.
     * @throws { TypeValidationError } If value is not an object nor null.
     * @returns A new wrapper containing an object or a null.
     */
    assertToObjectOrNull(): Validator<object | null>;
    /**
     * Checks if the value is a function or null and not a class constructor.
     * @throws { TypeValidationError } If value is not a function nor null, or is a constructor.
     * @returns A new wrapper containing a function or a null.
     */
    assertToFunctionOrNull(): Validator<TypeStringMap["function"] | null>;
    /**
     * Checks if the value is a constructor or null.
     * @throws { TypeValidationError } If value is not a constructor nor null.
     * @returns A new wrapper containing a constructor or null.
     */
    assertToConstructorOrNull(): Validator<TypeStringMap["constructor"] | null>;
    /**
     * Checks if the value is undefined or null.
     * @throws { TypeValidationError } If value is not undefined nor null.
     * @returns A new wrapper containing undefined or null.
     */
    assertToUndefinedOrNull(): Validator<undefined | null>;
    /**
     * Checks if the value is a instance of a given class.
     * @param constructor Class constructor.
     * @throws { TypeValidationError } If value is not a instance of the class.
     * @returns A new wrapper containing a value known to be an instance.
     */
    assertInstanceOfOrNull<U extends TypeStringMap["constructor"]>(constructor: U): Validator<InstanceType<U> | null>;
    /**
     * Checks if value contains a valid key.
     * @param key Key of the value.
     * @throws { TypeValidationError } If value is undefined or null.
     * @returns Boolean indicating presence of given key.
     */
    containsProperty<K extends PropertyKey>(key: K): boolean;
    /**
     * Checks if value contains a key and creates a new validator wrapper of the property.
     * @param key Key of the value.
     * @throws { TypeValidationError } If value is undefined or null, or if the key doesn't exist.
     * @returns A new validator wrapper for the value contained in the key.
     */
    assertAndSelectProperty<K extends PropertyKey>(key: K): Validator<K extends keyof T ? T[K] : unknown>;
    /**
     * Checks each element of array for type validity.
     * @param checker Checker function that throws if array value doesn't satisfy type validation.
     * @throws { TypeValidationError } If value is not an array or if checker throws.
     */
    assertArrayOf<U extends (value: unknown) => asserts value is unknown>(checker: U): Validator<ExtractAssertedType<U>[]>;
    /**
     * Asserts each key in value by using assertion functions.
     * @param object Collection of assertion functions for given keys.
     * @throws { TypeValidationError } If value is undefined or null
     * @throws { TypeValidationError } If value lacks a key.
     * @throws { TypeValidationError } If value's property fails assertion function.
     * @returns
     */
    assertContains<V extends {
        [key: PropertyKey]: (value: unknown) => asserts value is unknown;
    }>(object: V): Validator<T & {
        [key in keyof V]: ExtractAssertedType<V[key]>;
    }>;
    static assertToNumber(value: unknown): asserts value is number;
    static assertToString(value: unknown): asserts value is string;
    static assertToBoolean(value: unknown): asserts value is boolean;
    static assertToArray(value: unknown): asserts value is unknown[];
    static assertToSymbol(value: unknown): asserts value is symbol;
    static assertToBigInt(value: unknown): asserts value is BigInt;
    static assertToObject(value: unknown): asserts value is object;
    static assertToFunction(value: unknown): asserts value is TypeStringMap["function"];
    static assertToConstructor(value: unknown): asserts value is TypeStringMap["constructor"];
    static assertToUndefined(value: unknown): asserts value is undefined;
    static assertToNull(value: unknown): asserts value is null;
    static assertInstanceOf<T, U extends TypeStringMap["constructor"]>(value: T, constructor: U): asserts value is InstanceType<U>;
    static assertToNumberOrNull(value: unknown): asserts value is number | null;
    static assertToStringOrNull(value: unknown): asserts value is string | null;
    static assertToBooleanOrNull(value: unknown): asserts value is boolean | null;
    static assertToArrayOrNull(value: unknown): asserts value is unknown[] | null;
    static assertToSymbolOrNull(value: unknown): asserts value is symbol | null;
    static assertToBigIntOrNull(value: unknown): asserts value is BigInt | null;
    static assertToObjectOrNull(value: unknown): asserts value is object | null;
    static assertToFunctionOrNull(value: unknown): asserts value is TypeStringMap["function"] | null;
    static assertToConstructorOrNull(value: unknown): asserts value is TypeStringMap["constructor"] | null;
    static assertToUndefinedOrNull(value: unknown): asserts value is undefined | null;
    /**
     * @deprecated use `assertToNumberOrNull()` and similar methods instead
     */
    static nullable: {
        number(value: unknown): asserts value is number | null;
        string(value: unknown): asserts value is string | null;
        boolean(value: unknown): asserts value is boolean | null;
        array(value: unknown): asserts value is unknown[] | null;
        symbol(value: unknown): asserts value is symbol | null;
        bigint(value: unknown): asserts value is BigInt | null;
        object(value: unknown): asserts value is object | null;
        function(value: unknown): asserts value is TypeStringMap["function"] | null;
        class(value: unknown): asserts value is TypeStringMap["constructor"] | null;
        undefined(value: unknown): asserts value is undefined | null;
        instance<U extends TypeStringMap["constructor"]>(value: unknown, constructor: U): asserts value is InstanceType<U> | null;
    };
    assert<T extends (value: unknown) => asserts value is unknown>(func: T): Validator<ExtractAssertedType<T>>;
    /**
     * @deprecated use `nullable` instead. made in order to not break cuz making a typo here is fine but in a project that could be used by others it might be PAIN
     */
    static nullible: {
        number(value: unknown): asserts value is number | null;
        string(value: unknown): asserts value is string | null;
        boolean(value: unknown): asserts value is boolean | null;
        array(value: unknown): asserts value is unknown[] | null;
        symbol(value: unknown): asserts value is symbol | null;
        bigint(value: unknown): asserts value is BigInt | null;
        object(value: unknown): asserts value is object | null;
        function(value: unknown): asserts value is TypeStringMap["function"] | null;
        class(value: unknown): asserts value is TypeStringMap["constructor"] | null;
        undefined(value: unknown): asserts value is undefined | null;
        instance<U extends TypeStringMap["constructor"]>(value: unknown, constructor: U): asserts value is InstanceType<U> | null;
    };
    getValue(): T;
}
//# sourceMappingURL=main.d.ts.map