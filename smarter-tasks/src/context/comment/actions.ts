import { Dispatch } from "react";
import { API_ENDPOINT } from "../../config/constants";
import {
  CommentActions,
  CommentAvailableAction,
  CommentPayload,
} from "./types";

export const createComment = async (
    dispatch: Dispatch<CommentActions>,
    projectID: string,
    taskID: string,
    comment: CommentPayload
    ) => {
        const token = localStorage.getItem("authToken") ?? "";
        console.log("hey we are on create comment function")
        try {
    dispatch({ type: CommentAvailableAction.CREATE_COMMENT_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectID}/tasks/${taskID}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    const data = await response.json();
    dispatch({
      type: CommentAvailableAction.CREATE_COMMENT_SUCCESS,
      payload: data,
    });
          console.log('done comment created')
    refreshComments(dispatch, projectID, taskID);
  } catch (error) {
    console.error(`Operation failed: `, error);
    dispatch({
      type: CommentAvailableAction.CREATE_COMMENT_FAILURE,
      payload: "Unable to create comment",
    });
  }
};

export const refreshComments = async (
  dispatch: Dispatch<CommentActions>,
  projectID: string,
  taskID: string
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    console.log("Refreshing comments for projectID:", projectID);
  console.log("Task ID:", taskID);
    dispatch({ type: CommentAvailableAction.FETCH_COMMENTS_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectID}/tasks/${taskID}/comments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const Data = await response.json();
    console.log("API Response:", Data);
    dispatch({
      type: CommentAvailableAction.FETCH_COMMENTS_SUCCESS,
      payload: Data,
    });
    return Data
  } catch (error) {
    console.error(`Operation failed: `, error);
    dispatch({
      type: CommentAvailableAction.FETCH_COMMENTS_FAILURE,
      payload: "Unable to  Fetch Comment",
    });
  }
};
