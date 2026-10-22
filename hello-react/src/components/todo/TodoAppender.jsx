/** @format */

import { useRef } from "react";
import Message from "../modals/Message";
import { addTodo, loadAllTodos } from "../../api/todo/todoApi";

export default function TodoAppender({ onClickSave }) {
  const options = [
    { value: "1", text: "높음" },
    { value: "2", text: "보통" },
    { value: "3", text: "낮음" },
  ];

  // ECMA Script ==> document.querySelector() 와 유사.
  const titleRef = useRef();
  const dueDateRef = useRef();
  const priorityRef = useRef();
  const messageRef = useRef();

  const onClickButtonHandler = () => {
    if (!titleRef.current.value) {
      // alert("Task를 입력하세요.");
      messageRef.current.open(<div>Task를 입력하세요.</div>);
      titleRef.current.focus();
      return;
    }
    if (!dueDateRef.current.value) {
      // alert("예상 완료일을 선택하세요.");
      messageRef.current.open(<div>예상 완료일을 선택하세요.</div>);
      dueDateRef.current.focus();
      return;
    }
    if (!priorityRef.current.value) {
      // alert("우선순위를 선택하세요.");
      messageRef.current.open(<div>우선순위를 선택하세요.</div>);
      return;
    }

    // main.jsx의 <StrictMode>는 모든 코드가 두 번씩 실행되도록 한다.
    //  ==> 중복 실행에 의한 에러가 존재하는지 미리 판단하기 위해.
    // 첫 번째 State의 변경이 일어난 즉시 두 번째 State의 변경을 시도하는데 이 때
    // 비어있는 값으로 Setting해서 state에 갱신하기 때문에, 비어있는 Task가 생성된다.
    // 이것을 해결하기 위해 Ref의 값을 전부 다른 상수에 할당해서 사용한다.
    //  ==> 상수는 변경 불가능하기 때문.
    const title = titleRef.current.value;
    const dueDate = dueDateRef.current.value;
    const priority = priorityRef.current.value;

    const newTodo = {
      task: title,
      dueDate,
      priority,
    };

    titleRef.current.value = "";
    dueDateRef.current.value = "";
    priorityRef.current.value = "";

    // 낙관적 업데이트
    const tempTodoId = `temp_todo_${Math.random()}`;
    onClickSave((prevTodoList) => [
      ...prevTodoList,
      { ...newTodo, id: tempTodoId, temp: true },
    ]);

    const requestAddNewTodo = async () => {
      try {
        await addTodo(newTodo);
        const todoList = await loadAllTodos();
        onClickSave(todoList);
      } catch (e) {
        console.log(e);
        messageRef.current.open(
          <div>Todo 등록을 할 수 없었습니다. 잠시 후 다시 시도해주세요.</div>,
        );

        // 낙관적 업데이트로 등록한 임시 투두를 제거한다.
        onClickSave((prevTodoList) =>
          prevTodoList.filter((todo) => todo.id !== tempTodoId),
        );
      }
    };
    requestAddNewTodo();

    // 제목, 완료예정일, 우선순위, 아이디 등을 객체로 만들어, onClickSave함수에게 전달.
    // onClickSave((prevTodoList) => {
    // ... <= 펼침 연산자 (Spread Operation)
    // [ ...배열 ] <== 배열을 펼쳐서 새로운 배열에 넣는다 == 메모리 복사.
    // [ ...배열, 새로운 값 ] <== 배열을 새로운 배열에 복사하고 마지막에 값을 추가한다.
    // 왜 새로운 배열을 반환해야 하는가? 많은 데이터에 대해 변경 추적이 필요하나,
    //                           많은 데이터에 대해 변경 추적을 할 경우 성능 하락 발생.
    //                           따라서 React의 State 변경 추적은 메모리 주소로 판단.
    //                           메모리 주소가 달라졌다면 state가 변경되었다! 라고 판단한다.
    //                           대신, 컴포넌트에 할당한 key를 통해 변경 추적을 실행한다.
    // const newTodoList = [...prevTodoList, newTodo];
    // return newTodoList;
    // });
  };

  return (
    <footer>
      <input type="text" placeholder="Task" ref={titleRef} />
      <input type="date" ref={dueDateRef} />
      <select ref={priorityRef}>
        <option value="">우선순위</option>
        {options.map(({ value, text }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
      <button type="button" onClick={onClickButtonHandler}>
        Save
      </button>
      <Message messageRef={messageRef} />
    </footer>
  );
}
