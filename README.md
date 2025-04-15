# ts-validator

Asserts values at runtime and compile time for type validity.

## Installation

Local installation using git submodules.

```
mkdir git_modules
git submodule add https://github.com/onbo-moth/ts-validator/ git_modules/ts-validator
npm install ./git_modules/ts-validator 
```

## Basic Usage

```ts
import { Validator } from "ts-validator"

/// "abc" strongly typed as string.
const value = new Validator( "abc" as unknown ).string().get()  

// throws TypeValidationError, because 123 is not a string.
const error = new Validator( 123 as unknown ).string().get()
```

## Features

### Basic Type Checks

```ts
new Validator( 42   ).number()
new Validator( true ).boolean()
new Validator( null ).null()
```

### Boolean Methods

These methods check without throwing an error.

```ts
const value = new Validator( 99 )

console.log( value.isNumber() ) // true
console.log( value.isString() ) // false
```

### Access methods ( `has()`, `at()` )

Retrieves properties safely.

```ts
const obj = new Validator( { id: 12, name: "Marco" } )

console.log( obj.has( "id"  ) ) // true
console.log( obj.has( "age" ) ) // false

console.log( obj.at( "id" ).get() ) // 12
```

### Static assertion methods

Standalone functions for validating values.

```ts
Validator.number( 42   ) // Doesn't throw. 
Validator.number( "42" ) // Throws an error. 
```

### Static nullable assertion methods

```ts
// Both work!
Validator.nullable.number( 42 )
Validator.nullable.number( null )

// This doesn't work!
Validator.nullable.string( 42 )
```

### Array checks ( `arrayOf()` )

Ensures all elements in an array follow a type.

```ts
const numbers = new Validator( [ 1, 2, 3 ] as unknown )

numbers.arrayOf( Validator.number ).get() // [ 1, 2, 3 ] typed as number[]
numbers.arrayOf( Validator.string ).get() // Throws an error, because it fails string assertion.
```

### Object checks ( `contains()` )

Checks if an object contains specific keys with given types.

```ts
const obj = new Validator( { id: 13, name: "Alice" } as unknown )

obj.contains( {
  id:   Validator.number,
  name: Validator.string
} )

obj.get() // type contains { id: number, name: string }
```
