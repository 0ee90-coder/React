/** @format */

import { memo, useCallback, useMemo, useState } from "react";

// const child3Handler = () => {
//   //   if (!p1) {
//   //     return 0;
//   //   }
//   const p1 = Math.random();
//   const lastNumber = p1 * 1_000_000_000;
//   let result = 0;
//   for (let i = 1; i <= lastNumber; i++) {
//     result += i;
//   }
//   return result;
// };

export default function StateTest() {
  console.log("StateTest 실행됨");

  const [p1, setP1] = useState();
  const [p2, setP2] = useState();
  const [p3, setP3] = useState();

  //   const child3HandlerRef = useRef(() => {
  //     if (!p1) {
  //       return 0;
  //     }
  //     const lastNumber = p1 * 1_000_000_000;
  //     let result = 0;
  //     for (let i = 1; i <= lastNumber; i++) {
  //       result += i;
  //     }
  //     return result;
  //   });

  const onClickP1Handler = () => {
    setP1(Math.random());
  };
  const onClickP2Handler = () => {
    setP2(Math.random());
  };
  const onClickP3Handler = () => {
    setP3(Math.random());
  };

  const child3Handler = useCallback(() => {
    if (!p1) {
      return 0;
    }
    const lastNumber = p1 * 1_000_000_000;
    let result = 0;
    for (let i = 1; i <= lastNumber; i++) {
      result += i;
    }
    return result;
  }, [p1]);

  // useMemo 실습용 객체
  // const child4Data = {
  //   id: "abcd",
  //   name: "홍길동",
  // };

  const child4Data = useMemo(() => {
    return {
      id: p1,
      name: "홍길동",
    };
  }, [p1]);

  // useMemo 실습용 함수
  const memoizedChild5Handler = useMemo(() => {
    if (!p1) {
      return <div>값이 없음</div>;
    }
    const lastNumber = p1 * 1_000_000_000;
    let result = 0;
    for (let i = 1; i <= lastNumber; i++) {
      result += i;
    }
    return (
      <div>
        1 부터 {lastNumber} 까지의 합: {result}
      </div>
    );
  }, [p1]);

  return (
    <div>
      <button type="button" onClick={onClickP1Handler}>
        [p1] Click Me!
      </button>
      <button type="button" onClick={onClickP2Handler}>
        [p2] Click Me!
      </button>
      <button type="button" onClick={onClickP3Handler}>
        [p3] Click Me!
      </button>
      <Child1 p1={p1} p2={p2} />
      <Child2 />
      {/* <Child3 handler={child3Handler} /> */}
      {/* useMemo 실습용 컴포넌트 */}
      <Child4 dataObject={child4Data} />
      <Child5 calcResult={memoizedChild5Handler} />
    </div>
  );
}

const Child1 = memo(function ({ p1, p2 }) {
  console.log("Child1 실행됨.");
  return (
    <div>
      Child1 {p1} / {p2}
    </div>
  );
});

const Child2 = memo(function () {
  console.log("Child2 실행됨.");
  return <div>Child2</div>;
});

function Child3({ handler }) {
  console.log(handler);
  console.log("Child3 실행됨.");

  const result = handler();
  return <div>{result}</div>;
}

// useMemo 실습용 컴포넌트
function Child4({ dataObject }) {
  console.log("Child4 실행됨.");
  const { id, name } = dataObject;

  return (
    <ul>
      <li>ID: {id}</li>
      <li>NAME: {name}</li>
    </ul>
  );
}

// useMemo 실습용 컴포넌트
function Child5({ calcResult }) {
  console.log("Child5 실행됨.");
  console.log(calcResult);
  return <div>계산 결과: {calcResult}</div>;
}
