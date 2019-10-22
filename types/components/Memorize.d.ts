import * as React from "react";

export function withMemoize(
  component: React.ElementType,
  ignoreFunctions?: Boolean
): React.Component;

export function useMemoize(
  component: React.ElementType,
  ignoreFunctions?: Boolean
): React.Component;

interface MemoizeProps {
  component: React.ElementType;
  ignoreFunctions?: boolean;
  props?: object;
}

export declare const Memoize: React.ComponentType<MemoizeProps>;
