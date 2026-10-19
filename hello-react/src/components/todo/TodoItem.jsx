/** @format */

export default function TodoItem({ id, title, dueDate, priority }) {
  return (
    <li className="task-item">
      <input id={id} type="checkbox" />
      <label htmlFor={id}>{title}</label>
      <span className="due-date">{dueDate}</span>
      <span className="priority">{priority}</span>
    </li>
  );
}
