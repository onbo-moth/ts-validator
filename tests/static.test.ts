import { Validator } from "../dist/main"

describe( "Static assertion methods", () => {
  class A { 
    a = 0 
  }

  class B extends A { 
    b = 1 
  }

  test( "Nonnullable methods.", () => {
    expect( () => Validator.number( 1 ) ).not.toThrow()
    expect( () => Validator.string( "yay" ) ).not.toThrow()
    expect( () => Validator.boolean( true ) ).not.toThrow()
    expect( () => Validator.array( [ 1, 2, 3 ] ) ).not.toThrow()
    expect( () => Validator.symbol( Symbol() ) ).not.toThrow()
    expect( () => Validator.bigint( BigInt( "123123123123" ) ) ).not.toThrow()
    expect( () => Validator.function( Math.floor ) ).not.toThrow()
    expect( () => Validator.class( A ) ).not.toThrow()
    expect( () => Validator.undefined( undefined ) ).not.toThrow()
    expect( () => Validator.null( null ) ).not.toThrow()
    expect( () => Validator.instance( new B(), A ) ).not.toThrow()

    expect( () => Validator.number( false ) ).toThrow()
    expect( () => Validator.string( [] ) ).toThrow()
    expect( () => Validator.boolean( 123 ) ).toThrow()
    expect( () => Validator.array( { a: 1 } ) ).toThrow()
    expect( () => Validator.symbol( 123 ) ).toThrow()
    expect( () => Validator.bigint( 123 ) ).toThrow()
    expect( () => Validator.function( Math ) ).toThrow()
    expect( () => Validator.class( new A() ) ).toThrow()
    expect( () => Validator.undefined( null ) ).toThrow()
    expect( () => Validator.null( undefined ) ).toThrow()
    expect( () => Validator.instance( new A(), B ) ).toThrow()
  } )

  test( "Nullable methods.", () => {
    expect( () => Validator.nullable.number( 1 ) ).not.toThrow()
    expect( () => Validator.nullable.string( "yay" ) ).not.toThrow()
    expect( () => Validator.nullable.boolean( true ) ).not.toThrow()
    expect( () => Validator.nullable.array( [ 1, 2, 3 ] ) ).not.toThrow()
    expect( () => Validator.nullable.symbol( Symbol() ) ).not.toThrow()
    expect( () => Validator.nullable.bigint( BigInt( "123123123123" ) ) ).not.toThrow()
    expect( () => Validator.nullable.function( Math.floor ) ).not.toThrow()
    expect( () => Validator.nullable.class( A ) ).not.toThrow()
    expect( () => Validator.nullable.undefined( undefined ) ).not.toThrow()
    expect( () => Validator.nullable.instance( new B(), A ) ).not.toThrow()

    expect( () => Validator.nullable.number( null ) ).not.toThrow()
    expect( () => Validator.nullable.string( null ) ).not.toThrow()
    expect( () => Validator.nullable.boolean( null ) ).not.toThrow()
    expect( () => Validator.nullable.array( null ) ).not.toThrow()
    expect( () => Validator.nullable.symbol( null ) ).not.toThrow()
    expect( () => Validator.nullable.bigint( null ) ).not.toThrow()
    expect( () => Validator.nullable.function( null ) ).not.toThrow()
    expect( () => Validator.nullable.class( null ) ).not.toThrow()
    expect( () => Validator.nullable.undefined( null ) ).not.toThrow()
    expect( () => Validator.nullable.instance( null, A ) ).not.toThrow()
  } )
} )