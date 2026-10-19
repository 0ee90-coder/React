/** @format */

export default function TodoAppender() {
  const onClickButtonHandler = () => {
    alert("Todo 추가!");
  };
  const onKeyUpTodoInputHandler = (event) => {
    console.log(event.currentTarget.value);
  };
  const onChangePriorityHandler = (event) => {
    alert(event.currentTarget.value);
  };

  return (
    <footer>
      <input type="text" placeholder="Task" onKeyUp={onKeyUpTodoInputHandler} />
      <input type="date" />
      <select onChange={onChangePriorityHandler}>
        <option>우선순위</option>
        <option value="1">높음</option>
        <option value="2">보통</option>
        <option value="3">낮음</option>
      </select>
      <button type="button" onClick={onClickButtonHandler}>
        Save
      </button>
    </footer>
  );
}
