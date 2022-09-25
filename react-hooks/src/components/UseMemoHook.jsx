import React from "react";
import { useMemo } from "react";

function computeExpensiveValue(a, b) {
  return a * b;
}

function UseMemoHook() {
  const change = true;
  const memorizedValue = useMemo(() => computeExpensiveValue(2, 2), [change]);
  return (
    <>
      <h1>useMemo</h1>
      <div>{memorizedValue}</div>
    </>
  );
}

export default UseMemoHook;
