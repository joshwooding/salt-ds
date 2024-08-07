import { type Context, createContext as createReactContext } from "react";

export function createContext<ContextValueType>(
  name: string,
  defaultValue: ContextValueType,
): Context<ContextValueType> {
  const context = createReactContext<ContextValueType>(defaultValue);
  if (process.env.NODE_ENV !== "production") {
    context.displayName = name;
  }
  return context;
}
