import { Validator } from "../dist/main"

describe( "Object type tests", () => {
  test( "checks if object contains keys", () => {
    expect( () => new Validator( { a: 0, b: 1 } as unknown ).assertContains(
      {
        a: Validator.assertToNumber,
        b: Validator.assertToNumber
      }
    ).getValue() ).not.toThrow()

    expect( () => new Validator( { a: "abc", b: 1 } as unknown ).assertContains(
      {
        a: Validator.assertToString,
        b: Validator.assertToNumber
      }
    ).getValue() ).not.toThrow()

    expect( () => new Validator( { a: "abc", b: 1 } as unknown ).assertContains(
      {
        a: Validator.assertToNumber,
        b: Validator.assertToNumber
      }
    ).getValue() ).toThrow()
  } )
} )