/** @format */

export default function ListApp() {
  return (
    <ul>
      <ListItem />
    </ul>
  );
}

function ListItem() {
  let text = "DEF";
  const price = 10000;

  function testFn() {
    return <div>함수에서 만든 div</div>;
  }

  // React.js에서는 함수를 함수 표현식으로 만든다.
  // 네이밍 규칙 > 이벤트명_대상태그명_Handler
  const onClickListItemHandler = function () {
    console.log("On Click!");
  };
  const onClickSecondListItemHandler = function () {
    console.log("On Click - Second List Item");
  };

  return (
    <>
      {/*asdflkjasdf */}
      <li onClick={onClickListItemHandler}>{text}</li>
      <li onClick={onClickSecondListItemHandler}>{price}</li>
      <li>{testFn()}</li>
    </>
  );
}

function ListText() {
  return <li>ABCD</li>;
}
