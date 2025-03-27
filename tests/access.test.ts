import { TypeValidationError, Validator } from "../dist/main"

describe( "Access methods", () => {
  test( "checks has()", () => {
    expect( new Validator( [ 1, 2, 3 ] ).has( 1 ) ).toBe( true  )
    expect( new Validator( [ 1, 2, 3 ] ).has( 4 ) ).toBe( false )

    expect( new Validator( Array ).has( "of" ) ).toBe( true )

    expect( new Validator( Object ).has( "keys" ) ).toBe( true )

    // primitives have prototype funtions too
    expect( new Validator( 9 ).has( "toExponential" ))
    
    // linter does the job, uncomment to show

    // expect( new Validator( Array ).has( "abc" ) ).toBe( false )
    // expect( () => new Validator( Function ).has( "abcabc" ) ).toBe( false )
  } )

  test( "checks at()", () => {
    expect( new Validator( [ 1, 2, 3 ] ).at( 1 ).get() ).toBe( 2 )
    expect( new Validator( Array       ).at( "of" ).get() ).toBe( Array.of )
    expect( new Validator( Object      ).at( "keys" ).get() ).toBe( Object.keys )

    expect( () => new Validator( [ 1, 2, 3 ] ).at( 4 ) ).toThrow( TypeValidationError )
  } )
} )