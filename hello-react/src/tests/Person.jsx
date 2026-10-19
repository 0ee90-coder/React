/** @format */

export default function Person({ name, age, job, children }) {
  //   const { name, age, job, children } = props;
  //   console.log(props);
  return (
    <div>
      <div>이름: {name}</div>
      <div>나이: {age}</div>
      <div>직업: {job}</div>
      <div>소개: {children}</div>
    </div>
  );
}
