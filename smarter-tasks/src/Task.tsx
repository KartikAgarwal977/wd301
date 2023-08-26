interface Taskprop {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  deleteValue: (id: number) => void;
}
const Task = (props: Taskprop) => {
  return (
    <ul className="TaskItem shadow-md border border-slate-100">
      <li>
        <h2 className="text-base font-bold my-1">{props.title}</h2>
        <p className="text-sm text-slate-500">{props.dueDate}</p>
        <p className="text-sm text-slate-500">
          Description: {props.description}
        </p>
        <button
          // id="deleteTaskButton"
          className="deleteTaskButton"
          onClick={() => props.deleteValue(props.id)}
        >
         delete
        </button>
      </li>
    </ul>
  );
};
export default Task;
