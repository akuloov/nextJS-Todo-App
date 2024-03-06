import {ITask} from "@/types/tasks";

const baseURL = "http://localhost:3001/tasks"

export const getAllTodos = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseURL}`, {cache: 'no-store'})
    return res.json()
}

export const addTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseURL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    return res.json()
}
export const editTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseURL}/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    return res.json()
}
export const deleteTodo = async (id:string): Promise<void> => {
    await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
    })
}