import './TaskCard.css'
const TaskCard = (props) => {
  return (
    <div className='TaskItem'>
        <h2 className='text-xl font-bold'>{props.title} </h2>
      {date == null ? "due date:"+props.dueDate : "completed on:" + props.completedAtDate}
        <p>Assignee: {props.assigneeName} </p>
      </div>
    )
}
export default TaskCard