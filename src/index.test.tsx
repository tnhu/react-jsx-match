import React from "react";
import renderer from "react-test-renderer";
import { assert, expect, test } from "vitest";
import { Case, Else, Falsy, Match, Truthy, Render } from ".";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();
  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);
  return result as renderer.ReactTestRendererJSON;
}

test("Render renders nothing/null when `when` is false", () => {
  const Component = renderer.create(
    <Render when={1 > 100}>Should not be rendered</Render>
  );

  const tree = toJson(Component);
  expect(tree).toBeFalsy();
});

test("Render renders children when `when` is true", () => {
  const children = "Should be rendered";
  const Component = renderer.create(<Render when={1 < 100}>{children}</Render>);

  const tree = toJson(Component);
  expect(tree).toEqual(children);
});

test("Render inside Render with no match condition", () => {
  const children = "Should not be rendered";
  const Component = renderer.create(
    <Render when={1 < 100}>
      <Render when={false}>{children}</Render>
    </Render>
  );

  const tree = toJson(Component);
  expect(tree).toBeFalsy();
});

test("Render inside Render with matched condition", () => {
  const children = "Should be rendered";
  const Component = renderer.create(
    <Render when={1 < 100}>
      <Render when={true}>{children}</Render>
    </Render>
  );

  const tree = toJson(Component);
  expect(tree).toEqual(children);
});

test("Match renders nothing/null when no Case is matched", () => {
  const Component = renderer.create(
    <Match expr={100}>
      <Case val={0}>Zero</Case>
      <Case val={2}>Two</Case>
      <Case val="1" loose>
        One as a string
      </Case>
      <Case val={(num: number) => num === 4}>Number is four</Case>
      <Falsy>False</Falsy>
    </Match>
  );

  const tree = toJson(Component);
  expect(tree).toBeFalsy();
});

test("Match renders first matched Case", () => {
  const Component = renderer.create(
    <Match expr={100}>
      <Case val={0}>Zero</Case>
      <Case val={2}>Two</Case>
      <Case val="1" loose>
        One as a string
      </Case>
      <Case val={100}>A Hundred</Case>
    </Match>
  );

  const tree = toJson(Component);
  expect(tree).toEqual("A Hundred");
  expect(tree).toMatchInlineSnapshot('"A Hundred"');
});

test("Match renders first exact matched Case", () => {
  const Component = renderer.create(
    <Match expr={100}>
      <Case val={0}>Zero</Case>
      <Case val={2}>Two</Case>
      <Case val="100">A Hundred as a string</Case>
      <Case val={100}>A Hundred</Case>
    </Match>
  );

  const tree = toJson(Component);
  expect(tree).toEqual("A Hundred");
});

test("Match renders with Case as a function", () => {
  const Component = renderer.create(
    <Match expr={100}>
      <Case val={0}>Zero</Case>
      <Case val={2}>Two</Case>
      <Case val={(val: number) => val >= 100}>
        Equal or more than a hundred
      </Case>
      <Case val={100}>A Hundred</Case>
    </Match>
  );

  const tree = toJson(Component);
  expect(tree).toEqual("Equal or more than a hundred");
});

test("Match renders first loose matched Case because of its order", () => {
  const Component = renderer.create(
    <Match expr={100}>
      <Case val={0}>Zero</Case>
      <Case val={2}>Two</Case>
      <Case val="100" loose>
        A Hundred as a string
      </Case>
      <Case val={100}>A Hundred</Case>
    </Match>
  );

  const tree = toJson(Component);
  expect(tree).toEqual("A Hundred as a string");
});

test("Match renders Truthy match", () => {
  const Component = renderer.create(
    <Match expr={1111}>
      <Case val={0}>Zero</Case>
      <Case val={2}>Two</Case>
      <Case val="1" loose>
        One as a string
      </Case>
      <Case val={(num: number) => num === 4}>Number is four</Case>
      <Truthy>True must be rendered</Truthy>
      <Falsy>False</Falsy>
      <Else>Everything else.</Else>
    </Match>
  );

  const tree = toJson(Component);
  expect(tree).toEqual("True must be rendered");
});

test("Match renders Falsy match", () => {
  const Component = renderer.create(
    <Match expr={false}>
      <Case val={0}>Zero</Case>
      <Case val={2}>Two</Case>
      <Case val="1" loose>
        One as a string
      </Case>
      <Case val={(num: number) => num === 4}>Number is four</Case>
      <Truthy>True</Truthy>
      <Falsy>False must be rendered</Falsy>
      <Else>Everything else.</Else>
    </Match>
  );

  const tree = toJson(Component);
  expect(tree).toEqual("False must be rendered");
});

test("Match renders Else when nothing is matched", () => {
  const Component = renderer.create(
    <Match expr={"hello world"}>
      <Case val={0}>Zero</Case>
      <Case val={2}>Two</Case>
      <Case val="1" loose>
        One as a string
      </Case>
      <Case val={(num: number) => num === 4}>Number is four</Case>
      <Falsy>False must be rendered</Falsy>
      <Else>
        <p>Nothing is matched.</p>
      </Else>
    </Match>
  );

  const tree = toJson(Component);
  expect(tree).toMatchSnapshot();
});

test("Match inside Match", () => {
  const Component = renderer.create(
    <Match expr={"hello world"}>
      <Case val={0}>Zero</Case>
      <Case val={2}>Two</Case>
      <Case val="1" loose>
        One as a string
      </Case>
      <Case val={(num: number) => num === 4}>Number is four</Case>
      <Falsy>False must be rendered</Falsy>
      <Else>
        <Match expr={false}>
          <Truthy>True</Truthy>
          <Falsy>False must be rendered</Falsy>
        </Match>
      </Else>
    </Match>
  );

  const tree = toJson(Component);
  expect(tree).toEqual("False must be rendered");
});

test("Render inside Match with nothing matched", () => {
  const Component = renderer.create(
    <Match expr={"hello world"}>
      <Case val={0}>Zero</Case>
      <Case val={2}>Two</Case>
      <Case val="1" loose>
        One as a string
      </Case>
      <Case val={(num: number) => num === 4}>Number is four</Case>
      <Falsy>False must be rendered</Falsy>
      <Else>
        <Render when={false}>This should not be rendered</Render>
      </Else>
    </Match>
  );

  const tree = toJson(Component);
  expect(tree).toBeFalsy();
});

test("Render inside Match with `when` is truthy", () => {
  const Component = renderer.create(
    <Match expr={"hello world"}>
      <Case val={0}>Zero</Case>
      <Case val={2}>Two</Case>
      <Case val="1" loose>
        One as a string
      </Case>
      <Case val={(num: number) => num === 4}>Number is four</Case>
      <Falsy>False must be rendered</Falsy>
      <Else>
        <Render when={true}>This must be rendered</Render>
      </Else>
    </Match>
  );

  const tree = toJson(Component);
  expect(tree).toEqual("This must be rendered");
});
