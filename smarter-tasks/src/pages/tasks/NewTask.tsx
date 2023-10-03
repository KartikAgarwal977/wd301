import { Fragment, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import { TaskDetailsPayload } from "../../context/task/types";
import { useProjectsState } from "../../context/projects/context";
import { useTasksDispatch } from "../../context/task/context";
import { addTask } from "../../context/task/actions";
import { Dialog, Transition } from "@headlessui/react";

const NewTask = () => {
    let [isOpen, setIsOpen] = useState(true)

    let { projectID } = useParams();
    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskDetailsPayload>();
    const projectState = useProjectsState()
    const TasksDispatch = useTaskDispatch()

    const selectedProject = projectState?.projects.filter(
        (project) => `${project.id}` === projectID
    )?.[0]
    if (!selectedProject) {
        return <>No such Project!</>
    }
    function closeModal() {
        setIsOpen(false);
        navigate("../../")
    }
    const onSubmit: SubmitHandler<TaskDetailsPayload> = async (data) => {
        try {
            addTask(TasksDispatch, projectID ?? "", data);
            closeModal();
        } catch (error) {
            console.error("Operation failed:", error);
        }
    }
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
                        leaveTo="opacity-0">
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Create new Task
                            </Dialog.Title>
                            <div className="mt-2">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                <input
                                        type="text"
                                        required
                                        placeholder="Enter title"
                                        autoFocus
                                        id="title"
                                        {...register('title', { required: true })}
                                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                                    />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter description"
                                        autoFocus
                                        id="description"
                                        {...register('description', { required: true })}
                                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                                    />
                                    <input
                                        type="date"
                                        required
                                        placeholder="Enter due date"
                                        autoFocus
                                        id="dueDate"
                                        {...register('dueDate', { required: true })}
                                        className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                                    />
                                    <button
                                        type="submit"
                                        id="newTaskSubmitBtn"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    >Submit</button>
                                </form>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                        
                </Dialog>
            </Transition>
        </>
    )
}
export default NewTask;