import React from "react";
import { TaskItem } from "./types";
import "./TaskCard.css";

interface TaskFormProps {
  addTask: (task: TaskItem) => void;
  generateId: () => string;
}
interface TaskFormState {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}
const TaskForm = (Props: TaskFormProps) => {
  const [formState, setFormState] = React.useState<TaskFormState>({
    id: Props.generateId(),
    title: "",
    description: "",
    dueDate: "",
  });
  const addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (formState.title != "") {
      if (formState.dueDate != "") {
        // const newTask = {
        //     title: this.state.title,
        //     description: this.state.description,
        //     dueDate :this.state.dueDate
        // };
        Props.addTask(formState);
      } else alert("Please enter a valid date");
    } else alert("Title never be Empty");
    setFormState({ id: formState.id, title: "", description: "", dueDate: "" });
  };
  const descriptionChanged: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setFormState({ ...formState, description: event.target.value });
  };
  const titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormState({ ...formState, title: event.target.value });
  };
  const datechanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormState({ ...formState, dueDate: event.target.value });
  };
  return (
    <form onSubmit={addTask}>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="relative z-0 w-full mb-6 group">
          <input
            id="todoTitle"
            name="todoTitle"
            type="text"
            value={formState.title}
            onChange={titleChanged}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="todoTitle"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Todo Title
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            id="todoDescription"
            name="todoDescription"
            type="text"
            value={formState.description}
            onChange={descriptionChanged}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            htmlFor="todoDescription"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            id="todoDueDate"
            name="todoDueDate"
            type="date"
            value={formState.dueDate}
            onChange={datechanged}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="todoDueDate"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Due Date
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <button
            type="submit"
            id="addTaskButton"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add item
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;