import React from "react";
import { useRef } from "react";

function UseRefHook() {
  const inputRef = useRef(2);
  const handleClick = () => {
    alert(inputRef.current.value);
  };
  return (
    <>
      <h1>useRef</h1>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>useRef</button>
    </>
  );
}

export default UseRefHook;
