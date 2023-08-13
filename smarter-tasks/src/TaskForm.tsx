import React from 'react'
import { TaskItem } from "./types";
import "./TaskCard.css"

interface TaskFormProps {
    addTask: (task: TaskItem) => void;
  }
interface TaskFormState {
    title: string;
    description: string;
    dueDate: string;
}
class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
    addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (this.state.title != '') {
            if (this.state.dueDate != '') {
                const newTask = {
                    title: this.state.title,
                    description: this.state.description,
                    dueDate :this.state.dueDate            
                };
                this.props.addTask(newTask);
            }
            else alert("Please enter a valid date");
        }
        else alert("Title never be Empty")
        this.setState({ title: "",description:"",dueDate:"" });
    }
    descriptionChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({
            description: event.target.value,
        })
    }
    titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({
            title: event.target.value,
        });
    };
    datechanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({
            dueDate: event.target.value,
        })
    }
    constructor(prop: TaskFormProps) {
        super(prop);
        this.state = {
            title: '',
            description: '',
            dueDate: ''
        }
    }
    inputRef = React.createRef<HTMLInputElement>();
    render() {
        return (
            <div >
                <form onSubmit={this.addTask}>
                    <input id="todoTitle" className="border-2" type="text" value={this.state.title} onChange={this.titleChanged} />
                    <input id="todoDescription" className='border-2' type='text' value={this.state.description} onChange={this.descriptionChanged} />
                    <input id="todoDueDate"className='border-2' type='date' value={this.state.dueDate} onChange={this.datechanged}/>
                    <button id="addTaskButton" type="submit">Add Task</button>
                </form>
            </div>
        )
    }
}
export default TaskForm;