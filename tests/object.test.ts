import { Validator } from "../dist/main"

describe( "Object type tests", () => {
  test( "checks if object contains keys", () => {
    expect( () => new Validator( { a: 0, b: 1 } as unknown ).contains(
      {
        a: Validator.number,
        b: Validator.number
      }
    ).get() ).not.toThrow()

    expect( () => new Validator( { a: "abc", b: 1 } as unknown ).contains(
      {
        a: Validator.string,
        b: Validator.number
      }
    ).get() ).not.toThrow()

    expect( () => new Validator( { a: "abc", b: 1 } as unknown ).contains(
      {
        a: Validator.number,
        b: Validator.number
      }
    ).get() ).toThrow()
  } )
} )