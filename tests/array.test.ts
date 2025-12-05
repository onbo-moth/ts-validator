import { Validator } from "../dist/main"

describe( "Array type checks", () => {
  test( "should validate arrays containing a type", () => {
    expect( () => new Validator( [ 1, 2, 3 ] ).assertArrayOf( Validator.assertToNumber ).getValue() ).not.toThrow()
    expect( () => new Validator( [ "abc", "def", "ghi" ] ).assertArrayOf( Validator.assertToString ).getValue() ).not.toThrow()

    expect( () => new Validator( [ 1, "def", "ghi" ] ).assertArrayOf( Validator.assertToString ).getValue() ).toThrow()
  } )
} )