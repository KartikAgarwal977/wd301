import { Reducer } from "react";
import { CommentActions, CommentAvailableAction, CommentListState } from "./types";

export const initialCommentState: CommentListState = {
    comments: [],
    isError: false,
    isLoading: false,
    errorMessage:""
}

export const CommentReducer: Reducer<CommentListState, CommentActions> = (
    state = initialCommentState,
    action
) => {
    switch (action.type) {
        case CommentAvailableAction.CREATE_COMMENT_REQUEST:
            return { ...state, isLoading: true };
        case CommentAvailableAction.CREATE_COMMENT_SUCCESS:
            return { ...state, isLoading: false, comments: [action.payload, ...state.comments], };
        case CommentAvailableAction.CREATE_COMMENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload,
            }
        case CommentAvailableAction.FETCH_COMMENTS_REQUEST:
            return { ...state, isLoading: true };
        case CommentAvailableAction.FETCH_COMMENTS_SUCCESS:
            return { ...state, isLoading: false, comments: action.payload }
        case CommentAvailableAction.FETCH_COMMENTS_FAILURE:
            return { ...state, isLoading: false, isError: true, errorMessage: `Something went wrong: ${action.payload}`, }
        default:
            return state;
    }
}