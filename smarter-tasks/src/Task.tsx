interface Taskprop {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  deleteValue: (id: string) => void;
}
const Task = (props: Taskprop) => {
  return (
    <ul className="TaskItem shadow-md border border-slate-100">
      <li className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div>
        <a href={`/tasks/${props.id || ''}`}>
<h2 className="text-base font-bold my-1">{props.title}</h2>
        </a>
        <p className="text-sm text-slate-500">{props.dueDate}</p>
        <p className="text-sm text-slate-500">
          Description: {props.description}
        </p>
        <button
          // id="deleteTaskButton"
          className="deleteTaskButton cursor-pointer flex items-center h-4 w-4 rounded-full my-5 mr-5"
          onClick={() => props.deleteValue(props.id)}
        >
         X
        </button>
        </div>
      </li>
    </ul>
  );
};
export default Task;
