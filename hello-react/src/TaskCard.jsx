import './TaskCard.css'
const TaskCard = (props) => {
  const date = props.completedAtDate
  return (
    <div className='TaskItem'>
        <h2 className='text-xl font-bold'>{props.title} </h2>
      {date == null ? "Due on :"+props.dueDate : "Completed on :" + props.completedAtDate}
        <p>Assignee: {props.assigneeName} </p>
      </div>
    )
}

export default TaskCard