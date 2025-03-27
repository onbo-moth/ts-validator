import { TypeValidationError, Validator } from "../dist/main"

describe( "Basic type checks", () => {
  test( "should validate numbers", () => {
    expect( new Validator( 123     ).number().get() ).toBe( 123 )
    expect( new Validator( 2e8     ).number().get() ).toBe( 2e8 )
    expect( new Validator( 0.001   ).number().get() ).toBe( 0.001 )

    expect( () => new Validator( "foo"   ).number().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( "0.001" ).number().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( "123"   ).number().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( false   ).number().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( true    ).number().get() ).toThrow( TypeValidationError )
  } )

  test( "should validate strings", () => {
    expect( new Validator( ""            ).string().get() ).toBe( "" )
    expect( new Validator( "100"         ).string().get() ).toBe( "100" )
    expect( new Validator( "foo bar baz" ).string().get() ).toBe( "foo bar baz" )
    expect( new Validator( "null"        ).string().get() ).toBe( "null" )

    expect( () => new Validator( false         ).string().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( 0.123         ).string().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( () => "yay"   ).string().get() ).toThrow( TypeValidationError )
  } )

  test( "should validate booleans", () => {
    expect( new Validator( true  ).boolean().get() ).toBe( true )
    expect( new Validator( false ).boolean().get() ).toBe( false )

    expect( () => new Validator( 0         ).boolean().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( ""        ).boolean().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( []        ).boolean().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( null      ).boolean().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( undefined ).boolean().get() ).toThrow( TypeValidationError )
  } )

  test( "should validate symbols", () => {
    const symbol = Symbol()
    expect( new Validator( symbol          ).symbol().get() ).toBe( symbol )
    expect( new Validator( Symbol.iterator ).symbol().get() ).toBe( Symbol.iterator )

    expect( () => new Validator( 0        ).symbol().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( "symbol" ).symbol().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( Number   ).symbol().get() ).toThrow( TypeValidationError )
  } )

  test( "should validate bigints", () => {
    expect( new Validator( BigInt( "123123123123" ) ).bigint().get() ).toBe( BigInt( "123123123123" ) )

    expect( () => new Validator( 123123123123   ).bigint().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( "123123123123" ).bigint().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( BigInt         ).bigint().get() ).toThrow( TypeValidationError )
  } )

  test( "should validate functions", () => {
    expect( new Validator( String.toString ).function().get() ).toBe( String.toString )
    expect( new Validator( Function.call   ).function().get() ).toBe( Function.call )

    expect( () => new Validator( String ).function().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( 123123 ).function().get() ).toThrow( TypeValidationError )
  } )

  test( "should validate classes", () => {
    expect( new Validator( String   ).class().get() ).toBe( String )
    expect( new Validator( Function ).class().get() ).toBe( Function )

    expect( () => new Validator( 123123        ).class().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( Function.call ).class().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( null          ).class().get() ).toThrow( TypeValidationError )
  } )

  test( "checks for undefined", () => { 
    expect( new Validator( undefined            ).undefined().get() ).toBe( undefined )
    expect( new Validator( [ 1, 2, 3 ][ 4 ]     ).undefined().get() ).toBe( undefined )

    expect( () => new Validator( [1, 2, 3][ 1 ] ).undefined().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( NaN            ).undefined().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( null           ).undefined().get() ).toThrow( TypeValidationError )
  } )

  test( "checks for null", () => {
    expect( new Validator( null ).null().get() ).toBe( null )

    expect( () => new Validator( 123   ).null().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( 0     ).null().get() ).toThrow( TypeValidationError )
    expect( () => new Validator( false ).null().get() ).toThrow( TypeValidationError )
  } )

  test( "checks for instance", () => {
    const array = [ 1, 2, 3 ]
    expect( new Validator( array ).instance( Array ).get() ).toBe( array )

    class A {}
    class B extends A {}

    expect( () => new Validator( new B() ).instance( A ).get() ).not.toThrow( TypeValidationError )

    // linter does the jpb, uncomment to show
    // expect( () => new Validator( array ).instance( Number ).get() ).toThrow( TypeValidationError )
  } )
} )

