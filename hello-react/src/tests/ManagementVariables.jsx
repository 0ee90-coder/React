/** @format */

import { useState } from "react";
import Counter from "./Counter";

export default function ManagementVariables() {
  console.log("ManagementVariables 실행됨.");

  // let value = ""; <-- 값이 변경되더라도 함수가 재실행 되지 않는다 === 화면이 갱신되지 않는다.

  // state. 값이 변경되면 현재 컴포넌트를 재실행해 새로운 HTML을 반환하도록 한다.
  const [variable, setVariable] = useState();

  const onInputTextHandler = (event) => {
    // variable = event.currentTarget.value;
    // state값을 변경한다. 이전 state의 값과 할당하려는 값이 다르면, 컴포넌트가 재실행된다.
    // 재실행되는 시점 => 함수의 실행이 완료되었을 때.
    setVariable(event.currentTarget.value);
    console.log(variable);
  };

  return (
    <div>
      <div>{variable}</div>
      <input type="text" onInput={onInputTextHandler} />
      <Counter start={10} max={100} min={-100} step={20} />
    </div>
  );
}
