export class TypeValidationError extends Error {};

type AssertedType< T > = T extends ( value: unknown ) => asserts value is infer U ? U : never;

// #region Type string map

export type TypeStringMap = {
  "number":    number,
  "string":    string,
  "boolean":   boolean,
  "symbol":    symbol,
  "bigint":    bigint,
  "function":  ( ...args: any[] ) => any,
  "class":     new ( ...args: any[] ) => any,
  "undefined": undefined,
}

// #endregion

// #region Type conditions

type IsNumber< T >    = T extends number    ? T : never;
type IsString< T >    = T extends string    ? T : never;
type IsBoolean< T >   = T extends boolean   ? T : never;
type IsSymbol< T >    = T extends symbol    ? T : never;
type IsBigint< T >    = T extends bigint    ? T : never;
type IsFunction< T >  = T extends TypeStringMap[ "function" ] ? T : never;
type IsClass< T >     = T extends TypeStringMap[ "class" ] ? T : never;
type IsUndefined< T > = T extends undefined ? T : never;
type IsArray< T >     = T extends any[]     ? T : never;

// #endregion

export class Validator< T > {
  private value: T; 

  /**
   * Creates a new validator wrapper object for checking for type validity.
   * @param value Value.
   */
  constructor( value: T ) {
    this.value = value;
  }

  // #region Basic type checks

  /**
   * Checks if the value is a number.
   * @throws { TypeValidationError } If value is not a number.
   * @returns A new wrapper containing a number.
   */
  number(): Validator< number > {
    if( typeof this.value !== "number" )
      throw new TypeValidationError( `Expected number, got ${ typeof this.value }` )

    return new Validator( this.value )
  }

  /**
   * Checks if the value is a string.
   * @throws { TypeValidationError } If value is not a string.
   * @returns A new wrapper containing a string.
   */
  string(): Validator< string > {
    if( typeof this.value !== "string" )
      throw new TypeValidationError( `Expected string, got ${ typeof this.value }` )

    return new Validator( this.value )
  }

  /**
   * Checks if the value is a boolean.
   * @throws { TypeValidationError } If value is not a boolean.
   * @returns A new wrapper containing a boolean.
   */
  boolean(): Validator< boolean > {
    if( typeof this.value !== "boolean" )
      throw new TypeValidationError( `Expected boolean, got ${ typeof this.value }` )

    return new Validator( this.value )
  }

  array(): Validator< T & any[] > {
    if( !Array.isArray( this.value ) )
      throw new TypeValidationError( `Expected array, got ${ typeof this.value }` )

    return new Validator( this.value )
  }

  /**
   * Checks if the value is a symbol.
   * @throws { TypeValidationError } If value is not a symbol.
   * @returns A new wrapper containing a symbol.
   */
  symbol(): Validator< symbol > {
    if( typeof this.value !== "symbol" )
      throw new TypeValidationError( `Expected symbol, got ${ typeof this.value }` )

    return new Validator( this.value )
  }

  /**
   * Checks if the value is a BigInt.
   * @throws { TypeValidationError } If value is not a BigInt.
   * @returns A new wrapper containing a BigInt.
   */
  bigint(): Validator< bigint > {
    if( typeof this.value !== "bigint" )
      throw new TypeValidationError( `Expected bigint, got ${ typeof this.value }` )

    return new Validator( this.value )
  }

  /**
   * Checks if the value is a function and not a class constructor. 
   * @throws { TypeValidationError } If value is not a function, or is a constructor.
   * @returns A new wrapper containing a function.
   */
  function(): Validator< TypeStringMap[ "function" ] > {
    if( typeof this.value !== "function" )
      throw new TypeValidationError( `Expected function, got ${ typeof this.value }` )

    if( this.value.prototype && this.value.prototype.constructor === this.value )
      throw new TypeValidationError( `Expected function, got class constructor ${ this.value }` ) 

    return new Validator( this.value as TypeStringMap[ "function" ] )
  }

  /**
   * Checks if the value is a constructor.
   * @throws { TypeValidationError } If value is not a constructor.
   * @returns A new wrapper containing a constructor.
   */
  class(): Validator< TypeStringMap[ "class" ] > {
    if( 
      typeof this.value !== "function" ||
      !this.value.prototype ||
      this.value.prototype.constructor !== this.value
    ) 
      throw new TypeValidationError( `Expected class, got ${ typeof this.value }` )

    return new Validator( this.value as TypeStringMap[ "class" ] )
  }

  /**
   * Checks if the value is undefined.
   * @throws { TypeValidationError } If value is not undefined.
   * @returns A new wrapper containing undefined.
   */
  undefined(): Validator< undefined > {
    if( this.value !== undefined )
      throw new TypeValidationError( `Expected undefined, got ${ typeof this.value }` )

    return new Validator( this.value as undefined )
  }

  /**
   * Checks if the value is null.
   * @throws { TypeValidationError } If value is not null.
   * @returns A new wrapper containing null.
   */
  null(): Validator< null > {
    if( this.value !== null ) 
      throw new TypeValidationError( `Expected null, got ${ typeof this.value }` )

    return new Validator( this.value as null )
  }

