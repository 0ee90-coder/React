/** @format */

import Person from "./Person";

export default function ListApp() {
  const persons = [
    { name: "Kim", age: 11, job: "None" },
    { name: "Nah", age: 21, job: "Singer" },
    { name: "Park", age: 31, job: "Singer" },
    {
      name: "Lee",
      age: 41,
      job: "Singer",
      children: (
        <img src="https://img1.kakaocdn.net/thumb/R1280x0.fwebp/?fname=http://t1.daumcdn.net/brunch/service/user/F6P/image/VKzWHJAzm5HxEfoexwOZuR8Xr1Q.JPG" />
      ),
    },
  ];
  return (
    <ul>
      {/* <ListItem /> */}
      {persons.map(({ name, age, job, children }) => (
        <Person age={age} job={job} name={name} key={name}>
          {children}
        </Person>
      ))}
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
