import { TypeValidationError, Validator } from "../dist/main"

describe( "Basic type checks", () => {
  test( "should validate numbers", () => {
    expect( new Validator( 123     ).assertToNumber().getValue() ).toBe( 123 )
    expect( new Validator( 2e8     ).assertToNumber().getValue() ).toBe( 2e8 )
    expect( new Validator( 0.001   ).assertToNumber().getValue() ).toBe( 0.001 )

    expect( () => new Validator( "foo"   ).assertToNumber().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( "0.001" ).assertToNumber().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( "123"   ).assertToNumber().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( false   ).assertToNumber().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( true    ).assertToNumber().getValue() ).toThrow( TypeValidationError )
  } )

  test( "should validate strings", () => {
    expect( new Validator( ""            ).assertToString().getValue() ).toBe( "" )
    expect( new Validator( "100"         ).assertToString().getValue() ).toBe( "100" )
    expect( new Validator( "foo bar baz" ).assertToString().getValue() ).toBe( "foo bar baz" )
    expect( new Validator( "null"        ).assertToString().getValue() ).toBe( "null" )

    expect( () => new Validator( false         ).assertToString().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( 0.123         ).assertToString().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( () => "yay"   ).assertToString().getValue() ).toThrow( TypeValidationError )
  } )

  test( "should validate booleans", () => {
    expect( new Validator( true  ).assertToBoolean().getValue() ).toBe( true )
    expect( new Validator( false ).assertToBoolean().getValue() ).toBe( false )

    expect( () => new Validator( 0         ).assertToBoolean().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( ""        ).assertToBoolean().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( []        ).assertToBoolean().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( null      ).assertToBoolean().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( undefined ).assertToBoolean().getValue() ).toThrow( TypeValidationError )
  } )

  test( "should validate symbols", () => {
    const symbol = Symbol()
    expect( new Validator( symbol          ).assertToSymbol().getValue() ).toBe( symbol )
    expect( new Validator( Symbol.iterator ).assertToSymbol().getValue() ).toBe( Symbol.iterator )

    expect( () => new Validator( 0        ).assertToSymbol().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( "symbol" ).assertToSymbol().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( Number   ).assertToSymbol().getValue() ).toThrow( TypeValidationError )
  } )

  test( "should validate bigints", () => {
    expect( new Validator( BigInt( "123123123123" ) ).assertToBigInt().getValue() ).toBe( BigInt( "123123123123" ) )

    expect( () => new Validator( 123123123123   ).assertToBigInt().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( "123123123123" ).assertToBigInt().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( BigInt         ).assertToBigInt().getValue() ).toThrow( TypeValidationError )
  } )

  test( "should validate functions", () => {
    expect( new Validator( String.toString ).assertToFunction().getValue() ).toBe( String.toString )
    expect( new Validator( Function.call   ).assertToFunction().getValue() ).toBe( Function.call )

    expect( () => new Validator( String ).assertToFunction().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( 123123 ).assertToFunction().getValue() ).toThrow( TypeValidationError )
  } )

  test( "should validate classes", () => {
    expect( new Validator( String   ).assertToConstructor().getValue() ).toBe( String )
    expect( new Validator( Function ).assertToConstructor().getValue() ).toBe( Function )

    expect( () => new Validator( 123123        ).assertToConstructor().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( Function.call ).assertToConstructor().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( null          ).assertToConstructor().getValue() ).toThrow( TypeValidationError )
  } )

  test( "checks for undefined", () => { 
    expect( new Validator( undefined            ).assertToUndefined().getValue() ).toBe( undefined )
    expect( new Validator( [ 1, 2, 3 ][ 4 ]     ).assertToUndefined().getValue() ).toBe( undefined )

    expect( () => new Validator( [1, 2, 3][ 1 ] ).assertToUndefined().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( NaN            ).assertToUndefined().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( null           ).assertToUndefined().getValue() ).toThrow( TypeValidationError )
  } )

  test( "checks for null", () => {
    expect( new Validator( null ).assertToNull().getValue() ).toBe( null )

    expect( () => new Validator( 123   ).assertToNull().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( 0     ).assertToNull().getValue() ).toThrow( TypeValidationError )
    expect( () => new Validator( false ).assertToNull().getValue() ).toThrow( TypeValidationError )
  } )

  test( "checks for instance", () => {
    const array = [ 1, 2, 3 ]
    expect( new Validator( array ).assertInstanceOf( Array ).getValue() ).toBe( array )

    class A {}
    class B extends A {}

    expect( () => new Validator( new B() ).assertInstanceOf( A ).getValue() ).not.toThrow( TypeValidationError )

    // linter does the jpb, uncomment to show
    // expect( () => new Validator( array ).instance( assertToNumber ).getValue() ).toThrow( TypeValidationError )
  } )
} )

