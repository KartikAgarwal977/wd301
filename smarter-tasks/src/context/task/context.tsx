import React, { createContext, useContext, useReducer } from "react";
import { TaskListState, TasksDispatch } from "./types";
import { initialState, taskReducer } from "./reducer";

const TaskStateContext = createContext<TaskListState>(initialState)
const TaskDispatchContext = createContext<TasksDispatch>(() => { })
export const TasksProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(taskReducer, initialState)
    return (
        <TaskStateContext.Provider value={state}>
            <TaskDispatchContext.Provider value={dispatch}>
                {children}
            </TaskDispatchContext.Provider>
        </TaskStateContext.Provider>
    )
}
export const useTasksState = () => useContext(TaskStateContext)
export const useTasksDispatch = () => useContext(TaskDispatchContext)