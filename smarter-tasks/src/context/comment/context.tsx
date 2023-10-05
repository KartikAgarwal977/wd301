import React, { createContext, useContext, useReducer } from "react";
import { commentReducer, initialCommentState } from "./reducer";
import { CommentListState, CommentActions } from "./types";
const CommentStateContext =
  createContext<CommentListState>(initialCommentState);
const CommentDispatchContext = createContext<React.Dispatch<CommentActions>>(
  () => {}
);

export const CommentProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch for comments using `useReducer` with the `commentReducer` and initial state
  const [state, dispatch] = useReducer(commentReducer, initialCommentState);

  return (
    <CommentStateContext.Provider value={state}>
      <CommentDispatchContext.Provider value={dispatch}>
        {children}
      </CommentDispatchContext.Provider>
    </CommentStateContext.Provider>
  );
};

// Create custom hooks to access the comment state and dispatch
export const useCommentState = () => useContext(CommentStateContext);
export const useCommentDispatch = () => useContext(CommentDispatchContext);