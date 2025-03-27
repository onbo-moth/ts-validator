export class TypeValidationError extends Error {};

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
  
  has< K extends keyof T >( key: K ): boolean {
    if( 
      typeof this.value === "undefined" ||
      this.value === null
    ) 
      throw new TypeValidationError( "Value is undefined or null." )

    if( typeof this.value === "object" || typeof this.value === "function" ){
      if( key in this.value ) return true

      if( 
        Object.getPrototypeOf( this.value ) && 
        Object.getPrototypeOf( this.value )[ key ]
      ) return true
    }

    return false
  }

  at< K extends keyof T >( key: K ): Validator< T[ K ] > {
    if( 
      typeof this.value === "undefined" ||
      this.value === null
    ) 
      throw new TypeValidationError( "Value is undefined or null." )

    if( typeof this.value === "object" || typeof this.value === "function" ){
      if( key in this.value ) return new Validator( this.value[ key ] )

      if( 
        Object.getPrototypeOf( this.value ) && 
        Object.getPrototypeOf( this.value )[ key ]
      ) return new Validator( Object.getPrototypeOf( this.value )[ key ] )
    }

    throw new TypeValidationError( `Key "${ String( key ) }" does not exist in ${ this.value }` )
  } 

  // #endregion

  get(): T {
    return this.value as T
  }
}