import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { server } from '../App';
import { Context } from '../index.js';

const Tasks = () => {
  const [tittle, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  let isTask = tasks.length;
  const { isAuthenticated } = useContext(Context)
  const [isCompleted, setIsCompleted] = useState(false)

  const fetchData = async () => {
    try {
      if (isAuthenticated) {
        const response = await axios.get(`${server}/tasks`, { withCredentials: true })
        // console.log(response.data.tasks)
        return setTasks(response.data.tasks)
      }
    } catch (error) {
      return toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    }
  }

  useEffect(() => {
    const fetchDataAndSetTasks = async () => {
      if (!isAuthenticated) {
        return toast.warn('Login to View Tasks!', {
          position: "top-center",
          autoClose: 200,
          hideProgressBar: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        })
      }
      await fetchData()
    }
    fetchDataAndSetTasks();
  }, [isAuthenticated])

  const handleCreateClick = async () => {

    const newTask = {
      tittle: tittle,
      description: description,
    }

    if (tittle === "" || description === "") {
      return toast.warn('Enter Valid Tittle or Description!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    }

    await axios.post(`${server}/new/task`, newTask, { withCredentials: true })

    fetchData();

    setTittle("")
    setDescription("")
    setIsCompleted(prev => !prev)
  }

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(`${server}/task/${id}`, { isCompleted }, { withCredentials: true })

      toast.success(`${data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
      setIsCompleted(prev => !prev)
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    }
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, { withCredentials: true })

      setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));

      toast.success(data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })

    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    }
  }

  return (
    <>
      <div className='tasks shadow-2xl p-4 my-4 w-1/3 h-4/5 block m-auto'>
        {
          isAuthenticated ? (<> <h2 className='text-xl font-bold text-center my-3'>Add Task From Below</h2>
            <div className='flex justify-center items-center flex-col'>
              <input type="tittle" required onChange={(e) => setTittle(e.target.value)} value={tittle} className='py-2 px-4 my-3 w-full md:w-2/3 rounded-md border-2 border-gray-400' placeholder='Enter Tittle:' />
              <input type="description" required onChange={(e) => setDescription(e.target.value)} value={description} className='py-2 px-4 my-3 w-full md:w-2/3 rounded-md border-2 border-gray-400' placeholder='Enter Description:' />
              <button onClick={handleCreateClick} id='create-btn' className="hoverEffect bg-black text-white w-full md:w-2/3 px-4 py-2 rounded-md my-2"><b>+</b> Create Task</button>
            </div>
          </>
          ) : (<> <h2 className='text-xl font-bold text-center my-3'>Unauthorized Access!</h2>
            <div className='flex justify-center items-center flex-col'>
              <input type="tittle" required disabled={true} value={"Login To Continue!!"} className='py-2 px-4 my-3 w-full md:w-2/3 rounded-md border-2 border-red-500 text-red-500' placeholder='Enter Tittle:' />
              <input type="description" required disabled={true} value={"Login To Continue!!"} className='py-2 px-4 my-3 w-full md:w-2/3 rounded-md border-2 border-red-500 text-red-500' placeholder='Enter Description:' />
              <button disabled={true} id='create-btn' className="hoverEffect bg-red-500 text-white w-full md:w-2/3 px-4 py-2 rounded-md my-2">Restricted Access</button>
            </div>
          </>
          )
        }
      </div>

      <div className='tasks shadow-2xl px-4 py-2 my-4 w-2/3 h-4/5 block m-auto'>
        {
          !isTask ? <h2 className='text-xl font-bold text-center'>No tasks to show!</h2> : <div>
            <h2 className='text-xl font-bold text-center'>Tasks to complete</h2>
            {
              tasks.map((task, index) => {
                return (<div key={index} id='task' className='task flex justify-between flex-col xs sm:flex-row shadow-xl h-1/3 border-2 p-4 my-4 rounded-md'>
                  <div>
                    <h3 className='font-semibold text-lg'>Created On: {new Date(task.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</h3>
                    <h2 className='text-black text-lg my-1'><strong>Title</strong>: {task.tittle}</h2>
                    <p className='text-black text-lg my-1'><strong>Description</strong>: {task.description}</p>
                  </div>
                  <div>
                    <input onChange={() => updateHandler(task._id)} checked={task.isCompleted} type="checkbox" className='px-6 py-4 mx-4 border-2 border-green-400' />
                    <button disabled={!isAuthenticated} onClick={() => deleteHandler(task._id)} className="doneBtn w-[20vw] md:w-[8vw] p-1 my-1 rounded-lg font-bold hoverEffect hover:bg-green-500 hover:text-white border-2 border-green-400 text-green-400">Delete</button>
                  </div>
                </div>)
              })
            }
          </div>
        }
      </div>
    </>
  )
}

export default Tasks