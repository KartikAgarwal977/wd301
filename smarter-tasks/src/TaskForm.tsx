import React from 'react'
import { TaskItem } from "./types";

interface TaskFormProps {
    addTask: (task: TaskItem) => void;
  }
interface TaskFormState {
    title: string;
}
class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
    addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const newTask = {
            title: this.state.title,
        };
        this.props.addTask(newTask);
        this.setState({ title: "" });
    }
    titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        console.log(`${event.target.value}`);
        this.setState({ title: event.target.value });
    };
    
    constructor(prop: TaskFormProps) {
        super(prop);
        this.state = {
            title: ''
        }
    }
    inputRef = React.createRef<HTMLInputElement>();
    render() {
        return (
            <div >
                <form onSubmit={this.addTask}>
                    <input className="border-2" type="text" value={this.state.title} onChange={this.titleChanged}/>
                    <button type="submit">Add Task</button>
                </form>
            </div>
        )
    }
}
export default TaskForm;