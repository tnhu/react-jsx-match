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
        <Case val="1" loose>
          One
        </Case>
        <Case val={(num: number) => num === 4}>Four</Case>
        <Case val={0}>Zero</Case>
        <Case val={100}>A hundred</Case>
        <Truthy>True</Truthy>
        <Falsy>False</Falsy>
        <Else>Everything else.</Else>
      </Match>

      <Render when={variable > 100}>More than a hundred</Render>
    </>
  );
}
```
