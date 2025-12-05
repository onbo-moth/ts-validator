# ts-validator

Asserts values at runtime and compile time for type validity.

## Installation

### Local installation using git submodules.

```
mkdir git_modules
git submodule add https://github.com/onbo-moth/ts-validator/ git_modules/ts-validator
npm install ./git_modules/ts-validator 
```

### Using in `package.json`

Add following line to dependencies section:

```json
{
  "dependencies": {
    // ...
    "ts-validator": "github:onbo-moth/ts-validator",
    // ...
  }
}
```

## Basic Usage

```ts
import { Validator } from "ts-validator"

/// "abc" strongly typed as string.
const value = new Validator( "abc" as unknown ).assertToString().getValue()  

// throws TypeValidationError, because 123 is not a string.
const error = new Validator( 123 as unknown ).assertToString().getValue()
```

## Features

### Basic Type Checks

```ts
new Validator( 42   ).assertToNumber()
new Validator( true ).assertToBoolean()
new Validator( null ).assertToNull()
```

### Boolean Methods

These methods check without throwing an error.

```ts
const value = new Validator( 99 )

console.log( value.isNumber() ) // true
console.log( value.isString() ) // false
```

### Access methods ( `containsProperty()`, `assertAndSelectProperty()` )

Retrieves properties safely.

```ts
const obj = new Validator( { id: 12, name: "Marco" } )

console.log( obj.containsProperty( "id"  ) ) // true
console.log( obj.containsProperty( "age" ) ) // false

console.log( obj.assertAndSelectProperty( "id" ).getValue() ) // 12
```

### Static assertion methods

Standalone functions for validating values.

```ts
Validator.assertToNumber( 42   ) // Doesn't throw. 
Validator.assertToNumber( "42" ) // Throws an error. 
```

### Static nullable assertion methods

```ts
// Both work!
Validator.assertToNumberOrNull( 42 )
Validator.assertToNumberOrNull( null )

// This doesn't work!
Validator.assertToNumberOrNull( 42 )
```

### Array checks ( `assertArrayOf()` )

Ensures all elements in an array follow a type.

```ts
const numbers = new Validator( [ 1, 2, 3 ] as unknown )

numbers.assertArrayOf( Validator.assertToNumber ).getValue() // [ 1, 2, 3 ] typed as number[]
numbers.assertArrayOf( Validator.assertToString ).getValue() // Throws an error, because it fails string assertion.
```

### Object checks ( `assertContains()` )

Checks if an object contains specific keys with given types.

```ts
const obj = new Validator( { id: 13, name: "Alice" } as unknown )

obj.assertContains( {
  id:   Validator.number,
  name: Validator.string
} )

obj.getValue() // type contains { id: number, name: string }
```
