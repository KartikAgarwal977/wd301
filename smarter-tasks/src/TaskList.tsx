// import React from "react";
// import Task from "./Task";
// interface Props {
// }
// interface TaskItem {
//     title: string;
// }
// interface State {
//     task: TaskItem[];
// }
// class TaskList extends React.Component<Props, State> {
//     constructor(prop: Props) {
//         super(prop);
//         this.state = {
//             task: [{title:"Buy Grociereis"},{title:"Submit Assignment"},{title:"Pay rent"}],
//         }
//     }
//     componentDidMount(): void {
//         this.setState({
//             task: [{ title: "Pay rent" }, { title: "Submit assignment" }]
//         })
//     }
//     render(){
//         return (
//             this.state.task.map((tasks,idx) => <Task key={idx} title={tasks.title}/>)
//         )
//     }
// }
// export default TaskList;
import React from "react";
import Task from "./Task";
import { TaskItem } from "./types";
interface Props {
  tasks: TaskItem[];
}

interface State {}
class TaskList extends React.Component<Props, State> {
  
  render() {
    return this.props.tasks.map((task, idx) => (
      <Task key={idx} title={task.title} description={task.description} dueDate={task.dueDate} />
    ));
  }
}
export default TaskList;