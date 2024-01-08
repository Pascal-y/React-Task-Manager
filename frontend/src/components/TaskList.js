import { toast} from 'react-toastify';
import {URL} from '../App';
import axios from 'axios'
import Task from './Task'
import TaskForm from './TaskForm'
import { useState, useEffect } from 'react';
import loadingImg from '../assets/loader.gif'

const TaskList = () => {
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [taskID, setTaskID] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        completed: false
    })
    const name = formData.name

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
    }
    
    //Getting all Tasks
    const getTasks = async()=>{
        setIsLoading(true)
        try {
            const {data} = await axios.get(`${URL}/api/tasks`)
            setTasks(data)
            setIsLoading(false)
        } catch (error) {
            toast.error(error.message)
            setIsLoading(false)
        }
    }
//UseEffect to get all task
    useEffect(()=>{
        getTasks()
    },[])

    //UseEffect to filter completed tasks
    useEffect(()=>{
        const cTask = tasks.filter((task)=>{
            return task.completed === true
        })
        setCompletedTasks(cTask)
    },[tasks])

    // Creating a task
    const createTask = async (e)=>{
        e.preventDefault()
        console.log(formData);

        if(name === ""){
            return toast.error("Input Field Cannot Be Empty!!!")
        }
        try {
            await axios.post(`${URL}/api/tasks`, formData)
            toast.success("Task Added Successfully")
            setFormData({...formData, name: ""})
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Get a single task
    const getSingleTask = async (task)=>{
        setFormData({name: task.name, completed: false})
        setTaskID(task._id)
        setIsEditing(true)
    }

    //Delete A Task
    const deleteTask = async(id)=>{
        try {
            await axios.delete(`${URL}/api/tasks/${id}`)
            toast.success("Task Successfully Deleted")
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    }
    // Update a task
    const updateTask = async(e)=>{
        e.preventDefault()
        if(name === ""){
            return toast.error("Input Field Cannot Be Empty")
        }
        try {
            await axios.patch(`${URL}/api/tasks/${taskID}`, formData)
            toast.success("Task Updated Successfully")
            setFormData({...formData, name: ""})
            isEditing(false)
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    }
    //Completed Tasks
    const setToCompleted = async(task)=>{
        const newFormData = {
            name: name.task,
            completed: true,
        }
        try {
            await axios.patch(`${URL}/api/tasks/${task._id}`, newFormData)
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div>
        <h2>Task Manager</h2>
        <TaskForm 
        name={name} 
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
        />
        {tasks.length > 0 && (
            <div className="--flex-between --pb">
            <p>
                <b>Total Tasks: </b> {tasks.length}
            </p>
            <p>
                <b>Completed Tasks: </b> {completedTasks.length}
            </p>
        </div>
        )}
        
        <hr />
        {isLoading && (
            <div className="--flex-center">
                <img src={loadingImg} alt="loading" />
            </div>
        )}

        {!isLoading && tasks.length === 0 ? (
                <p className='--py'>No task added. Please add a task</p>
            ):(
                <>
                {tasks.map((task, index)=>{
                    return(
                        <Task 
                        key={task._id} 
                        task={task} 
                        index={index} 
                        deleteTask={deleteTask}
                        getSingleTask={getSingleTask}
                        setToCompleted={setToCompleted}
                        />
                    )
                })}
                </>
            )
        }
    </div>
  )
}

export default TaskList