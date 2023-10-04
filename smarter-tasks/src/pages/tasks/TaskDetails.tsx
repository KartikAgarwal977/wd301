import { Fragment, useEffect, useState } from "react";
import { TaskDetailsPayload } from "../../context/task/types";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectsState } from "../../context/projects/context";
import { useTasksDispatch, useTasksState } from "../../context/task/context";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { updateTask } from "../../context/task/actions";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useMembersState } from "../../context/members/context";
import {
  useCommentDispatch,
  useCommentState,
} from "../../context/comment/context";
import { createComment, refreshComments } from "../../context/comment/actions";

type TaskFormUpdatePayload = TaskDetailsPayload & {
  selectedPerson: string;
  comment: string;
};

const formatDateForPicker = (isoDate: string) => {
  const dateObj = new Date(isoDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const TaskDetails = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { projectID, taskID } = useParams();
  const navigate = useNavigate();

  const projectState = useProjectsState();
  const taskListState = useTasksState();
  const taskDispatch = useTasksDispatch();
  const memberState = useMembersState();

  const selectedTask = taskListState.projectData.tasks[taskID ?? ""];
  const [selectedPerson, setSelectedPerson] = useState(
    selectedTask.assignedUserName ?? ""
  );
  const commentsDispatch = useCommentDispatch();
  const commentsState = useCommentState();
  useEffect(() => {
    if (projectID && taskID) {
      refreshComments(commentsDispatch, projectID, taskID);
    }
  }, [commentsDispatch, projectID, taskID]);
  const getDate = (date: Date): string => {
    return `${new Date(date).toLocaleDateString("en-In")} ${new Date(
      date
    ).toLocaleTimeString("en-In")}`;
  };
  const getUser = (currentuser: number) => {
    const User = memberState?.users.filter(
      (user) => user.id === currentuser
    )[0];
    return User?.name;
  };
  const { register, handleSubmit } = useForm<TaskFormUpdatePayload>({
    defaultValues: {
      title: selectedTask.title,
      description: selectedTask.description,
      selectedPerson: selectedTask.assignedUserName,
      dueDate: formatDateForPicker(selectedTask.dueDate),
    },
  });

  const selectedProject = projectState?.projects.filter(
    (project) => `${project.id}` === projectID
  )[0];

  if (!selectedProject) {
    return <>No such Project!</>;
  }

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const OnSubmitCreateComment = async (comment: string) => {
    const Comment = {
      description: comment,
    };
    if (projectID && taskID) {
      createComment(commentsDispatch, projectID, taskID, Comment);
    }
  };

  const onSubmit: SubmitHandler<TaskFormUpdatePayload> = async (data) => {
    const assignee = memberState?.users?.filter(
      (member) => member.name === selectedPerson
    )?.[0];
    updateTask(taskDispatch, projectID ?? "", {
      ...selectedTask,
      ...data,
      assignee: assignee?.id,
    });
    closeModal();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Task Details
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                        type="text"
                        required
                        placeholder="Enter title"
                        id="title"
                        {...register("title", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Enter description"
                        id="description"
                        {...register("description", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <input
                        type="date"
                        required
                        placeholder="Enter due date"
                        id="dueDate"
                        {...register("dueDate", { required: true })}
                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                      />
                      <h3>
                        <strong>Assignee</strong>
                      </h3>
                      <Listbox
                        value={selectedPerson}
                        onChange={setSelectedPerson}
                      >
                        <Listbox.Button className="w-full border rounded-md py-2 px-3 my-2 text-gray-700 text-base text-left">
                          {selectedPerson}
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {memberState?.users.map((person) => (
                            <Listbox.Option
                              key={person.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-blue-100 text-blue-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={person.name}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {person.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 flex items-center pl-3 text-blue-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Listbox>
                      <div className="my-4 text-slate-600 p-4">
                        <h1 className="text-sm font-bold text-align-center">
                          comment
                        </h1>
                      </div>
                      <div>
                        {commentsState.isLoading ? (
                          <p>Loading...</p>
                        ) : commentsState.isError ? (
                          <p className="text-red text-sm">
                            Error: {commentsState.errorMessage}
                          </p>
                        ) : (
                          <>
                            {commentsState.comments.map((com) => (
                              <div
                                key={com.id}
                              className="comment bg-gray-100">
                                <div className="text-gray-600">
                                  <p>{com.description}</p>
                                  <p>{getDate(com.createdAt)}</p>
                                  <p>{getUser(com.member.id)}</p>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          id="commentBox"
                          placeholder="Add comment"
                          className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                        />
                        <button
                          onClick={() => {
                            const newComment = document.getElementById(
                              "commentBox"
                            ) as HTMLInputElement | null;
                            const newCommentdata = newComment?.value;
                            if (newCommentdata) {
                              OnSubmitCreateComment(newCommentdata);
                            }
                          }}
                          id="addCommentBtn"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Add comment
                        </button>
                      </div>
                      <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Update
                      </button>
                      <button
                        type="submit"
                        onClick={closeModal}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default TaskDetails;