  /**
   * Checks if the value is a instance of a given class.
   * @param constructor Class constructor.
   * @throws { TypeValidationError } If value is not a instance of the class.
   * @returns A new wrapper containing a value known to be an instance.
   */
  instance< U extends TypeStringMap[ "class" ] >( constructor: U ): Validator< InstanceType< U > > {
    if( !( this.value instanceof constructor ) )
      throw new TypeValidationError( `Expected value to be an instance of ${ constructor }, got ${ this.value }`)

    return new Validator( this.value as InstanceType< U > )
  }

  // #endregion

  // #region Checking methods

  isNumber() {
    return typeof this.value === "number"
  }

  isString() {
    return typeof this.value === "string"
  }

  isBoolean() {
    return typeof this.value === "boolean"
  }

  isArray() {
    return Array.isArray( this.value )
  }

  isSymbol() {
    return typeof this.value === "symbol"
  }

  isBigInt() {
    return typeof this.value === "bigint"
  }

  isFunction() {
    return typeof this.value === "function" && 
           !( 
             this.value.prototype && 
             this.value.prototype.constructor === this.value 
           )
  }

  isClass() {
    return typeof this.value === "function" &&
           this.value.prototype &&
           this.value.prototype.constructor === this.value
  }

  isUndefined() {
    return typeof this.value === "undefined"
  }

  isNull() {
    return this.value === null
  }

  // #endregion

  // #region Access methods
  
  /**
   * Checks if value contains a valid key.
   * @param key Key of the value.
   * @throws { TypeValidationError } If value is undefined or null.
   * @returns Boolean indicating presence of given key.
   */
  has< K extends keyof T >( key: K ): boolean {
    if( 
      typeof this.value === "undefined" ||
      this.value === null
    ) 
      throw new TypeValidationError( "Value is undefined or null." )

    const obj = Object( this.value )

    return key in obj
  }

  /**
   * Checks if value contains a key and creates a new validator wrapper of the property.
   * @param key Key of the value.
   * @throws { TypeValidationError } If value is undefined or null, or if the key doesn't exist.
   * @returns A new validator wrapper for the value contained in the key.
   */
  at< K extends keyof T >( key: K ): Validator< T[ K ] > {
    if( 
      typeof this.value === "undefined" ||
      this.value === null
    ) 
      throw new TypeValidationError( "Value is undefined or null." )

    const obj = Object( this.value )

    if( !( key in obj ) )
      throw new TypeValidationError( `Key ${ String( key ) } does not exist in ${ this.value }` )
  
    return new Validator( obj[ key ] )
  } 

  // #endregion

  // #region Static checking methods

  static number( value: unknown ): asserts value is number {
    if( typeof value !== "number" )
      throw new TypeValidationError( `Expected number, got ${ typeof value }` )
  }

  static string( value: unknown ): asserts value is string {
    if( typeof value !== "string" )
      throw new TypeValidationError( `Expected string, got ${ typeof value }` )
  } 

  static boolean( value: unknown ): asserts value is boolean {
    if( typeof value !== "boolean" )
      throw new TypeValidationError( `Expected boolean, got ${ typeof value }` )
  } 

  static array( value: unknown ): asserts value is unknown[] {
    if( !Array.isArray( value ) )
      throw new TypeValidationError( `Expected array, got ${ typeof value }` )
  } 

  static symbol( value: unknown ): asserts value is symbol {
    if( typeof value !== "symbol" )
      throw new TypeValidationError( `Expected symbol, got ${ typeof value }` )
  } 

  static bigint( value: unknown ): asserts value is BigInt {
    if( typeof value !== "bigint" )
      throw new TypeValidationError( `Expected BigInt, got ${ typeof value }` )
  } 

  static function( value: unknown ): asserts value is TypeStringMap[ "function" ] {
    if( typeof value !== "function" )
      throw new TypeValidationError( `Expected function, got ${ typeof value }` )

    if( value.prototype && value.prototype.constructor === value )
      throw new TypeValidationError( `Expected function, got class constructor ${ value }` )
  } 

  static class( value: unknown ): asserts value is TypeStringMap[ "class" ] {
    if( 
      typeof value !== "function" ||
      !value.prototype ||
      value.prototype.constructor !== value
    )
      throw new TypeValidationError( `Expected class, got ${ typeof value }` )
  } 

  static undefined( value: unknown ): asserts value is undefined {
    if( value !== undefined ) 
      throw new TypeValidationError( `Expected undefined, got ${ typeof value }` )
  }

  static null( value: unknown ): asserts value is null {
    if( value !== null )
      throw new TypeValidationError( `Expected null, got ${ typeof value }` )
  } 

  static instance< T, U extends TypeStringMap[ "class" ] >( value: T, constructor: U ): asserts value is InstanceType< U >  {
    if( !( value instanceof constructor ) )
      throw new TypeValidationError( `Expected value to be an instance of ${ constructor }, got ${ value }`)
  }

  // #endregion

  // #region Array checks

  /**
   * Checks each element of array for type validity.
   * @param checker Checker function that throws if array value doesn't satisfy type validation.
   * @throws { TypeValidationError } If value is not an array or if checker throws.
   */
  arrayOf< U extends ( value: unknown ) => asserts value is any >( checker: U ): Validator< AssertedType< U >[] > {
    if( !Array.isArray( this.value ) )
      throw new TypeValidationError( `Expected array, got ${ typeof this.value }` )

    this.value.forEach( element => {
      checker( element )
    } )

    return new Validator( this.value as AssertedType< U >[] )
  }

  // #endregion

  get(): T {
    return this.value as T
  }
}