import { TypeValidationError, Validator } from "../dist/main"

describe( "Access methods", () => {
  test( "checks containsProperty()", () => {
    expect( new Validator( [ 1, 2, 3 ] ).containsProperty( 1 ) ).toBe( true  )
    expect( new Validator( [ 1, 2, 3 ] ).containsProperty( 4 ) ).toBe( false )

    expect( new Validator( Array ).containsProperty( "of" ) ).toBe( true )

    expect( new Validator( Object ).containsProperty( "keys" ) ).toBe( true )

    // primitives have prototype funtions too
    expect( new Validator( 9 ).containsProperty( "toExponential" ))
    
    // linter does the job, uncomment to show

    // expect( new Validator( Array ).containsProperty( "abc" ) ).toBe( false )
    // expect( () => new Validator( Function ).containsProperty( "abcabc" ) ).toBe( false )
  } )

  test( "checks assertAndSelectProperty()", () => {
    expect( new Validator( [ 1, 2, 3 ] ).assertAndSelectProperty( 1 ).getValue() ).toBe( 2 )
    expect( new Validator( Array       ).assertAndSelectProperty( "of" ).getValue() ).toBe( Array.of )
    expect( new Validator( Object      ).assertAndSelectProperty( "keys" ).getValue() ).toBe( Object.keys )
    expect( new Validator( 9           ).assertAndSelectProperty( "toExponential" ).getValue() ).toBe( Number.prototype.toExponential )

    expect( () => new Validator( [ 1, 2, 3 ] ).assertAndSelectProperty( 4 ) ).toThrow( TypeValidationError )
  } )
} )