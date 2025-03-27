import { Validator } from "../dist/main"

describe( "Array type checks", () => {
  test( "should validate arrays containing a type", () => {
    expect( () => new Validator( [ 1, 2, 3 ] ).arrayOf( Validator.number ).get() ).not.toThrow()
    expect( () => new Validator( [ "abc", "def", "ghi" ] ).arrayOf( Validator.string ).get() ).not.toThrow()

    expect( () => new Validator( [ 1, "def", "ghi" ] ).arrayOf( Validator.string ).get() ).toThrow()
  } )
} )