export interface CommentListState {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    comments: Comment[];
}
export interface Comment {
    id: number;
    description: string;
    task_id: number;
    writer: number;
    project_id: number;
    updatedAt: Date;
    createdAt: Date;
    member: Member;
}
interface Member{
    id: number;
    name: string;
    email: string;
}
export type CommentPayload = {
    description: string;
}
export enum CommentAvailableAction {
    FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST",
    FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS",
    FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE",

    CREATE_COMMENT_REQUEST = "CREATE_COMMENT_REQUEST",
    CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS",
    CREATE_COMMENT_FAILURE = "CREATE_COMMENT_FAILURE",
}
export type CommentActions =
    | { type: CommentAvailableAction.FETCH_COMMENTS_REQUEST }
    | { type: CommentAvailableAction.FETCH_COMMENTS_SUCCESS; payload: Comment[] }
    | { type: CommentAvailableAction.FETCH_COMMENTS_FAILURE; payload: string }
    | { type: CommentAvailableAction.CREATE_COMMENT_REQUEST }
    | {
        payload: Comment; type: CommentAvailableAction.CREATE_COMMENT_SUCCESS 
}
    | { type: CommentAvailableAction.CREATE_COMMENT_FAILURE; payload: string };

export type CommentDispatch = React.Dispatch<CommentActions>;