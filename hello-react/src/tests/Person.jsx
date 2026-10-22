/** @format */

export default function Person({ name, age, job, children }) {
  //   const { name, age, job, children } = props;
  //   console.log(props);

  // const object = null;
  // const nm = object.name; ==> Error!
  // const nm = (object || {}).name;

  return (
    <li>
      <div>이름: {name}</div>
      <div>나이: {age}</div>
      <div>직업: {job}</div>
      {children && <div>소개: {children}</div>}
    </li>
  );
}
