import React, { useState } from 'react'
import { Todo } from '../model'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './styles.css'

type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const handleDone = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone} : todo))
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = () => {
    if (!isEditing && !todo.isDone) {
      setIsEditing(!isEditing)
    }
  }

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo(e.target.value)
  }

  const handleEditSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault()

    setTodos(
      todos.map((todo) => todo.id === id ? {...todo, todo: editTodo} : todo)
    )

    setIsEditing(false)
  } 

  return (
    <form className="todos__single" onSubmit={(e) => handleEditSubmit(e, todo.id)}>
      {isEditing ? (
        <input value={editTodo} onChange={handleOnChangeInput} className="todos__single--text"/>
      ) : (
        todo.isDone ? (
          <s className="todos__single--text">{todo.todo}</s>
        ) : (
          <span className="todos__single--text">{todo.todo}</span>
        )
      )}      
      <div>
        <span className="icon" onClick={handleEdit}><AiFillEdit/></span>
        <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete/></span>
        <span className="icon" onClick={() => handleDone(todo.id)}><MdDone/></span>
      </div>
    </form>
  )
}

export default SingleTodo