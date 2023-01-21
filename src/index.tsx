export interface MatchProps {
  expr?: unknown;
  children: JSX.Element[];
}

export function Match({ expr, children }: MatchProps) {
  const Component = children.find((child) =>
    child.type.prototype.evaluate?.(expr, child.props)
  );
  return Component ? Component.props.children : null;
}

export interface CaseProps {
  val: unknown;
  loose?: boolean;
  children: React.ReactNode;
}

export function Case({ children }: CaseProps) {
  return children as JSX.Element;
}

Case.prototype.evaluate = (expr: unknown, props = {} as CaseProps) => {
  if (typeof props.val === "function") {
    return props.val(expr);
  }
  return props.loose ? expr == props.val : expr === props.val;
};

export function Truthy({ children }: { children: React.ReactNode }) {
  return children as JSX.Element;
}

Truthy.prototype.evaluate = (expr: unknown) => !!expr;

export function Falsy({ children }: { children: React.ReactNode }) {
  return children as JSX.Element;
}

Falsy.prototype.evaluate = (expr: unknown) => !expr;

export function Else({ children }: { children: React.ReactNode }) {
  return children as JSX.Element;
}

Else.prototype.evaluate = (expr: unknown) => true;

interface RenderProps {
  when?: unknown;
  children: JSX.Element;
}

export function Render({ when, children }: RenderProps) {
  return when ? children : null;
}
