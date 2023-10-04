import React from "react";
import { AvailableColumns, ProjectData } from "../../context/task/types";
import Column from "./Column";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import { reorderTasks, updateTask } from "../../context/task/actions";
import { useTasksDispatch } from "../../context/task/context";
import { useParams } from "react-router-dom";
const Container = (props: React.PropsWithChildren) => {
  return <div className="flex">{props.children}</div>;
};
const DragDropList = (props: { data: ProjectData }) => {
  const { projectID } = useParams();
  const taskDispatch = useTasksDispatch()
  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const startKey = source.droppableId as AvailableColumns;
    const finishKey = destination.droppableId as AvailableColumns;

    const start = props.data.columns[startKey];
    const finish = props.data.columns[finishKey];

    if (start === finish) {
      const newTaskIDs = Array.from(start.taskIDs);
      newTaskIDs.splice(source.index, 1)
      newTaskIDs.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        newTaskIDs: newTaskIDs,
      }
      const newState = {
        ...props.data,
        Columns: {
          ...props.data.columns,
          [newColumn.id]: newColumn,
        }
      }
      reorderTasks(taskDispatch, newState);
      return;
    }
    const startTaskIds = Array.from(start.taskIDs)
    const updatedItems = startTaskIds.splice(source.index, 1)
    const updatedTask = props.data.tasks[updatedItems[0]];
    updatedTask.state = finishKey;
    updateTask(taskDispatch, projectID ?? "", updatedTask);
    
    const newStart = {
      ...start,
      taskIDs: startTaskIds,
    }

    const finishTaskIDs = Array.from(finish.taskIDs)

    finishTaskIDs.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIDs: finishTaskIDs,
    }

    const newState = {
      ...props.data,
      columns: {
        ...props.data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }
    reorderTasks(taskDispatch, newState)
  }
      
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {props.data.columnOrder.map((colID) => {
          const column = props.data.columns[colID];
          const tasks = column.taskIDs.map(
            (taskID) => props.data.tasks[taskID]
          );
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
};
export default DragDropList;
