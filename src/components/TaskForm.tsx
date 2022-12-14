import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'


import styles from './TaskForm.module.css'

import {ITask} from '../interface/Tasks'



type Props = {
  btnText: string
  taskList: ITask[]
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
  task?: ITask | null
  handleUpdate?(id:number, title: string,  difficulty: number): void
}

const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => {
  const [id, setId] = useState<number>(0)
  const [title, setTitle] =useState<string>('')
  const [difficulty, setDifficulty] = useState<number>(0)


  //TRAZ AS INFORMAÇÕES ATUALIZADAS PARA TELA DE EDIÇÃO
  useEffect(() => {
    if (task) {
      setId(task.id)
      setTitle(task.title)
      setDifficulty(task.difficulty)
    }
  }, [task])


  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(handleUpdate) {
      handleUpdate(id, title, difficulty)
    } else {
      const id = Math.floor(Math.random() * 1000)

    const newTask: ITask = { id, title, difficulty }

    setTaskList!([...taskList, newTask])

    setTitle('')
    setDifficulty(0)

    console.log(taskList)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    if(e.target.name === 'title') {
      setTitle(e.target.value)
      
    } else{
      setDifficulty(parseInt(e.target.value))
    } 
    
  }


  return (
  <form onSubmit={addTaskHandler} className={styles.form}>
    <div className={styles.input_container}>
      <label htmlFor="title">Titulo:</label>
      <input type="text" name='title' placeholder='Título da tarefa' onChange={handleChange} value={title}/>
    </div>
    <div className={styles.input_container}>
      <label htmlFor="difficulty">Dificuldade:(Entre 0 á 10)</label>
    <input type="number" name='difficulty' placeholder='Dificuldade da tarefa' onChange={handleChange} value={difficulty} min="1" max="10"/>
    </div>
    {difficulty <= 10 ? <input type="submit" value={btnText} /> : <h3 className='attention'>Escolha números entre 0 á 10</h3>} 
    
  </form>

  )
}

export default TaskForm