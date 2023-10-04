import React, { createContext, useContext, useReducer } from "react";
import { commentReducer, initialCommentState } from "./reducer";
import { CommentListState, CommentDispatch } from "./types";
const CommentsStateContext = createContext<CommentListState>(initialCommentState);
const CommentsDispatchContext = createContext<CommentDispatch>(() => { });
export const CommentsProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(commentReducer, initialCommentState);
    return (
        <CommentsStateContext.Provider value={state}>
            <CommentsDispatchContext.Provider value={dispatch}>
                {children}
            </CommentsDispatchContext.Provider>
        </CommentsStateContext.Provider>
    );
};

// Create helper hooks to extract the `state` and `dispacth` out of the context.
export const useCommentsState = () => useContext(CommentsStateContext);
export const useCommentsDispatch = () => useContext(CommentsDispatchContext);