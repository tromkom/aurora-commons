import React from "react";
import { arePropsSame } from "../utils";

export const withMemoize = (component, ignoreFunctions = true) => {
  return React.memo(component, arePropsSame.bind(null, ignoreFunctions));
};

export const useMemoize = (component, ignoreFunctions = true) => {
  return React.useCallback(withMemoize(component, ignoreFunctions), [
    component
  ]);
};

export const Memoize = ({ component, ignoreFunctions = true, ...props }) => {
  const Component = useMemoize(component, ignoreFunctions);
  return <Component {...{ ...props, ...(props.props || {}) }} />;
};
