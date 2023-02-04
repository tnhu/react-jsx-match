# react-jsx-match

Allow conditional matching in React JSX.

## Install

```sh
npm i react-jsx-match

or

yarn add react-jsx-match
```

## Usage

```tsx
import { Case, Else, Falsy, Match, Truthy, Render } from "react-jsx-match";

function Example() {
  const variable: number = 100; // variable can be any

  return (
    <>
      <Match expr={variable}>
        {/* Match exact values */}
        <Case val={0}>Zero</Case>
        <Case val={100}>A hundred</Case>

        {/* loose means `==` */}
        <Case val="1" loose>
          One
        </Case>

        {/* val can be a callback */}
        <Case val={(num: number) => num === 4}>Four</Case>

        {/* Match truthy values */}
        <Truthy>True</Truthy>

        {/* Match falsy values */}
        <Falsy>False</Falsy>

        {/* If nothing above matches... */}
        <Else>Everything else.</Else>
      </Match>

      {/* Render children only if when condition is truthy */}
      <Render when={variable > 100}>More than a hundred</Render>
    </>
  );
}
```

## Development

```sh
npm i
npm run build
npm run test
npm run coverage
```
