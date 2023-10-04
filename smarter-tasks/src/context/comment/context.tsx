import React, { createContext, useContext, useReducer } from "react";
import { CommentDispatch, CommentListState } from "./types";
import { CommentReducer, initialCommentState } from "./reducer";

const CommentStateContext = createContext<CommentListState>(initialCommentState);
const CommentDispatchContext = createContext<CommentDispatch>(() => { })

export const CommentProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(CommentReducer, initialCommentState);

    return (
        <CommentStateContext.Provider value={state}>
            <CommentDispatchContext.Provider value={dispatch}>
                {children}
            </CommentDispatchContext.Provider>
        </CommentStateContext.Provider>
    )
}
export const useCommentDispatch = () => useContext(CommentDispatchContext);
export const useCommentState = () => useContext(CommentStateContext);