"use client"

import React, {FormEventHandler, useState} from "react";
import {ITask} from "@/types/tasks";
import {FiEdit} from "react-icons/fi";
import {FaRegTrashAlt} from "react-icons/fa";
import Modal from "@/app/components/Modal";
import {deleteTodo, editTodo} from "@/api";
import {useRouter} from "next/navigation";

interface TaskProps {
    task: ITask
}
const Task: React.FC<TaskProps> = ({task}) => {
    const router = useRouter()
    const [openModalEdit, setopenModalEdit] = useState<boolean>(false)
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false)
    const [taskToEdit, settaskToEdit] = useState<string>(task.text)
    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        await editTodo({
            id: task.id,
            text: taskToEdit
        })
        setopenModalEdit(false)
        router.refresh()
    }
    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id)
        setOpenModalDeleted(false)
        router.refresh()
    }
    return (
        <tr key={task.id}>
            <td className="w-full">{task.text}</td>
            <td className="flex gap-5">
                <FiEdit onClick={() => setopenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25}/>
                <Modal modalOpen={openModalEdit} setModalOpen={setopenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className="font-bold text-lg">Edit task</h3>
                        <div className="modal-action">
                            <input
                                value={taskToEdit}
                                onChange={e => settaskToEdit(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"/>
                            <button type="submit" className="btn">Submit</button>
                        </div>
                    </form>
                </Modal>
                <FaRegTrashAlt onClick={() => setOpenModalDeleted(true)} cursor="pointer" className="text-red-500" size={25}/>
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                    <h3 className="text-lg">Are you sure to delete this task?</h3>
                    <div className="modal-action">
                        <button
                        onClick={() => handleDeleteTask(task.id)}
                        >Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}
export default Task