"use client"

import {FaPlus} from "react-icons/fa";
import Modal from "@/app/components/Modal";
import React, {FormEventHandler, useState} from "react";
import {addTodo} from "@/api";
import {useRouter} from "next/navigation";
import {v4 as uuidv4} from 'uuid';

const AddTask = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newTaskValue, setnewTaskValue] = useState<string>('')
  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    })
    setnewTaskValue('')
    setModalOpen(false)
    router.refresh()
  }
  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
        Add new task <FaPlus className="ml-2" size={15}/>
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={e => setnewTaskValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"/>
            <button type="submit" disabled={newTaskValue === ""} className="btn">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
export default AddTask