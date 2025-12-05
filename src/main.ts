export class TypeValidationError extends Error {};

export type ExtractAssertedType< T > = T extends ( value: unknown ) => asserts value is infer U ? U : never;
export type AssertionFunction< T > = ( value: unknown ) => asserts value is T

/**
 * @deprecated Use `ExtractAssertedType< T >`.
 */
export type AssertedType< T > = ExtractAssertedType< T >

/**
 * @deprecated Use `AssertionFunction< T >`
 */
export type ValidatorFunction< T > = AssertionFunction< T >

// #region Type string map

export type TypeStringMap = {
  "number":    number,
  "string":    string,
  "boolean":   boolean,
  "symbol":    symbol,
  "bigint":    bigint,
  "object":    object,
  "function":  ( ...args: any[] ) => any,
  "constructor":     new ( ...args: any[] ) => any,
  "undefined": undefined,
}

// #endregion

// #region Type conditions

export type IsNumber< T >    = T extends number    ? T : never;
export type IsString< T >    = T extends string    ? T : never;
export type IsBoolean< T >   = T extends boolean   ? T : never;
export type IsSymbol< T >    = T extends symbol    ? T : never;
export type IsBigint< T >    = T extends bigint    ? T : never;
export type IsObject< T >    = T extends object    ? T : never;
export type IsFunction< T >  = T extends TypeStringMap[ "function" ] ? T : never;
export type IsClass< T >     = T extends TypeStringMap[ "constructor" ] ? T : never;
export type IsUndefined< T > = T extends undefined ? T : never;
export type IsArray< T >     = T extends unknown[] ? T : never;

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

  isObject() {
    return this.value !== null &&
           typeof this.value === "object"
  }

  isFunction() {
    return typeof this.value === "function" && 
           !( 
             this.value.prototype && 
             this.value.prototype.constructor === this.value 
           )
  }

  isConstructor() {
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


  // #region Basic type checks

  /**
   * Checks if the value is a number.
   * @throws { TypeValidationError } If value is not a number.
   * @returns A new wrapper containing a number.
   */
  assertToNumber(): Validator< number > {
    if( typeof this.value !== "number" )
      throw new TypeValidationError( `Expected number, got ${ typeof this.value }` )

    return new Validator( this.value )
  }

  
  /**
   * Checks if the value is a string.
   * @throws { TypeValidationError } If value is not a string.
   * @returns A new wrapper containing a string.
   */
  assertToString(): Validator< string > {
    if( typeof this.value !== "string" )
      throw new TypeValidationError( `Expected string, got ${ typeof this.value }` )

    return new Validator( this.value )
  }

  /**
   * Checks if the value is a boolean.
   * @throws { TypeValidationError } If value is not a boolean.
   * @returns A new wrapper containing a boolean.
   */
  assertToBoolean(): Validator< boolean > {
    if( typeof this.value !== "boolean" )
      throw new TypeValidationError( `Expected boolean, got ${ typeof this.value }` )

    return new Validator( this.value )
  }

  /**
   * Checks if the value is an array.
   * @throws { TypeValidationError } If value is not an array.
   * @returns A new wrapper containing an array.
   */
  assertToArray(): Validator< T & unknown[] > {
    if( !Array.isArray( this.value ) )
      throw new TypeValidationError( `Expected array, got ${ typeof this.value }` )

    return new Validator( this.value )
  }

  /**
   * Checks if the value is a symbol.
   * @throws { TypeValidationError } If value is not a symbol.
   * @returns A new wrapper containing a symbol.
   */
  assertToSymbol(): Validator< symbol > {
    if( typeof this.value !== "symbol" )
      throw new TypeValidationError( `Expected symbol, got ${ typeof this.value }` )

    return new Validator( this.value )
  }

  /**
   * Checks if the value is a BigInt.
   * @throws { TypeValidationError } If value is not a BigInt.
   * @returns A new wrapper containing a BigInt.
   */
  assertToBigInt(): Validator< bigint > {
    if( typeof this.value !== "bigint" )
      throw new TypeValidationError( `Expected bigint, got ${ typeof this.value }` )

    return new Validator( this.value )
  }

  /**
   * Checks if the value is a basic object (non-function)
   * 
   */
  assertToObject(): Validator< object > {
    if( this.value === null )
      throw new TypeValidationError( `Expected object, got null`)

    if( typeof this.value !== "object" )
      throw new TypeValidationError( `Expected object, got ${ typeof this.value }`)

    return new Validator( this.value )
  }

  /**
   * Checks if the value is a function and not a class constructor. 
   * @throws { TypeValidationError } If value is not a function, or is a constructor.
   * @returns A new wrapper containing a function.
   */
  assertToFunction(): Validator< TypeStringMap[ "function" ] > {
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
  assertToConstructor(): Validator< TypeStringMap[ "constructor" ] > {
    if( 
      typeof this.value !== "function" ||
      !this.value.prototype ||
      this.value.prototype.constructor !== this.value
    ) 
      throw new TypeValidationError( `Expected class, got ${ typeof this.value }` )

    return new Validator( this.value as TypeStringMap[ "constructor" ] )
  }

  /**
   * Checks if the value is undefined.
   * @throws { TypeValidationError } If value is not undefined.
   * @returns A new wrapper containing undefined.
   */
  assertToUndefined(): Validator< undefined > {
    if( this.value !== undefined )
      throw new TypeValidationError( `Expected undefined, got ${ typeof this.value }` )

    return new Validator( this.value as undefined )
  }

  /**
   * Checks if the value is null.
   * @throws { TypeValidationError } If value is not null.
   * @returns A new wrapper containing null.
   */
  assertToNull(): Validator< null > {
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
  assertInstanceOf< U extends TypeStringMap[ "constructor" ] >( constructor: U ): Validator< InstanceType< U > > {
    if( !( this.value instanceof constructor ) )
      throw new TypeValidationError( `Expected value to be an instance of ${ constructor }, got ${ this.value }`)

    return new Validator( this.value as InstanceType< U > )
  }

  // #endregion


  // #region Nullable checks

  /**
   * Checks if the value is a number or a null.
   * @throws { TypeValidationError } If value is not a number nor null.
   * @returns A new wrapper containing a number or a null.
   */
  assertToNumberOrNull(): Validator< number | null > {
    if( this.value === null ) return new Validator( null )

    if( typeof this.value !== "number" )
      throw new TypeValidationError( `Expected number or null, got ${ typeof this.value }` )

    return new Validator( this.value as number )
  }

  
  /**
   * Checks if the value is a string or a null.
   * @throws { TypeValidationError } If value is not a string nor null.
   * @returns A new wrapper containing a string or a null.
   */
  assertToStringOrNull(): Validator< string | null > {
    if( this.value === null ) return new Validator( null )

    if( typeof this.value !== "string" )
      throw new TypeValidationError( `Expected string or null, got ${ typeof this.value }` )

    return new Validator( this.value as string )
  }

  /**
   * Checks if the value is a boolean or a null.
   * @throws { TypeValidationError } If value is not a boolean nor null.
   * @returns A new wrapper containing a boolean or a null.
   */
  assertToBooleanOrNull(): Validator< boolean | null > {
    if( this.value === null ) return new Validator( null )

    if( typeof this.value !== "boolean" )
      throw new TypeValidationError( `Expected boolean or null, got ${ typeof this.value }` )

    return new Validator( this.value as boolean )
  }

  /**
   * Checks if the value is an array or a null.
   * @throws { TypeValidationError } If value is not an array nor null.
   * @returns A new wrapper containing an array or a null.
   */
  assertToArrayOrNull(): Validator< ( T & unknown[] ) | null > {
    if( this.value === null ) return new Validator( null )

    if( !Array.isArray( this.value ) )
      throw new TypeValidationError( `Expected array or null, got ${ typeof this.value }` )

    return new Validator( this.value as ( T & unknown[] ) )
  }

  /**
   * Checks if the value is a symbol or null.
   * @throws { TypeValidationError } If value is not a symbol nor null.
   * @returns A new wrapper containing a symbol or a null.
   */
  assertToSymbolOrNull(): Validator< symbol | null > {
    if( this.value === null ) return new Validator( null )

    if( typeof this.value !== "symbol" )
      throw new TypeValidationError( `Expected symbol, got ${ typeof this.value }` )

    return new Validator( this.value as symbol )
  }

  /**
   * Checks if the value is a BigInt or null.
   * @throws { TypeValidationError } If value is not a BigInt nor null.
   * @returns A new wrapper containing a BigInt or a null.
   */
  assertToBigIntOrNull(): Validator< bigint | null > {
    if( this.value === null ) return new Validator( null )

    if( typeof this.value !== "bigint" )
      throw new TypeValidationError( `Expected bigint, got ${ typeof this.value }` )

    return new Validator( this.value as bigint )
  }

  /**
   * Checks if the value is an object or null.
   * @throws { TypeValidationError } If value is not an object nor null.
   * @returns A new wrapper containing an object or a null.
   */
  assertToObjectOrNull(): Validator< object | null > {
    if( typeof this.value !== "object" ) // yes null is an object
      throw new TypeValidationError( `Expected object or null, got ${ typeof this.value }`)

    return new Validator( this.value )
  }

  /**
   * Checks if the value is a function or null and not a class constructor. 
   * @throws { TypeValidationError } If value is not a function nor null, or is a constructor.
   * @returns A new wrapper containing a function or a null.
   */
  assertToFunctionOrNull(): Validator< TypeStringMap[ "function" ] | null > {
    if( this.value === null ) return new Validator( null )

    if( typeof this.value !== "function" )
      throw new TypeValidationError( `Expected function or null, got ${ typeof this.value }` )

    if( this.value.prototype && this.value.prototype.constructor === this.value )
      throw new TypeValidationError( `Expected function, got class constructor ${ this.value }` ) 

    return new Validator( this.value as TypeStringMap[ "function" ] )
  }

  /**
   * Checks if the value is a constructor or null.
   * @throws { TypeValidationError } If value is not a constructor nor null.
   * @returns A new wrapper containing a constructor or null.
   */
  assertToConstructorOrNull(): Validator< TypeStringMap[ "constructor" ] | null > {
    if( this.value === null ) return new Validator( null )

    if( 
      typeof this.value !== "function" ||
      !this.value.prototype ||
      this.value.prototype.constructor !== this.value
    ) 
      throw new TypeValidationError( `Expected class or null, got ${ typeof this.value }` )

    return new Validator( this.value as TypeStringMap[ "constructor" ] )
  }

  /**
   * Checks if the value is undefined or null.
   * @throws { TypeValidationError } If value is not undefined nor null.
   * @returns A new wrapper containing undefined or null.
   */
  assertToUndefinedOrNull(): Validator< undefined | null > {
    if( this.value === null ) return new Validator( null )

    if( this.value !== undefined )
      throw new TypeValidationError( `Expected undefined or null, got ${ typeof this.value }` )

    return new Validator( this.value as undefined )
  }

  /**
   * Checks if the value is a instance of a given class.
   * @param constructor Class constructor.
   * @throws { TypeValidationError } If value is not a instance of the class.
   * @returns A new wrapper containing a value known to be an instance.
   */
  assertInstanceOfOrNull< U extends TypeStringMap[ "constructor" ] >( constructor: U ): Validator< InstanceType< U > | null > {
    if( this.value === null ) return new Validator( null )

    if( !( this.value instanceof constructor ) )
      throw new TypeValidationError( `Expected value to be an instance of ${ constructor }, got ${ this.value }`)

    return new Validator( this.value as InstanceType< U > )
  }
  
  // #endregion


  // #region Access methods
  
  /**
   * Checks if value contains a valid key.
   * @param key Key of the value.
   * @throws { TypeValidationError } If value is undefined or null.
   * @returns Boolean indicating presence of given key.
   */
  containsProperty< K extends PropertyKey >( key: K ): boolean {
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
  assertAndSelectProperty< K extends PropertyKey >( key: K ): Validator< K extends keyof T ? T[ K ] : unknown > {
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

  // #region Array checks

  /**
   * Checks each element of array for type validity.
   * @param checker Checker function that throws if array value doesn't satisfy type validation.
   * @throws { TypeValidationError } If value is not an array or if checker throws.
   */
  assertArrayOf< U extends ( value: unknown ) => asserts value is unknown >( checker: U ): Validator< ExtractAssertedType< U >[] > {
    if( !Array.isArray( this.value ) )
      throw new TypeValidationError( `Expected array, got ${ typeof this.value }` )

    this.value.forEach( element => {
      checker( element )
    } )

    return new Validator( this.value as ExtractAssertedType< U >[] )
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
  assertContains< V extends {
    [ key: PropertyKey ]: ( value: unknown ) => asserts value is unknown
  } >( 
    object: V 
  ): Validator< T & {
    [ key in keyof V ]: ExtractAssertedType< V[ key ] > 
  } > {
    if( typeof this.value === "undefined" || this.value === null )
      throw new TypeValidationError( `Value is undefined or null.` )

    const val = Object( this.value )

    for( const key in object ) {
      if( !( key in val ) )
        throw new TypeValidationError( `Value is missing a key: ${ key }` )

      const assert: ( value: unknown ) => asserts value is unknown = object[ key ] 
      
      assert( val[ key ] )
    }

    // no throws, nice

    return new Validator( this.value as T & {
      [ key in keyof V ]: ExtractAssertedType< V[ key ] >
    } )
  }

  // #endregion
  

  // #region Static assertion methods

  static assertToNumber( value: unknown ): asserts value is number {
    if( typeof value !== "number" )
      throw new TypeValidationError( `Expected number, got ${ typeof value }` )
  }

  static assertToString( value: unknown ): asserts value is string {
    if( typeof value !== "string" )
      throw new TypeValidationError( `Expected string, got ${ typeof value }` )
  } 

  static assertToBoolean( value: unknown ): asserts value is boolean {
    if( typeof value !== "boolean" )
      throw new TypeValidationError( `Expected boolean, got ${ typeof value }` )
  } 

  static assertToArray( value: unknown ): asserts value is unknown[] {
    if( !Array.isArray( value ) )
      throw new TypeValidationError( `Expected array, got ${ typeof value }` )
  } 

  static assertToSymbol( value: unknown ): asserts value is symbol {
    if( typeof value !== "symbol" )
      throw new TypeValidationError( `Expected symbol, got ${ typeof value }` )
  } 

  static assertToBigInt( value: unknown ): asserts value is BigInt {
    if( typeof value !== "bigint" )
      throw new TypeValidationError( `Expected BigInt, got ${ typeof value }` )
  } 

  static assertToObject( value: unknown ): asserts value is object {
    if( value === null )
      throw new TypeValidationError( `Expected object, got null`)

    if( typeof value !== "object" )
      throw new TypeValidationError( `Expected object, got ${ typeof value }`)
  }

  static assertToFunction( value: unknown ): asserts value is TypeStringMap[ "function" ] {
    if( typeof value !== "function" )
      throw new TypeValidationError( `Expected function, got ${ typeof value }` )

    if( value.prototype && value.prototype.constructor === value )
      throw new TypeValidationError( `Expected function, got class constructor ${ value }` )
  } 

  static assertToConstructor( value: unknown ): asserts value is TypeStringMap[ "constructor" ] {
    if( 
      typeof value !== "function" ||
      !value.prototype ||
      value.prototype.constructor !== value
    )
      throw new TypeValidationError( `Expected class, got ${ typeof value }` )
  } 

  static assertToUndefined( value: unknown ): asserts value is undefined {
    if( value !== undefined ) 
      throw new TypeValidationError( `Expected undefined, got ${ typeof value }` )
  }

  static assertToNull( value: unknown ): asserts value is null {
    if( value !== null )
      throw new TypeValidationError( `Expected null, got ${ typeof value }` )
  } 

  static assertInstanceOf< T, U extends TypeStringMap[ "constructor" ] >( value: T, constructor: U ): asserts value is InstanceType< U >  {
    if( !( value instanceof constructor ) )
      throw new TypeValidationError( `Expected value to be an instance of ${ constructor }, got ${ value }`)
  }

  // #endregion

  // #region Nullable static assertion methods

  static assertToNumberOrNull( value: unknown ): asserts value is number | null {
    if( value === null ) return

    if( typeof value !== "number" )
      throw new TypeValidationError( `Expected number or null, got ${ typeof value }` )
  }

  static assertToStringOrNull( value: unknown ): asserts value is string | null {
    if( value === null ) return

    if( typeof value !== "string" )
      throw new TypeValidationError( `Expected string or null, got ${ typeof value }` )
  } 

  static assertToBooleanOrNull( value: unknown ): asserts value is boolean | null {
    if( value === null ) return

    if( typeof value !== "boolean" )
      throw new TypeValidationError( `Expected boolean or null, got ${ typeof value }` )
  } 

  static assertToArrayOrNull( value: unknown ): asserts value is unknown[] | null {
    if( value === null ) return

    if( !Array.isArray( value ) )
      throw new TypeValidationError( `Expected array or null, got ${ typeof value }` )
  } 

  static assertToSymbolOrNull( value: unknown ): asserts value is symbol | null {
    if( value === null ) return

    if( typeof value !== "symbol" )
      throw new TypeValidationError( `Expected symbol or null, got ${ typeof value }` )
  } 

  static assertToBigIntOrNull( value: unknown ): asserts value is BigInt | null {
    if( value === null ) return

    if( typeof value !== "bigint" )
      throw new TypeValidationError( `Expected BigInt or null, got ${ typeof value }` )
  } 

  static assertToObjectOrNull( value: unknown ): asserts value is object | null {
    if( value === null ) return

    if( typeof value !== "object" )
      throw new TypeValidationError( `Expected object or null, got ${ typeof value }`)
  }

  static assertToFunctionOrNull( value: unknown ): asserts value is TypeStringMap[ "function" ] | null {
    if( value === null ) return

    if( typeof value !== "function" )
      throw new TypeValidationError( `Expected function or null, got ${ typeof value }` )

    if( value.prototype && value.prototype.constructor === value )
      throw new TypeValidationError( `Expected function, got class constructor ${ value }` )
  } 

  static assertToConstructorOrNull( value: unknown ): asserts value is TypeStringMap[ "constructor" ] | null {
    if( value === null ) return

    if( 
      typeof value !== "function" ||
      !value.prototype ||
      value.prototype.constructor !== value
    )
      throw new TypeValidationError( `Expected constructor or null, got ${ typeof value }` )
  } 

  static assertToUndefinedOrNull( value: unknown ): asserts value is undefined | null {
    if( value === null ) return

    if( value !== undefined ) 
      throw new TypeValidationError( `Expected undefined or null, got ${ typeof value }` )
  }

  // #endregion

  assert< T extends ( value: unknown ) => asserts value is unknown >( func: T ): Validator< ExtractAssertedType< T > > {
    func( this.value )

    // i guess it doesnt error out soo

    return new Validator< ExtractAssertedType< T > >( this.value as ExtractAssertedType< T > )
  }

  
  getValue(): T {
    return this.value as T
  }

  // #region deprecated

  /**
   * @deprecated use `assertToNumberOrNull()` and similar methods instead
   */
  static nullable = {
    number( value: unknown ): asserts value is number | null {
      if( value === null ) return
      if( typeof value !== "number" )
        throw new TypeValidationError( `Expected number, got ${ typeof value }` )
    },

    string( value: unknown ): asserts value is string | null {
      if( value === null ) return
      if( typeof value !== "string" )
        throw new TypeValidationError( `Expected string, got ${ typeof value }` )
    },

    boolean( value: unknown ): asserts value is boolean | null {
      if( value === null ) return
      if( typeof value !== "boolean" )
        throw new TypeValidationError( `Expected boolean, got ${ typeof value }` )
    },

    array( value: unknown ): asserts value is unknown[] | null {
      if( value === null ) return
      if( !Array.isArray( value ) )
        throw new TypeValidationError( `Expected array, got ${ typeof value }` )
    },

    symbol( value: unknown ): asserts value is symbol | null {
      if( value === null ) return
      if( typeof value !== "symbol" )
        throw new TypeValidationError( `Expected symbol, got ${ typeof value }` )
    },

    bigint( value: unknown ): asserts value is BigInt | null {
      if( value === null ) return
      if( typeof value !== "bigint" )
        throw new TypeValidationError( `Expected BigInt, got ${ typeof value }` )
    },

    object( value: unknown ): asserts value is object | null {
      if( value === null ) return
      if( typeof value !== "object" )
        throw new TypeValidationError( `Expected object, got ${ typeof value }` )
    },

    function( value: unknown ): asserts value is TypeStringMap[ "function" ] | null {
      if( value === null ) return
      if( typeof value !== "function" )
        throw new TypeValidationError( `Expected function, got ${ typeof value }` )

      if( value.prototype && value.prototype.constructor === value )
        throw new TypeValidationError( `Expected function, got class constructor ${ value }` )
    },

    class( value: unknown ): asserts value is TypeStringMap[ "constructor" ] | null {
      if( value === null ) return
      if( 
        typeof value !== "function" ||
        !value.prototype ||
        value.prototype.constructor !== value
      )
        throw new TypeValidationError( `Expected class, got ${ typeof value }` )
    }, 

    undefined( value: unknown ): asserts value is undefined | null { // wow....
      if( value === null ) return
      if( value !== undefined ) 
        throw new TypeValidationError( `Expected undefined, got ${ typeof value }` )
    },

    instance< U extends TypeStringMap[ "constructor" ] >( value: unknown, constructor: U ): asserts value is InstanceType< U > | null {
      if( value === null ) return
      if( !( value instanceof constructor ) )
        throw new TypeValidationError( `Expected value to be an instance of ${ constructor }, got ${ value }`)
    }
  }

  /**
   * @deprecated use `nullable` instead. made in order to not break cuz making a typo here is fine but in a project that could be used by others it might be PAIN
   */
  static nullible = Validator.nullable

  /** @deprecated Use `assertToNumber()` instead */
  number() {
    return this.assertToNumber()
  }

  /** @deprecated Use `assertToString()` instead */
  string() {
    return this.assertToString()
  }

  /** @deprecated Use `assertToBoolean()` instead */
  boolean() {
    return this.assertToBoolean()
  }

  /** @deprecated Use `assertToArray()` instead */
  array() {
    return this.assertToArray()
  }

  /** @deprecated Use `assertToSymbol()` instead */
  symbol() {
    return this.assertToSymbol()
  }

  /** @deprecated Use `assertToBigInt()` instead */
  bigint() {
    return this.assertToBigInt()
  }

  /** @deprecated Use `assertToObject()` instead */
  object() {
    return this.assertToObject()
  }

  /** @deprecated Use `assertToFunction()` instead */
  function() {
    return this.assertToFunction()
  }

  /** @deprecated Use `assertToConstructor()` instead */
  class() {
    return this.assertToConstructor()
  }

  /** @deprecated Use `assertToUndefined()` instead */
  undefined() {
    return this.assertToUndefined()
  }

  /** @deprecated Use `assertToNull()` instead */
  null() {
    return this.assertToNull()
  }

  /** @deprecated Use `Validator.assertInstanceOf()` instead */
  instance< U extends TypeStringMap[ "constructor" ] >( constructor: U ) {
    return this.assertInstanceOf( constructor )
  }

  /** @deprecated Use `Validator.containsProperty()` instead */
  has< K extends PropertyKey >( key: K ) {
    return this.containsProperty( key )
  }

  /** @deprecated Use `Validator.assertAndSelectProperty()` instead */
  at< K extends PropertyKey >( key: K ) {
    return this.assertAndSelectProperty( key )
  }

  /** @deprecated Use `Validator.assertArrayOf()` instead */
  arrayOf< U extends AssertionFunction< unknown > >( checker: U ) {
    return this.assertArrayOf( checker )
  }

  /** @deprecated Use `Validator.assertContains()` instead */
  contains< V extends {
    [ key: PropertyKey ]: AssertionFunction< unknown >
  } >(
    object: V
  ) {
    return this.assertContains( object )
  }

  /** @deprecated Use `Validator.assertToNumber()` instead */
  static number( value: unknown ): asserts value is number {
    return Validator.assertToNumber( value )
  }

  /** @deprecated Use `Validator.assertToString()` instead */
  static string( value: unknown ): asserts value is string {
    return Validator.assertToString( value )
  }

  /** @deprecated Use `Validator.assertToBoolean()` instead */
  static boolean( value: unknown ): asserts value is boolean {
    return Validator.assertToBoolean( value )
  }

  /** @deprecated Use `Validator.assertToArray()` instead */
  static array( value: unknown ): asserts value is unknown[] {
    return Validator.assertToArray( value )
  }

  /** @deprecated Use `Validator.assertToSymbol()` instead */
  static symbol( value: unknown ): asserts value is symbol {
    return Validator.assertToSymbol( value )
  }

  /** @deprecated Use `Validator.assertToBigInt()` instead */
  static bigint( value: unknown ): asserts value is bigint {
    return Validator.assertToBigInt( value )
  }

  /** @deprecated Use `Validator.assertToObject()` instead */
  static object( value: unknown ): asserts value is object {
    return Validator.assertToObject( value )
  }

  /** @deprecated Use `Validator.assertToFunction()` instead */
  static function( value: unknown ): asserts value is TypeStringMap[ "function" ] {
    return Validator.assertToFunction( value )
  }

  /** @deprecated Use `Validator.assertToConstructor()` instead */
  static class( value: unknown ): asserts value is TypeStringMap[ "constructor" ] {
    return Validator.assertToConstructor( value )
  }

  /** @deprecated Use `Validator.assertToUndefined()` instead */
  static undefined( value: unknown ): asserts value is undefined {
    return Validator.assertToUndefined( value )
  }

  /** @deprecated Use `Validator.assertToNull()` instead */
  static null( value: unknown ): asserts value is null {
    return Validator.assertToNull( value )
  }

  /** @deprecated Use `Validator.assertInstanceOf()` instead */
  static instance< T, U extends TypeStringMap[ "constructor" ] >( value: T, constructor: U ): asserts value is InstanceType< U >  {
    return Validator.assertInstanceOf( value, constructor )
  }

  // #endregion
}
