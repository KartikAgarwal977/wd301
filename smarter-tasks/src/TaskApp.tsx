// import  {useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { TaskItem } from "./types";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useEffect } from "react";
// interface TaskAppProp {}
interface TaskAppState {
  tasks: TaskItem[];
}

const TaskApp = () => {
  const [taskAppState, setTaskAppState] = useLocalStorage<TaskAppState>(
    "tasks",
    {
      tasks: [],
    }
  );
  // React.useState<TaskAppState>;
  const addTask = (tasks: TaskItem) => {
    const newTask = {
      ...tasks,
      id: uuidv4(),
    };
    setTaskAppState({ tasks: [...taskAppState.tasks, newTask] });
  };
  const deleteTask = (id: string) => {
    const newTasks = taskAppState.tasks.filter((task) => task.id !== id);
    setTaskAppState({ tasks: newTasks });
  };

  const generateId = () => {
    return uuidv4();
  };
  useEffect(() => {
    console.log(taskAppState.tasks.map((task) => task));
    //   document.title = `You have ${taskAppState.tasks.length} item in the list`
  }, [taskAppState.tasks]);
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl mb-2 font-bold text-slate-700">Smarter Tasks</h1>
      <h1 className="text-lg mb-6 text-slate-600">
        <span className="font-bold">Project: </span>
        Graduation Final Year Project (Revamp college website)
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-slate-200 rounded-xl p-4">
          <h1 className="text-slate-500 text-xl font-bold text-center mb-2">
            Pending
          </h1>
          <TaskForm addTask={addTask} generateId={generateId} />
          <TaskList tasks={taskAppState.tasks} deleteValue={deleteTask} />
        </div>
      </div>
    </div>
  );
};
export default TaskApp;
// class TaskApp extends React.Component<TaskAppProp, TaskAppState> {
//     addTask = (task: TaskItem) => {
//         this.setState((state) => {
//           return {
//               tasks: [...state.tasks, task],
//           };
//         });
//       };
//   constructor(props: TaskAppProp) {
//     super(props);
//     this.state = {
//         tasks: []
//     };
//   }

//   render() {
//     return (
//       <div className="container py-10 max-w-4xl mx-auto">
//         <h1 className="text-3xl mb-2 font-bold text-slate-700">
//           Smarter Tasks
//         </h1>
//         <h1 className="text-lg mb-6 text-slate-600">
//           <span className="font-bold">Project: </span>
//           Graduation Final Year Project (Revamp college website)
//         </h1>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="border border-slate-200 rounded-xl p-4">
//             <h1 className="text-slate-500 text-xl font-bold text-center mb-2">
//               Pending
//             </h1>
//             <TaskForm addTask={this.addTask} />
//             <TaskList tasks={this.state.tasks} />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
