import { Validator } from "../dist/main"

describe( "Static assertion methods", () => {
  class A { 
    a = 0 
  }

  class B extends A { 
    b = 1 
  }

  test( "Nonnullable methods.", () => {
    expect( () => Validator.assertToNumber( 1 ) ).not.toThrow()
    expect( () => Validator.assertToString( "yay" ) ).not.toThrow()
    expect( () => Validator.assertToBoolean( true ) ).not.toThrow()
    expect( () => Validator.assertToArray( [ 1, 2, 3 ] ) ).not.toThrow()
    expect( () => Validator.assertToSymbol( Symbol() ) ).not.toThrow()
    expect( () => Validator.assertToBigInt( BigInt( "123123123123" ) ) ).not.toThrow()
    expect( () => Validator.assertToFunction( Math.floor ) ).not.toThrow()
    expect( () => Validator.assertToConstructor( A ) ).not.toThrow()
    expect( () => Validator.assertToUndefined( undefined ) ).not.toThrow()
    expect( () => Validator.assertToNull( null ) ).not.toThrow()
    expect( () => Validator.assertInstanceOf( new B(), A ) ).not.toThrow()

    expect( () => Validator.assertToNumber( false ) ).toThrow()
    expect( () => Validator.assertToString( [] ) ).toThrow()
    expect( () => Validator.assertToBoolean( 123 ) ).toThrow()
    expect( () => Validator.assertToArray( { a: 1 } ) ).toThrow()
    expect( () => Validator.assertToSymbol( 123 ) ).toThrow()
    expect( () => Validator.assertToBigInt( 123 ) ).toThrow()
    expect( () => Validator.assertToFunction( Math ) ).toThrow()
    expect( () => Validator.assertToConstructor( new A() ) ).toThrow()
    expect( () => Validator.assertToUndefined( null ) ).toThrow()
    expect( () => Validator.assertToNull( undefined ) ).toThrow()
    expect( () => Validator.assertInstanceOf( new A(), B ) ).toThrow()
  } )

  test( "Nullable methods.", () => {
    expect( () => Validator.assertToNumberOrNull( 1 ) ).not.toThrow()
    expect( () => Validator.assertToStringOrNull( "yay" ) ).not.toThrow()
    expect( () => Validator.assertToBooleanOrNull( true ) ).not.toThrow()
    expect( () => Validator.assertToArrayOrNull( [ 1, 2, 3 ] ) ).not.toThrow()
    expect( () => Validator.assertToSymbolOrNull( Symbol() ) ).not.toThrow()
    expect( () => Validator.assertToBigIntOrNull( BigInt( "123123123123" ) ) ).not.toThrow()
    expect( () => Validator.assertToFunctionOrNull( Math.floor ) ).not.toThrow()
    expect( () => Validator.assertToConstructorOrNull( A ) ).not.toThrow()
    expect( () => Validator.assertToUndefinedOrNull( undefined ) ).not.toThrow()

    expect( () => Validator.assertToNumberOrNull( null ) ).not.toThrow()
    expect( () => Validator.assertToStringOrNull( null ) ).not.toThrow()
    expect( () => Validator.assertToBooleanOrNull( null ) ).not.toThrow()
    expect( () => Validator.assertToArrayOrNull( null ) ).not.toThrow()
    expect( () => Validator.assertToSymbolOrNull( null ) ).not.toThrow()
    expect( () => Validator.assertToBigIntOrNull( null ) ).not.toThrow()
    expect( () => Validator.assertToFunctionOrNull( null ) ).not.toThrow()
    expect( () => Validator.assertToConstructorOrNull( null ) ).not.toThrow()
    expect( () => Validator.assertToUndefinedOrNull( null ) ).not.toThrow()
  } )
} )