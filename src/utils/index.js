export const arePropsSame = (ignoreFunctions, prev, next) => {
  if (typeof prev !== typeof next) {
    return false;
  }
  if (typeof prev === "function") {
    if (ignoreFunctions) return true;
    return prev === next;
  }
  if (typeof prev !== "object" || prev === null || next === null) {
    return prev === next;
  }

  const prevEntries = Object.entries(prev);
  const nextEntries = Object.entries(next);
  if (prevEntries.length !== nextEntries.length) {
    return false;
  }

  for (const [key, value] of prevEntries) {
    const nextValue = next[key];

    switch (typeof value) {
      case "symbol": {
        if (key !== "$$typeof") {
          /*
          console.debug("------------------------");
          console.debug(prev);
          console.debug(next);
          console.debug(key);
          */
          throw new Error("Symbol not implemented");
        }
        return arePropsSame(ignoreFunctions, prev.props, next.props);
      }

      case "function": {
        if (ignoreFunctions) {
          break;
        }
        if (value !== nextValue) {
          return false;
        }
        break;
      }

      case "object": {
        if (typeof nextValue !== "object") {
          return false;
        }
        if (value === null || nextValue === null) {
          if (value !== nextValue) return false;
        } else if (!arePropsSame(ignoreFunctions, value, nextValue)) {
          return false;
        }
        break;
      }

      default: {
        if (typeof value !== typeof nextValue) {
          return false;
        }
        if (value !== nextValue) {
          return false;
        }
        break;
      }
    }
  }

  return true;
};
