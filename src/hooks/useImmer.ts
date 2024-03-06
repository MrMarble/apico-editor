import { freeze, produce } from "immer";
import { useCallback, useState } from "preact/hooks";

export function useImmer<T>(initialValue: T) {
  const [val, updateValue] = useState(() =>
    freeze(
      typeof initialValue === "function" ? initialValue() : initialValue,
      true,
    ),
  );
  return [
    val,
    useCallback((updater: (state: unknown, ...args: unknown[]) => unknown | unknown) => {
      if (typeof updater === "function") updateValue(produce(updater));
      else updateValue(freeze(updater));
    }, []),
  ];
}
