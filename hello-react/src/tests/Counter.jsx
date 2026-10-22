/** @format */

import { useState } from "react";

export default function Counter({
  start = 0,
  max = Infinity,
  min = 0,
  step = 1,
}) {
  console.log("Counter 실행됨.");
  const [count, setCount] = useState(start);

  const onClickPlusButtonHandler = () => {
    // count가 step만큼 증가.
    // count가 max보다 커질 수 없다. == 증가되지 않는다.
    // if (count < max) {
    //   setCount(count + step);
    // }
    // console.log(count);

    setCount((prevCount) => {
      console.log(prevCount);
      if (prevCount < max) {
        return prevCount + step;
      }
      return prevCount;
    });
  };
  const onClickMinusButtonHandler = () => {
    // count가 step만큼 감소
    // count가 min보다 작아질 수 없다. == 감소되지 않는다.
    // if (count > min) {
    //   setCount(count - step);
    // }
    // console.log(count);
    setCount((prevCount) => {
      if (prevCount > min) {
        return prevCount - step;
      }
      return prevCount;
    });
  };

  return (
    <div>
      <button type="button" onClick={onClickPlusButtonHandler}>
        +
      </button>
      <span>{count}</span>
      <button type="button" onClick={onClickMinusButtonHandler}>
        -
      </button>
    </div>
  );
}
